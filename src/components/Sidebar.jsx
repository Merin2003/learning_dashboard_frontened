import { NavLink, useNavigate } from "react-router-dom"

function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div className="sidebar">
      <h2 className="logo">LearnHub</h2>

      <NavLink to="/dashboard" className="nav-item">
        Dashboard
      </NavLink>

      <NavLink to="/courses" className="nav-item">
        Courses
      </NavLink>

      <NavLink to="/profile" className="nav-item">
        Profile
      </NavLink>

      <NavLink to="/progress" className="nav-item">
        Progress
      </NavLink>

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  )
}

export default Sidebar