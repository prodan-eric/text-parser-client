import React, { useState } from "react"
import "firebase/auth"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../api"
import { Link, useNavigate } from "react-router-dom"
import getUserError from "../../api/getUserError"

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/")
        setError("")
      })
      .catch((error) => {
        const userError = getUserError(error.message)
        console.log(error.message)
        setError(userError)
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-4">{error}</div>}
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
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-600 font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 text-center">
            <Link to="/login" className="text-blue-500 text-xs hover:underline">
              Already have an account? Sign In
            </Link>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-md hover:from-blue-300 hover:to-blue-400 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 ease-in-out shadow-lg"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
