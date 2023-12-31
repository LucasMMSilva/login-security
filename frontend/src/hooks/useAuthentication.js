import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom"
import api from "./api";
export const useAuthentication = () =>{
    const {authenticated,setAuthenticated,setError} = useAuthContext()
    const navigate = useNavigate()

    const authUser = (data) => {
        localStorage.setItem('token',data.token)
        setAuthenticated(true)
        navigate('/')
    }
    const register = async(data) => {
        await api.post('/register',data).then((response)=>{authUser(response.data)}).catch((err)=>{setError(err.response.data)})
    }
    const login = async(data) => {
        await api.post('/login',data).then((response)=>{authUser(response.data)}).catch((err)=>{
            setError(err.response.data)
        })
    }

    const logout = async()=>{
        const token = localStorage.getItem('token')
        await api.delete('/exit',{
            headers:{
              authorization:`Bearer ${token}`
            }
        }).then((response)=>{
            api.defaults.headers.Authorization = undefined
            localStorage.removeItem('token')
            setAuthenticated(false)
            navigate('/login')
        }).catch((err)=>{
            api.defaults.headers.Authorization = undefined
            localStorage.removeItem('token')
            setAuthenticated(false)
            navigate('/login')
        })
        
    }

  
    return {register,login,logout}
}