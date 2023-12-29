import { useContext, useState } from "react";
import { ImCross } from "react-icons/im";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDes] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  console.log(file);
  const navigate = useNavigate();

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  const deleteCategory = (id) => {
    let updatedCats = [...cats];
    updatedCats.splice(id);
    setCats(updatedCats);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      description:description,
      username: user.username,
      userId: user._id,
      categories: cat,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      // console.log(data);
      try {
        const imgUpload = await axios.post(
          "http://localhost:8000/api/upload",
          data
        );
        console.log(imgUpload.data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/posts/create",
        post,
        { withCredentials: true }
      );
      // console.log(res.data);
      navigate("/posts/post/" + res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl">Create a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8">
          <input
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none mt-4"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="file"
            className="px-4"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                className="px-4 py-2 outline-none"
                placeholder="Enter post category"
                type="text"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
              />
              <div
                className="text-white bg-black px-4 py-2 font-semibold cursor-pointer"
                onClick={addCategory}
              >
                Add
              </div>
            </div>
            <div className="flex px-4 mt-3">
              {cats?.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-2 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{item}</p>
                  <p
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                    onClick={() => deleteCategory(i)}
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <textarea
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none "
            placeholder="Enter post description"
            onChange={(e) => setDes(e.target.value)}
          />
          <button
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
            onClick={handleCreate}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
