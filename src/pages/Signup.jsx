import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;

function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/signup`, {
        name,
        email,
        password,
        role: "user"
      })

      alert("Signup Successful")
      navigate("/")   // 👈 go back to login
    } catch (err) {
      console.error(err);
      const message = err?.response?.data?.message || "Signup Failed";
      alert(message);
    }
  }

  return (
    <div>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      /><br /><br />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={handleSignup}>Signup</button>
    </div>
  )
}

export default Signup