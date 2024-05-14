import React from 'react'

const Profile = ({ user }) => {
  return (
    <div>
      <h1>Your Profile</h1>
      <p>Welcome, {user.username}!</p>
    </div>
  )
}

export default Profile