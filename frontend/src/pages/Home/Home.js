import React, { useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
const Home = () => {
  const {authenticated} = useAuthContext()
  const {logout} = useAuthentication()
  const navigate = useNavigate()
  useEffect(()=>{
    console.log(authenticated)
    if(!authenticated){
      navigate('/login')
    }
  },[])

  return (
    <div className="homeContainer">
        <h3>Welcome User</h3>
        <p>Your ID: 25s4d56f456sd4</p>
        <p>E-mail: email@mail.com</p>
        <button onClick={logout} className='exit'>Sair</button>
    </div>
  )
}

export default Home