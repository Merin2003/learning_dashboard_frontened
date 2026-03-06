function Progress() {

  const courses = [
    { name: "React", progress: 80 },
    { name: "Node", progress: 60 },
    { name: "MongoDB", progress: 100 }
  ]

  return (
    <div className="card">
      <h2>Learning Progress</h2>

      {courses.map((course, index) => (
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
      ))}

    </div>
  )
}

export default Progress