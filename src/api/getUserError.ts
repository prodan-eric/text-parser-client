const getUserError = (errorMessage: string) => {
  const match = errorMessage.match?.(/\(([^)]+)\)/)
  if (!match) return "An error occurred."
  switch (match[1]) {
    case "auth/weak-password":
      return "Password must be at least 6 characters long."
    case "auth/user-not-found":
      return "No user found with this email address."
    case "auth/wrong-password":
      return "Wrong password. Please try again."
    case "auth/email-already-in-use":
      return "This E-mail is already registered."
    default:
      return "An error occurred. Please try again."
  }
}
export default getUserError
