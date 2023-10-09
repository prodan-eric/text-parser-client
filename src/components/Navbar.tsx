import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../api";
import { TbFileTextAi } from 'react-icons/tb';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
       console.error(error);
    })
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-400 to-purple-500 p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-6">
            <TbFileTextAi className="text-white w-12 h-12"/>
            <span className="text-white text-2xl font-semibold">Text Parser</span>
          </div>
          <div className="flex items-center mt-4 md:mt-0 space-x-6">
            {/* <Link to="/about" className="text-white hover:underline transition duration-300 ease-in-out">
              About
            </Link> */}
            <button
              onClick={handleLogout}
              className="text-white hover:bg-purple-700 px-4 py-2 rounded transition duration-300 ease-in-out transform hover:-translate-y-0.5"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
