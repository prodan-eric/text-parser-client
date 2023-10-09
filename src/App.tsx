import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/Login/Login";
import { AuthProvider } from "./auth/Auth";
import Home from "./components/Home";
import SignUp from "./components/SignUp/SignUp";
// import About from "./components/About";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
