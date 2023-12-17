import { Link } from "react-router-dom";
import { LuSearch } from "react-icons/lu";

const Navbar = () => {
  const user = false;
  return (
    <div className="flex justify-between items-center px-6 py-4 md:px-[200px]">
      <h1 className="text-xl md:text-xl font-extrabold">
        <Link to="/">Blog Market</Link>
      </h1>
      <div className="flex justify-center items-center space-x-0">
        <p>
          <LuSearch />
        </p>
        <input
          className="outline-none px-3 py-1 "
          placeholder="Search a post"
          type="text"
        />
      </div>

      <div className="flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3>
            <Link to="/create">Create Post</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <h3>
            <Link to="/profile">Profile</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
    </div>
  );
};

export default Navbar;
