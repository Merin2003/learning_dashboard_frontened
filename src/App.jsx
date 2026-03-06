import { BrowserRouter, Routes, Route } from "react-router-dom"
import Protected from "./components/ProtectedRoute"
import Layout from "./components/Layout"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Courses from "./pages/Courses"
import Profile from "./pages/Profile"
import Progress from "./pages/Progress"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard"
          element={
            <Protected>
              <Layout>
                <Dashboard />
              </Layout>
            </Protected>
          }
        />

        <Route path="/courses"
          element={
            <Protected>
              <Layout>
                <Courses />
              </Layout>
            </Protected>
          }
        />

        <Route path="/profile"
          element={
            <Protected>
              <Layout>
                <Profile />
              </Layout>
            </Protected>
          }
        />

        <Route path="/progress"
          element={
            <Protected>
              <Layout>
                <Progress />
              </Layout>
            </Protected>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App