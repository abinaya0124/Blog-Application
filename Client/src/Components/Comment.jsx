import React from "react";
import { useContext } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../Context/UserContext";

const Comment = ({ commentsData, post }) => {
  const { user } = useContext(UserContext);
  const deleteComment = async (id) => {
    try {
      await axios.delete("https://localhost:8000/api/comments/" + id, {
        withCredentials: true,
      });
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(post.userId)
  // console.log(user._id)
  // console.log(post)
  // console.log(user)

  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-600 font-bold ">@{commentsData.author}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p className="text-gray-500 text-sm">
            {new Date(commentsData.updatedAt).toString().slice(0, 15)}
          </p>
          <p className="text-gray-500 text-sm">
            {new Date(commentsData.updatedAt).toString().slice(16, 24)}
          </p>
          {user?._id === commentsData?.userId ? (
            <div className="flex items-center justify-center space-x-2">
              <p
                className="cursor-pointer"
                onClick={() => deleteComment(commentsData._id)}
              >
                <MdDelete />
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <p className="px-4 mt-2">{commentsData.comment}</p>
    </div>
  );
};

export default Comment;
