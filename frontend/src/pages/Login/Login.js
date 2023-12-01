import {useEffect, useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthContext } from '../../hooks/useAuthContext'
const Login = () => {
  const {authenticated} =useAuthContext()
  const {login} = useAuthentication()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const error = false;

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
            <label htmlFor="">Password:</label>
            <input onChange={(e)=>setPassword(e.target.value)} type="password" value={password}/>
            <button type="submit">Login</button>
        </form>
        <p>Not have an account yet? <Link to='/register'>Click here</Link>.</p>
        {error && (
          <div className='error'>
            <p>O canta de usuário em que você está tentando se conectar já está em uso, você não tem permição para acessa-la.</p>
          </div>
        )}
    </div>
  )
}

export default Login