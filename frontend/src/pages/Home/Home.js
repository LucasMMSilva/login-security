import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
import api from '../../hooks/api'
const Home = () => {
  const {authenticated} = useAuthContext()
  const {logout} = useAuthentication()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [user,setUser] = useState([])
  useEffect(()=>{
    if(!authenticated){
      navigate('/login')
    }
    api.get('/',{
      headers:{
        authorization:`Bearer ${token}`
      }
    }).then((res)=>{
      setUser(res.data)
    })
  },[])

  return (
    <div className="homeContainer">
        <h3>Welcome {user.username}</h3>
        <p>Your ID: {user._id}</p>
        <p>E-mail: {user.email}</p>
        <button onClick={logout} className='exit'>Sair</button>
    </div>
  )
}

export default Home

