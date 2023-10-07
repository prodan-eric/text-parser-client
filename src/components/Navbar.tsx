import { signOut } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../api"
import { TbFileTextAi } from 'react-icons/tb'

const Navbar = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
       console.error(error)
    })
    navigate("/login")
  }

  return (
    <nav className="bg-blue-400 p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            <TbFileTextAi className="text-white w-10 h-10"/>
            <span className="text-white text-xl font-semibold">Text Parser</span>
          </div>
          <div className="flex items-center mt-4 md:mt-0 space-x-4">
            <Link to="/about" className="text-white hover:underline">
              About
            </Link>
            <button
              onClick={handleLogout}
              className="text-white hover:underline cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
