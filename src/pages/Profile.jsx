import axios from "axios"
import { useEffect, useState } from "react"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

function Profile() {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState("Loading...")
  const [email, setEmail] = useState("Loading...")
  const [bio, setBio] = useState("Loading...")

  // Dashboard stats to display in profile
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0
  })

  // Fetch initial profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch user basic info
        const profileRes = await axios.get(`${API_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const user = profileRes.data;
        setName(user.name || "");
        setEmail(user.email || "");
        setBio(user.bio || "");

        // Fetch stats from dashboard route
        const statsRes = await axios.get(`${API_URL}/api/users/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setStats(statsRes.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API_URL}/api/users/profile/update`,
        { name, email, bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUser = res.data;
      setName(updatedUser.name);
      setEmail(updatedUser.email);
      setBio(updatedUser.bio);
      setEditing(false);

    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="profile-container">

      <div className="profile-card">
        <div className="avatar">
          {name ? name.charAt(0).toUpperCase() : "?"}
        </div>

        {editing ? (
          <>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
            <button onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <h2>{name}</h2>
            <p>{email}</p>
            <p className="bio">{bio}</p>
            <button onClick={() => setEditing(true)}>Edit Profile</button>
          </>
        )}
      </div>

      <div className="profile-stats">
        <div className="stat-box">
          <h3>Courses</h3>
          <p>{stats.totalCourses}</p>
        </div>

        <div className="stat-box">
          <h3>Completed</h3>
          <p>{stats.completedCourses}</p>
        </div>

        <div className="stat-box">
          <h3>Rank</h3>
          <p>#12</p>
        </div>
      </div>

    </div>
  )
}

export default Profile