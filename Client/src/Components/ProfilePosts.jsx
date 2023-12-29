import React from "react";

const ProfilePosts = ({ allPost }) => {
  return (
    <div className="w-full flex mt-8 space-x-4">
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img
          src={"http://locahost:8000/api/upload/"+allPost.photo}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {allPost.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{allPost.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(allPost.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(allPost.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          {allPost.description.slice(0.200)+"Read more..."}
        </p>
      </div>
    </div>
  );
};

export default ProfilePosts;
