import {useEffect, useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthContext } from '../../hooks/useAuthContext'
const Login = () => {
  const {authenticated,error} =useAuthContext()
  const {login} = useAuthentication()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  useEffect(()=>{
    if(authenticated){
      navigate('/')
    }
  },[])

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
            <input onChange={(e)=>setEmail(e.target.value)} type="email" value={email}/>
            {error.type === 'LOGIN email' &&
              <div className='error'>
                <p>{error.errors}</p>
              </div>
            }
        
            <label htmlFor="">Password:</label>
            <input onChange={(e)=>setPassword(e.target.value)} type="password" value={password}/>
            {error.type === 'LOGIN password' &&
              <div className='error'>
                <p>{error.errors}</p>
              </div>
            }

            <button type="submit">Login</button>

        </form>
        <p>Not have an account yet? <Link to='/register'>Click here</Link>.</p>
        {error.type === 'LOGIN logUser' && (
          <div className='error'>
            <p>{error.errors}</p>
          </div>
        )}
    </div>
  )
}

export default Login