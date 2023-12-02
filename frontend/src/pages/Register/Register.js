import {useEffect, useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthContext } from '../../hooks/useAuthContext'
const Register = () => {
  const {register} = useAuthentication()
  const {authenticated,error} =useAuthContext()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  
  useEffect(()=>{
    if(authenticated){
      navigate('/')
    }
  },[])

  const handleSubmit = (e)=>{
    e.preventDefault()

    const user = {
      username, email,password
    }

    register(user)

  }
  return (
    <div className="formContainer">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>

            <label htmlFor="username">User name:</label>
            <input onChange={(e)=>setUsername(e.target.value)} name='username' type="text" value={username}/>
            {error.type === 'REGISTER username' && (
              <div className='error'>
                <p>{error.errors}</p>
              </div>
            )}

            <label htmlFor="email">E-mail:</label>
            <input onChange={(e)=>setEmail(e.target.value)} name='email' type="email" value={email}/>
            {error.type === 'REGISTER email' && (
              <div className='error'>
                <p>{error.errors}</p>
              </div>
            )}

            <label htmlFor="password">Password:</label>
            <input onChange={(e)=>setPassword(e.target.value)} name='password' type="password" value={password}/>
            {error.type === 'REGISTER password' && (
              <div className='error'>
                <p>{error.errors}</p>
              </div>
            )}

            <button type="submit">Register</button>

        </form>
        <p>You already have an account? <Link to='/Login'>Click here</Link>.</p>
    </div>
  )
}

export default Register