import axios from "axios"
import { useEffect, useState } from "react"

const API_URL = import.meta.env.VITE_API_URL;

function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [dbCourses, setDbCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState(null)

  // All available courses in platform
  const availableCourses = ["React", "Node", "MongoDB", "Python", "JavaScript"]

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")
        if (!token) throw new Error("You are not logged in")

        const res = await axios.get(`${API_URL}/api/users/courses`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setDbCourses(res.data || [])
      } catch (err) {
        console.error("Error fetching courses:", err)
        setError(err?.response?.data?.message || err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  // Check if course is completed
  const isCompleted = (courseName) => {
    const course = dbCourses.find(c => c.name === courseName)
    return course ? course.completed : false
  }

  // Mark course as complete
  const markComplete = async (courseName) => {
    try {
      setUpdating(true)
      const token = localStorage.getItem("token")
      if (!token) throw new Error("You are not logged in")

      const url = `${API_URL}/api/users/courses/${encodeURIComponent(courseName)}`
      const res = await axios.put(url, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })

      // Update local state safely
      if (Array.isArray(res.data)) {
        setDbCourses(res.data)
      } else {
        setDbCourses(prev =>
          prev.map(c =>
            c.name === courseName ? { ...c, completed: true } : c
          )
        )
      }

      alert(`${courseName} marked as completed!`)
    } catch (err) {
      console.error("Error completing course:", err)
      const message = err?.response?.data?.message || err.message
      alert(`Failed to mark course complete: ${message}`)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) return <p>Loading courses...</p>

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="card">
        <h2>My Courses</h2>
        <div className="course-buttons">
          {availableCourses.map((course) => (
            <button
              key={course}
              className="course-btn"
              onClick={() => setSelectedCourse(course)}
            >
              {course} {isCompleted(course) && "✅"}
            </button>
          ))}
        </div>
      </div>

      {selectedCourse && (
        <div className="card">
          <h2>{selectedCourse} Course</h2>

          <p>📚 5 Lectures Available</p>
          <p>📝 Notes Included</p>
          <p>🧠 Quiz Available</p>

          <button
            className="complete-btn"
            onClick={() => markComplete(selectedCourse)}
            disabled={isCompleted(selectedCourse) || updating}
          >
            {isCompleted(selectedCourse) ? "Completed" : updating ? "Updating..." : "Mark as Completed"}
          </button>
        </div>
      )}
    </div>
  )
}

export default Courses