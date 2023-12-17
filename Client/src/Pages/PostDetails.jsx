import React from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Comment from "../Components/Comment";

const PostDetails = () => {
  return (
    <div>
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            molestiae quis fugiat, dolore deserunt accusantium?
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <p>
              <BiEdit />
            </p>
            <p>
              <MdDelete />
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@xxxxx</p>
          <div className="flex space-x-2">
            <p>25/12/2023</p>
            <p>24:24</p>
          </div>
        </div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEgaTspKHTvZNIYz97ZfrQk4aEdxRAj-lFEw&usqp=CAU"
          alt=""
          className="w-full mx-auto mt-8"
        />
        <p className="mx-auto mt-8">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga animi
          quo nihil aperiam quibusdam. Voluptatibus, atque hic porro alias
          quidem ipsa facilis saepe impedit neque illum maiores adipisci commodi
          ab, libero ducimus quam dignissimos tempora earum distinctio aliquid
          quia! Rerum non iure sequi nesciunt, dolores eligendi commodi
          laboriosam quasi dolore voluptas quo cumque alias mollitia quae vero
          est magni reprehenderit cupiditate at. Quas consequatur repellat vel
          neque quis obcaecati autem. Odio, corrupti sequi! Porro voluptatibus
          quisquam sint illum, quos corporis totam eveniet cumque ab iste,
          similique quod provident inventore vitae.
        </p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">
            <div className="bg-gray-300 rounded-lg px-3 py-1">Techh</div>
            <div className="bg-gray-300 rounded-lg px-3 py-1">AI</div>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
          <Comment />
          <Comment />
        </div>
        {/* Write a comment */}
        <div className="flex w-full flex-col mt-4 md:flex-row">
          <input
            type="text"
            placeholder="Write a comment"
            className="md:w-[80%] outline-none px-4 mt-4 md:mt-0"
          />
          <button className="bg-black text-sm text-white px-4 py-2 md:w-[20%] mt-4 md:mt-0">
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
