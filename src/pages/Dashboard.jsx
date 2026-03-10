import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {
  const [data, setData] = useState({
    totalCourses: 0,
    completedCourses: 0,
    overallProgress: 0
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(res.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <div className="card">
        <h2>Welcome Back 👋</h2>
        <p>Track your learning journey and performance.</p>
      </div>

      <div className="card-grid">
        <div className="card small">
          <h3>Total Courses</h3>
          <p>{data.totalCourses}</p>
        </div>

        <div className="card small">
          <h3>Completed</h3>
          <p>{data.completedCourses}</p>
        </div>

        <div className="card small">
          <h3>Overall Progress</h3>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${data.overallProgress}%` }}
            >
              {data.overallProgress}%
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard