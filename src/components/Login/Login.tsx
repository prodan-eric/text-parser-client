import React, { useState } from "react"
import { auth } from "../../api"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import getUserError from "../../api/getUserError"

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/")
        setError("")
      })
      .catch((error) => {
        const userError = getUserError(error.message)
        console.log(error)
        setError(userError)
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 text-center">
            <Link
              to="/signup"
              className="text-blue-500 text-xs hover:underline"
            >
              Don't have an account? Sign up
            </Link>
          </div>
          {error && (
            <p className="text-red-500 text-xs mt-2 flex justify-center mb-4">
              {error}
            </p>
          )}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-md hover:from-blue-300 hover:to-blue-400 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 ease-in-out shadow-lg"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
