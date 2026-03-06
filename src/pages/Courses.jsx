import { useState } from "react"

function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [completed, setCompleted] = useState({})

  const courses = ["React", "Node", "MongoDB"]

  const markComplete = (course) => {
    setCompleted({ ...completed, [course]: true })
  }

  return (
    <div>
      <div className="card">
        <h2>My Courses</h2>
        <div className="course-buttons">
          {courses.map((course) => (
            <button
              key={course}
              className="course-btn"
              onClick={() => setSelectedCourse(course)}
            >
              {course}
              {completed[course] && " ✅"}
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
          >
            Mark as Completed
          </button>
        </div>
      )}
    </div>
  )
}

export default Courses