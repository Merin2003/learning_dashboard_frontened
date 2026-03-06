import { useState } from "react"

function Dashboard() {
  const [progress] = useState(70)

  return (
    <>
      <div className="card">
        <h2>Welcome Back 👋</h2>
        <p>Track your learning journey and performance.</p>
      </div>

      <div className="card-grid">
        <div className="card small">
          <h3>Total Courses</h3>
          <p>3</p>
        </div>

        <div className="card small">
          <h3>Completed</h3>
          <p>1</p>
        </div>

        <div className="card small">
          <h3>Overall Progress</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard