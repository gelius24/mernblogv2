import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

export default function Comment({ comment, onLike, onEdit }) {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(comment.content);

  // fetch user data
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, 
      { method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({content: newContent})
    })
    if (res.ok) {
      setIsEditing(false)
      onEdit(comment, newContent)
    }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    setNewContent(comment.content)
  }

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      {/* creator of the comment data (profile pic, username) */}
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {/* comment content with like btn and options */}
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            ></Textarea>
            <div className="flex justify-end gap-2 text-xs">
              <Button type="button" size='sm' gradientDuoTone='purpleToBlue' onClick={handleSave}>Save</Button>
              <Button type="button" size='sm' gradientDuoTone='purpleToBlue' outline onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          </>
        ) : (
          <>
            <p className="pb-2">{comment.content}</p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
              <button
                onClick={() => onLike(comment._id)}
                type="button"
                className={`hover:text-blue-500 text-gray-400 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p>
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes > 1 ? "likes" : "like")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <button
                    onClick={handleEdit}
                    type="button"
                    className="text-gray-400 hover:text-blue-500"
                  >
                    Edit
                  </button>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
