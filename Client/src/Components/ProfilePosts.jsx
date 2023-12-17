import React from 'react'

const ProfilePosts = () => {
  return (
    <div className="w-full flex mt-8 space-x-4">
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEgaTspKHTvZNIYz97ZfrQk4aEdxRAj-lFEw&usqp=CAU" alt="" className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          10 Uses of Artificial Intelligence in Day to Day Life
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@xxxxx</p>
          <div className="flex space-x-2">
            <p>25/12/2023</p>
            <p>24:24</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam ab officiis quaerat repellat possimus dolore dicta ex vel numquam nihil.</p>
      </div>
    </div>
  )
}

export default ProfilePosts
