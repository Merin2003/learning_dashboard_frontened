import { useNavigate } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to Learning Dashboard</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard