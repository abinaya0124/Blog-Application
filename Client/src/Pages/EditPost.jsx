import { useContext, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useNavigate,useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const EditPost = () => {
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState([]);
  const {user}=useContext(UserContext)
  const navigate=useNavigate()

  const postId = useParams().id;

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCats(updatedCats);
  };

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i);
    setCats(updatedCats);
  };

  const fetchPost = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/posts/" + postId);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setFile(res.data.photo);
      setCats(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      description,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      // console.log(data)
      //img upload
      try {
        const imgUpload = await axios.post("http://localhost:8000/api/upload", data);
        console.log(imgUpload.data)
      } catch (err) {
        console.log(err);
      }
    }
    //post upload

    try {
      const res = await axios.put("http://localhost:8000/api/posts/" + postId, post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
      console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl">Update a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8">
          <input
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 mt-4 outline-none "
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input
            type="file"
            className="px-4"
            onChange={(e) => e.target.files[0]}
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
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
                onClick={addCategory}
              >
                Add
              </div>
            </div>
            {/* Categories */}
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
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <button
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
            onClick={handleUpdate}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
