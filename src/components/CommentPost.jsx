import React from 'react'
import { formatDistanceToNow } from 'date-fns';

const CommentPost = ({ comment }) => {
  return (
    <div className="flex flex-col p-2 mb-4 bg-white border border-transparent rounded-lg dark:bg-dark dark:text-white">
    <div className="flex items-center space-x-3">
      <div className="text-lg font-semibold text-gray-800 dark:text-gray-300">{comment.author}</div>
      <span>{formatDistanceToNow(new Date(comment.created_at), )}</span>
    </div>
    <p className="mt-2 text-gray-700 dark:text-white">{comment.content}</p>
    
    {/* If there are replies, they can be displayed here */}
    {comment.replies && comment.replies.length > 0 && (
      <div className="mt-4 pl-4 border-l-2 border-gray-200">
        {comment.replies.map((reply) => (
          <div key={reply.id} className="mt-2">
            <div className="flex items-center space-x-3">
              <div className="text-sm font-semibold text-gray-700">{reply.author}</div>
              <span className="text-xs text-gray-500">{new Date(reply.created_at).toLocaleString()}</span>
            </div>
            <p className="mt-1 text-gray-600">{reply.content}</p>
          </div>
        ))}
      </div>
    )}
  </div>
  )
}

export default CommentPost