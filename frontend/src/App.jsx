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

const getRoleFromToken = () => {
  const token = localStorage.getItem("Token");
  if (token) {
    try {
      const tokenParts = token.split(".");
      const payload = JSON.parse(atob(tokenParts[1]));
      // console.log(payload);
      const isAdmin = payload.admin.role === "admin" ? true : false;

      // console.log(userId);
      return isAdmin;
    } catch (error) {
      console.log("Error parsing token payload:", error);
    }
  }

  return null;
};

const isAdmin = getRoleFromToken();
console.log(isAdmin);

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect to user-dashboard if authenticated, else show UserLogin */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/user-dashboard" replace /> : <UserLogin />
          }
        />
        {/* Public routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/" element={<UserLogin />} />
        
        {/* Protected routes */}
        {isAuthenticated ? (
          isAdmin ? (
            // Admin Dashboard
            <Route path="admin-dashboard" element={<AdminDashboard />} />
          ) : (
            // User Dashboard
            <Route path="user-dashboard" element={<UserDashboard />} />
          )
        ) : (
          // Redirect unauthenticated users to the home page
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
