import React from 'react'
import styles from './Login.module.css'
import {Link} from 'react-router-dom'
const Login = () => {
  return (
    <div className={styles.container}>
        <h1>Login</h1>
        <form>
            <label htmlFor="">E-mail:</label>
            <input type="text" />
            <label htmlFor="">Password:</label>
            <input type="password" />
            <button type="submit">Login</button>
        </form>
        <p>Not have an account yet? <Link to='/register'>Click here</Link>.</p>
    </div>
  )
}

export default Login