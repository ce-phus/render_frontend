import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getusers } from "../actions/chatActions";
import { ChatUser, Popup } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { addMessage, setActiveChat } from '../actions/websocketActions';
import { jwtDecode } from "jwt-decode";
import { chat, logo1 } from "../assets";
import { Link } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { HiVideoCamera } from "react-icons/hi2";
import { FaRocketchat } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { LuCross } from "react-icons/lu";
import { FaRegImage } from "react-icons/fa6";
import { FaMicrophoneAlt } from "react-icons/fa";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { MdLocalLaundryService } from "react-icons/md";

import { getProfile } from "../actions/profileActions";

import EmojiPicker from 'emoji-picker-react';
import { ReactMic } from 'react-mic';

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOPen] = useState(false);
  const [image, setImage] = useState(null);
  const [messages, setMessages] = useState([]); 

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  }

  const getProfileReducer = useSelector((state) => state.getProfileReducer);
  const { loading: userLoadingProfile, profile } = getProfileReducer;

  const { loading, error, users } = useSelector((state) => state.getUsersReducers);
  const { userInfo } = useSelector((state) => state.userLoginReducer);
  const activeChat = useSelector((state) => state.websocket.activeChat);
  
  const API_URL = import.meta.env.VITE_API_URL;
  const fullProfileImageUrl = API_URL + selectedUser?.profile?.profile_photo;
  let loggedInUserId = null;

  if (userInfo && userInfo.access) {
    try {
      const decodedToken = jwtDecode(userInfo.access);
      loggedInUserId = decodedToken.user_id;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      dispatch(getusers());
    }
  }, [dispatch, userInfo, navigate]);

  useEffect(() => {
    const storedMessages = localStorage.getItem(`chatMessages_${selectedUser?.id}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
      const wsUrl = `${wsProtocol}://${import.meta.env.VITE_API_URL.replace(/^https?:\/\//, "")}/ws/chat/${selectedUser.id}/?token=${userInfo?.access}`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('WebSocket connection established with', selectedUser.first_name);
      };

      ws.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        console.log("Received data:", newMessage);

        if (newMessage.content_type === "text") {
          console.log("Received text message:", newMessage.message);
        } else if (newMessage.content_type === "image") {
          console.log("Received image:", newMessage.image);
        }

        dispatch(addMessage(newMessage));
        // Update local messages state and local storage
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        localStorage.setItem(`chatMessages_${selectedUser.id}`, JSON.stringify(updatedMessages));
      };

      ws.onerror = (error) => {
        console.error('Websocket error: ', error);
      };

      ws.onclose = () => {
        console.log("Websocket connection closed");
      };
      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [selectedUser, userInfo, dispatch, messages]);

  const handleSendMessage = () => {
    if (socket && message && selectedUser) {
      const payload = {
        message: message,
        userId: loggedInUserId
      };
      socket.send(JSON.stringify(payload));
      setMessage('');
      // Update local messages state and local storage
      const updatedMessages = [...messages, payload];
      setMessages(updatedMessages);
      localStorage.setItem(`chatMessages_${selectedUser.id}`, JSON.stringify(updatedMessages));
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage(message + emojiObject.emoji);
    setIsEmojiPickerOPen(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        sendImageMessage(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendImageMessage = (base64Image) => {
    if (socket && selectedUser) {
      const payload = {
        image: base64Image,
        userId: loggedInUserId,
      };
      socket.send(JSON.stringify(payload));
      // Update local messages state and local storage
      const updatedMessages = [...messages, payload];
      setMessages(updatedMessages);
      localStorage.setItem(`chatMessages_${selectedUser.id}`, JSON.stringify(updatedMessages));
    }
  };

  const sendAudioMessage = (blob) => {
    if (socket && selectedUser) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const payload = {
          audio: reader.result,
          userId: loggedInUserId,
        };
        socket.send(JSON.stringify(payload));
        // Update local messages state and local storage
        const updatedMessages = [...messages, payload];
        setMessages(updatedMessages);
        localStorage.setItem(`chatMessages_${selectedUser.id}`, JSON.stringify(updatedMessages));
      };
      reader.readAsDataURL(blob);
    }
  };

  useEffect(()=> {
    dispatch(getProfile())
}, [dispatch])


  const handleSelectedUser = (user) => {
    setSelectedUser(user);
    dispatch(setActiveChat(user));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[100px] bg-white dark:bg-dark border-r border-gray-300 dark:border-gray-700">
        <div className="flex flex-col mt-2 items-center">
          
          <Link to={`/`}>
            <img
            src={logo1}
            className="hover:bg-gray-300 dark:hover-bg-gray-700 p-1.5 rounded-lg"
            />
          </Link>
          {userLoadingProfile ? (
            <div className="w-12 h-12 rounded-full bg-gray-300 mt-5 dark:bg-slate-700 animate-pulse"/>
          ): 
          <Link to={profile ? `/my-profile` : '#'} className=" mt-5 hover:bg-gray-300 dark:hover:bg-gray-700 p-1.5 rounded-lg duration:500 hover:scale-105">
            <img
            src={profile?.profile_photo}
            className="w-12 h-12 rounded-full"/>
          </Link>}
          
          <div className="flex flex-col justify-between pt-20 items-center space-y-5">
            <Link className="" to={'/'}>
              <FaHome className="w-10 h-10 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 p-1.5 rounded-lg duration:500 hover:scale-105"/>
            </Link>

            <Link to={'/explore'}>
            <MdExplore className="w-10 h-10 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 p-1.5 rounded-lg duration:500 hover:scale-105"/>
            </Link>

            <Link to={''}>
              <IoSearchSharp className="w-10 h-10 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 p-1.5 rounded-lg duration:500 hover:scale-105"/>
            </Link>

            <Link to={'/reels'}>
              <HiVideoCamera className="w-10 h-10 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 p-1.5 rounded-lg duration:500 hover:scale-105"/>
            </Link>

            <Link to={'/inbox'}>
              <FaRocketchat className="w-10 h-10 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 p-1.5 rounded-lg duration:500 hover:scale-105"/>
            </Link>

            <Link to={'/notifications'}>
              <IoNotifications className="w-10 h-10 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 p-1.5 rounded-lg duration:500 hover:scale-105"/>
            </Link>

            <Link onClick={togglePopup}>
              <LuCross className="w-10 h-10 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 p-1.5 rounded-lg duration:500 hover:scale-105"/>
            </Link>
          </div>
        </div>
        

      </div>
      <div className="w-[320px] bg-white dark:bg-dark border-r border-gray-300 dark:border-gray-700">
        <header className="flex p-4 justify-between items-center border-b border-gray-400 dark:border-gray-700 dark:text-white">
          <p className="font-bold dark:text-white text-xl">{profile?.username}</p>
        </header>

        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          {loading ? (
            <>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-slate-700 animate-pulse"/>
                  <div className="h-5 w-1/2 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>
                <div className="flex space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-slate-700 animate-pulse"/>
                  <div className="h-5 w-1/2 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>
                <div className="flex space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-slate-700 animate-pulse"/>
                  <div className="h-5 w-1/2 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>
                <div className="flex space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-slate-700 animate-pulse"/>
                  <div className="h-5 w-1/2 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>
                <div className="flex space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-slate-700 animate-pulse"/>
                  <div className="h-5 w-1/2 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>
                <div className="flex space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-slate-700 animate-pulse"/>
                  <div className="h-5 w-1/2 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>
                <div className="flex space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-slate-700 animate-pulse"/>
                  <div className="h-5 w-1/2 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>
                <div className="flex space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-slate-700 animate-pulse"/>
                  <div className="h-5 w-1/2 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>
                <div className="flex space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-slate-700 animate-pulse"/>
                  <div className="h-5 w-1/2 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>
                <div className="flex space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-slate-700 animate-pulse"/>
                  <div className="h-5 w-1/2 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>
                <div className="flex space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-slate-700 animate-pulse"/>
                  <div className="h-5 w-1/2 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>
                <div className="flex space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-slate-700 animate-pulse"/>
                  <div className="h-5 w-1/2 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>
                <div className="flex space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-slate-700 animate-pulse"/>
                  <div className="h-5 w-1/2 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>
                <div className="flex space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-slate-700 animate-pulse"/>
                  <div className="h-5 w-1/2 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>
                <div className="flex space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-slate-700 animate-pulse"/>
                  <div className="h-5 w-1/2 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>
                <div className="flex space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-slate-700 animate-pulse"/>
                  <div className="h-5 w-1/2 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>
                <div className="flex space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-slate-700 animate-pulse"/>
                  <div className="h-5 w-1/2 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>
                <div className="flex space-x-2">
                  <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-slate-700 animate-pulse"/>
                  <div className="h-5 w-1/2 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse"/>
                </div>
              </div>
            </>
          ) : error ? (
            <div className="bg-red-500 p-2.5 font-bold rounded-lg">{error}</div>
          ) : (
            <div className="flex flex-col space-y-2">
              {users && users.map((user)=> (
                <div key={user.id} onClick={()=> handleSelectedUser(user)}>
                  <ChatUser user={user}/>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1">
        <div className=" mx-3 mt-2">
          {selectedUser ? (
            <>
            <div className="flex space-x-2 border-b p-2 border-gray-300 dark:border-gray-700 justify-between">
              <Link>
                <img src={fullProfileImageUrl}
              className="rounded-full w-10 h-10 object-contain"/>
              </Link>
            <div className="flex flex-col space-y-2">
              <p className="font-medium tracking-wide dark:text-white">{selectedUser.profile.full_name}</p>
              <div className="flex space-x-3">
                <button>
                  <IoMdCall className="w-7 h-7 dark:text-white" />
                </button>
              <button>
                <MdLocalLaundryService className="w-7 h-7 dark:text-white"/>
              </button>
              
              </div>
            </div>
            </div> 
            
            </>
          )
          : 
          <>
          <div className="flex flex-col space-y-2 items-center justify-center h-screen">
          <img
          src={chat}
          className="w-[150px] h-[150px] contain"/>
          <h2 className="text-xl dark:text-white">Your messages</h2>
          <p className="dark:text-gray-400 font-medium tracking-wide text-gray-700">Send a message to start a chat</p>

          <Link className="bg-yellow-900 p-1.5 rounded-lg text-white hover:bg-yellow-700 font-bold">
          Send message
          </Link>
          </div>
          
          </>}
        </div>

        <div className="h-screen overflow-y-auto p-4 pb-36">
        {messages.map((msg, index) => (
          <div key={index} className={`flex mb-4 ${msg.userId === loggedInUserId ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-96 p-3 rounded-lg ${msg.userId === loggedInUserId ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
                  {msg.image ? (
                      <img src={msg.image} alt="Sent" className="max-w-full h-auto" />
                  ) : (
                      <p>{msg.message}</p>
                  )}
              </div>
          </div>
        ))}
        </div>

        {selectedUser ? 
        <footer className="bg-white dark:bg-dark dark:text-white border-t border-transparent p-4 absolute bottom-0 w-3/4">
        <div className="flex items-center">
        <button
          onClick={()=> setIsEmojiPickerOPen(!isEmojiPickerOpen)}>
            <MdOutlineEmojiEmotions className="w-7 h-7 mx-3 dark:text-white"/>
          </button>
          {isEmojiPickerOpen && (
            <EmojiPicker onEmojiClick={handleEmojiClick} /> 
          )}
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-2 rounded-full border border-gray-400 dark:border-gray-700 dark:focus:border-yellow-800 focus:outline-none focus:border-yellow-500 dark:bg-dark"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="imageUpload"
          />
          <label htmlFor="imageUpload" className="cursor-pointer">
            <FaRegImage className="w-7 h-7 mx-3 dark:text-white" />
          </label>
          <button
          >
            <FaMicrophoneAlt className="w-7 h-7 mx-3 dark:text-white" />
          </button>
          
        </div>
      </footer> : ''}
      </div>
      <Popup isPopupOpen={isPopupOpen} togglePopup={togglePopup} />
    </div>
  )
}

export default Chat