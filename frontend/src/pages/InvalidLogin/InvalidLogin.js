import React from 'react'
import { Link } from 'react-router-dom'
const InvalidLogin = () => {
  return (
    <div className='invalid'>
        <h2>Login cannot be completed</h2>
        <p>The user is already logged in, you will not be able to proceed with authentication!</p>
        <Link to='/login'>Return to login page</Link>
    </div>
  )
}

export default InvalidLogin