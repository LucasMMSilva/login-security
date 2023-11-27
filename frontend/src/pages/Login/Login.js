import {useState} from 'react'
import {Link} from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
const Login = () => {
  
  const {login} = useAuthentication()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = (e)=>{
    e.preventDefault()

    const user = {
      email,password
    }

    login(user)

  }
  
  return (
    
    <div className="formContainer">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="">E-mail:</label>
            <input onChange={(e)=>setEmail(e.target.value)} type="text" value={email}/>
            <label htmlFor="">Password:</label>
            <input onChange={(e)=>setPassword(e.target.value)} type="password" value={password}/>
            <button type="submit">Login</button>
        </form>
        <p>Not have an account yet? <Link to='/register'>Click here</Link>.</p>
    </div>
  )
}

export default Login