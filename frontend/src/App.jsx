import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard"

const isAuthenticated = !!localStorage.getItem("Token");

const token = localStorage.getItem('Token');

if (token) {
  const tokenParts = token.split('.');
  const payload = JSON.parse(atob(tokenParts[1])); 
  console.log('User information:', payload.user);
} else {
  console.log('Token not found in localStorage');
}


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
