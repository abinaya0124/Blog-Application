import React, { useEffect, useState } from "react";
import HomePosts from "../Components/HomePosts";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loader from "../Components/Loader";

const Home = () => {
  const {search}=useLocation()
  const [posts, setPosts] = useState([]);
  const [noSearchResult, setNoSearchResult]=useState(false)
  const [loader, setLoader]=useState(false)

  const fetchPosts = async () => {
    setLoader(true)
    try {
      const res = await axios.get("http://localhost:8000/api/posts/"+search);
      setPosts(res.data);
      // console.log(res.data);
      
      if(res.data.length===0){
        setNoSearchResult(true)
      }
      else{
        setNoSearchResult(false)
      }
      setLoader(false)
    } catch (error) {
      console.log(error);
      setLoader(true)
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);
  return (
    <div className="px-8 md:px-[200px] min-h-[80vh]">
      {loader?<div className="h-[50vh] flex justify-center items-center"><Loader/></div>:!noSearchResult?posts.map((post) => (
        <HomePosts key={post._id} post={post} />
      )):<h3 className="text-center font-bold mt-16">No posts available</h3>}
    </div>
  );
};

export default Home;
