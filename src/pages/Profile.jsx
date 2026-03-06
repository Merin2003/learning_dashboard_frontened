import { useState } from "react"

function Profile() {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState("Merin Mathew")
  const [email, setEmail] = useState("merin@email.com")
  const [bio, setBio] = useState("Computer Science Student | MERN Developer")

  return (
    <div className="profile-container">

      <div className="profile-card">
        <div className="avatar">
          {name.charAt(0)}
        </div>

        {editing ? (
          <>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
            <button onClick={() => setEditing(false)}>Save</button>
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
          <p>3</p>
        </div>

        <div className="stat-box">
          <h3>Completed</h3>
          <p>1</p>
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