import axios from "axios"
import { useEffect, useState } from "react"

function Progress() {
  const [dbCourses, setDbCourses] = useState([])

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

  // Show 100% if completed, else 0% (Since we only track "completed" boolean for now)
  const courseProgressList = dbCourses.map(c => ({
    name: c.name,
    progress: c.completed ? 100 : 0
  }))

  return (
    <div className="card">
      <h2>Learning Progress</h2>

      {courseProgressList.length === 0 ? (
        <p>You haven't enrolled in any courses yet. Go to the Courses tab to start learning!</p>
      ) : (
        courseProgressList.map((course, index) => (
          <div key={index} className="progress-section">
            <h4>{course.name}</h4>
            <div className="progress-bar-modern">
              <div
                className="progress-fill-modern"
                style={{ width: `${course.progress}%` }}
              >
                {course.progress}%
              </div>
            </div>
          </div>
        ))
      )}

    </div>
  )
}

export default Progress