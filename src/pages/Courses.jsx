import axios from "axios"
import { useEffect, useState } from "react"

function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null)

  // Real courses fetched from DB
  const [dbCourses, setDbCourses] = useState([])

  // All available courses in platform
  const availableCourses = ["React", "Node", "MongoDB", "Python", "JavaScript"]

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get("http://localhost:5000/api/users/courses", {
          headers: { Authorization: `Bearer ${token}` }
        })
        setDbCourses(res.data)
      } catch (err) {
        console.error("Error fetching courses:", err)
      }
    }
    fetchCourses()
  }, [])

  const isCompleted = (courseName) => {
    const course = dbCourses.find(c => c.name === courseName)
    return course ? course.completed : false
  }

  const markComplete = async (courseName) => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.put(
        `http://localhost:5000/api/users/courses/${courseName}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      // Update local state with the newly returned courses array
      setDbCourses(res.data)
      alert(`${courseName} marked as completed!`)

    } catch (err) {
      console.error("Error completing course:", err)
      alert("Failed to mark course complete")
    }
  }

  return (
    <div>
      <div className="card">
        <h2>My Courses</h2>
        <div className="course-buttons">
          {availableCourses.map((course) => (
            <button
              key={course}
              className="course-btn"
              onClick={() => setSelectedCourse(course)}
            >
              {course}
              {isCompleted(course) && " ✅"}
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
            disabled={isCompleted(selectedCourse)}
          >
            {isCompleted(selectedCourse) ? "Completed" : "Mark as Completed"}
          </button>
        </div>
      )}
    </div>
  )
}

export default Courses