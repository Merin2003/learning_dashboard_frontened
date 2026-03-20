import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {

      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password }
      )

      console.log(res.data)

      localStorage.setItem("token", res.data.token)

      navigate("/dashboard")

    } catch (err) {

      console.log(err)
      const message = err?.response?.data?.message || "Login failed"
      alert(message)

    }
  }

  return (
    <div className="login-container">

      <div className="login-card">

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

        </form>

        <p>
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>

      </div>

    </div>
  )
}

export default Login