import React from 'react'
import {Link} from 'react-router-dom'
const Register = () => {
  return (
    <div className="formContainer">
        <h1>Register</h1>
        <form>
            <label htmlFor="username">User name:</label>
            <input name='username' type="text" />
            <label htmlFor="email">E-mail:</label>
            <input name='email' type="text" />
            <label htmlFor="password">Password:</label>
            <input name='password' type="password" />
            <button type="submit">Register</button>
        </form>
        <p>You already have an account? <Link to='/Login'>Click here</Link>.</p>
    </div>
  )
}

export default Register