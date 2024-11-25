import React, { useEffect, useState } from 'react';
import { Layout } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";
import { BsThreads } from "react-icons/bs";
import { updateProfile } from '../actions/profileActions';
import { Alert, Spinner } from 'react-bootstrap';

const EditProfile = () => {
  const dispatch = useDispatch();
  const getProfileReducer = useSelector((state) => state.getProfileReducer);
  const profileUpdateReducer = useSelector((state) => state.profileUpdateReducer);
  const { loading, error, profile } = profileUpdateReducer;
  const { profile: userProfile} = getProfileReducer;

  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { error: LoginError, userInfo } = userLoginReducer;

  // State to manage form data
  const [formData, setFormData] = useState({
    phoneNumber: profile?.phone_number || '',
    aboutMe: profile?.about_me || '',
    license: profile?.license || '',
    profilePhoto: profile?.profile_photo || '',
    gender: profile?.gender || 'Other',
    country: profile?.country || 'KE',
    city: profile?.city || 'Nairobi',
    isBuyer: profile?.is_buyer || false,
    isSeller: profile?.is_seller || false,
    isAgent: profile?.is_agent || false,
    facebookUrl: profile?.facebook_url || '',
    instagramUrl: profile?.instagram_url || '',
    twitterUrl: profile?.twitter_url || '',
    threadsUrl: profile?.threads_url || ''
  });
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [profilePhotoUpdated, setProfilePhotoUpdated] = useState(false);

  
  const [imagePreview, setImagePreview] = useState(userProfile?.profile_photo || '');

  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (userInfo && userProfile?.username) {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('phone_number', formData.phoneNumber);
      formDataToSubmit.append('about_me', formData.aboutMe);
      formDataToSubmit.append('gender', formData.gender);
      formDataToSubmit.append('country', formData.country);
      formDataToSubmit.append('city', formData.city);
      formDataToSubmit.append('is_buyer', formData.isBuyer);
      formDataToSubmit.append('is_seller', formData.isSeller);
      formDataToSubmit.append('facebook_url', formData.facebookUrl);
      formDataToSubmit.append('instagram_url', formData.instagramUrl);
      formDataToSubmit.append('twitter_url', formData.twitterUrl);
      formDataToSubmit.append('threads_url', formData.threadsUrl);
  
      if (formData.profilePhoto) {
        formDataToSubmit.append('profile_photo', formData.profilePhoto);
      }
  
      dispatch(updateProfile(formDataToSubmit, userProfile.username));
      setSubmissionSuccess(true);
      setTimeout(() => {
        setSubmissionSuccess(false);
      }, 4000)
    } else {
      alert("User must be authenticated and userProfile must exist!");
    }
  };


  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData({
        ...formData,
        profilePhoto: file,
      });
      setProfilePhotoUpdated(true);  
      setTimeout(() => setProfilePhotoUpdated(false), 3000); 
    }
  }

  return (
    <Layout>
      <div className="w-full md:ml-20 mb-64 pb-20">
        {loading && <Spinner />}
        {error ? <div className='bg-red-500 px-1.5 py-1.5 rounded-lg text-white font-medium'>{error}</div> : ''}
        {submissionSuccess && <div className="text-white px-1.5 py-1.5 mb-4 font-bold text-xl bg-green-600">Profile updated successfully!</div>}
        {profilePhotoUpdated && (
          <div className='text-xl font-medium text-violet-600'>
            Profile photo updated successfully!
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <div className="w-full md:w-3/4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                <img
                  src={imagePreview || userProfile?.profile_photo}
                  alt="Profile"
                  className="rounded-lg w-[150px] h-[150px]"
                />
                <div className="flex flex-col ml-4">
                  <h1 className="text-xl font-bold dark:text-white tracking-wide">
                    {userProfile?.full_name}
                  </h1>
                  <p className="text-md font-medium dark:text-gray-300">{userProfile?.about_me}</p>

                  <label className="mt-4 cursor-pointer bg-orange-600 text-white p-2 rounded text-center">
                    Change photo
                    <input
                      type="file"
                      name="profilePhoto"
                      onChange={handleProfilePhotoChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-4 bg-gray-100 dark:bg-gray-700 rounded-md mt-5">
                <h1 className="text-xl font-bold dark:text-white tracking-wide">Social Accounts</h1>
                <div className="flex mt-2">
                  <FaFacebook className="dark:text-white mt-3 w-[50px]" />
                  <input
                    name="facebookUrl"
                    value={formData.facebookUrl}
                    onChange={handleChange}
                    className="appearance-none bg-gray-50 dark:bg-dark block border border-gray-300 placeholder-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-tertiary dark:focus:border-blue-500 p-2.5 rounded-lg w-full"
                    type="url"
                  />
                </div>
                <div className="flex mt-2">
                  <FaInstagram className="dark:text-white mt-3 w-[50px]" />
                  <input
                    name="instagramUrl"
                    value={formData.instagramUrl}
                    onChange={handleChange}
                    className="appearance-none bg-gray-50 dark:bg-dark block border border-gray-300 placeholder-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-tertiary dark:focus:border-blue-500 p-2.5 rounded-lg w-full"
                    type="url"
                  />
                </div>
                <div className="flex mt-2">
                  <FaTwitter className="dark:text-white mt-3 w-[50px]" />
                  <input
                    name="twitterUrl"
                    value={formData.twitterUrl}
                    onChange={handleChange}
                    className="appearance-none bg-gray-50 dark:bg-dark block border border-gray-300 placeholder-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-tertiary dark:focus:border-blue-500 p-2.5 rounded-lg w-full"
                    type="url"
                  />
                </div>
                <div className="flex mt-2">
                  <BsThreads className="dark:text-white mt-3 w-[50px]" />
                  <input
                    name="threadsUrl"
                    value={formData.threadsUrl}
                    onChange={handleChange}
                    className="appearance-none bg-gray-50 dark:bg-dark block border border-gray-300 placeholder-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-tertiary dark:focus:border-blue-500 p-2.5 rounded-lg w-full"
                    type="url"
                  />
                </div>
              </div>
            </div>
            
            <div className="mx-3 md:mx-0 mt-2">
              <div className="w-full flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 mb-2 px-3">
                  <label className="block uppercase tracking-wide dark:text-white text-xs font-bold mb-2">
                    Phone Number
                  </label>
                  <input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="appearance-none bg-gray-50 block border border-gray-300 dark:bg-dark dark:border-gray-600 dark:text-white dark:focus:ring-tertiary dark:focus:border-blue-500 p-2.5 rounded-lg w-full"
                    type="text"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide dark:text-white text-xs font-bold mb-2">
                    License
                  </label>
                  <input
                    name="license"
                    value={formData.license}
                    onChange={handleChange}
                    className="appearance-none bg-gray-50 block border border-gray-300 dark:bg-dark dark:border-gray-600 dark:text-white dark:focus:ring-tertiary dark:focus:border-blue-500 p-2.5 rounded-lg w-full"
                    type="text"
                  />
                </div>
              </div>
              <label className="flex flex-col mb-2">
                <span className="dark:text-white font-bold mb-4 tracking-wide uppercase text-xs">About Me</span>
                <textarea
                  rows={7}
                  value={formData.aboutMe}
                  name="aboutMe"
                  onChange={handleChange}
                  className="dark:bg-dark/75 rounded-xl dark:text-white shadow-md shadow-dark mr-3"
                />
              </label>
              <div className="mb-4">
                <label className="block uppercase tracking-wide dark:text-white text-xs font-bold mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="appearance-none bg-gray-50 dark:bg-dark block border border-gray-300 dark:border-gray-600 dark:text-white dark:focus:ring-tertiary dark:focus:border-blue-500 p-2.5 rounded-lg w-full"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block uppercase tracking-wide dark:text-white text-xs font-bold mb-2">
                  Country
                </label>
                <input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="appearance-none bg-gray-50 dark:bg-dark block border border-gray-300 dark:border-gray-600 dark:text-white dark:focus:ring-tertiary dark:focus:border-blue-500 p-2.5 rounded-lg w-full"
                  type="text"
                />
              </div>
              <div className="mb-4">
                <label className="block uppercase tracking-wide dark:text-white text-xs font-bold mb-2">
                  City
                </label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="appearance-none bg-gray-50 dark:bg-dark block border border-gray-300 dark:border-gray-600 dark:text-white dark:focus:ring-tertiary dark:focus:border-blue-500 p-2.5 rounded-lg w-full"
                  type="text"
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  name="isBuyer"
                  checked={formData.isBuyer}
                  onChange={handleChange}
                  type="checkbox"
                  className="mr-2"
                />
                <label className="dark:text-white">Buyer</label>
              </div>
              <div className="mb-4 flex items-center">
                <input
                  name="isSeller"
                  checked={formData.isSeller}
                  onChange={handleChange}
                  type="checkbox"
                  className="mr-2"
                />
                <label className="dark:text-white">Seller</label>
              </div>
              
            </div>
          </div>
          
          {/* Submit button */}
          <div className="mt-5">
            <button type="submit" className="bg-orange-600 text-white p-2 rounded w-full md:w-1/3">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditProfile;
