import { useContext, useEffect, useState } from "react";
import ProfilePosts from "../Components/ProfilePosts";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const params = useParams().id;
  const navigate = useNavigate();
  const [updated, setUpdated] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/users/" + user._id
      );
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [params]);

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        "http://localhost:8000/api/users/" + user._id,
        { username, email, password },
        { withCredentials: true }
      );
      console.log(res.data);
      setUpdated(true);
    } catch (error) {
      setUpdated(false)
      console.log(error)
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(
        "http://localhost:8000/api/users/" + user._id,
        { withCredentials: true }
      );
      console.log(res.data);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/posts/user/" + user._id
      );
      setPosts(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [params]);

  return (
    <div>
      <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          <h1 className="text-xl font-bold mb-4">Your posts:</h1>
          {posts?.map((item, id) => (
            <ProfilePosts key={item._id} allPost={item} />
          ))}
        </div>
        <div className="md:sticky md:top-16 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
          <div className="flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center space-x-4 mt-8">
              <button
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
                onClick={handleUserUpdate}
              >
                Update
              </button>
              <button
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
                onClick={handleUserDelete}
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="text-orange-500 text-sm text-center mt-4">
                User updated successfully
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
