import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom"
import api from "./api";
export const useAuthentication = () =>{
    const {authenticated,setAuthenticated} = useAuthContext()
    const navigate = useNavigate()

    const authUser = (data) => {
        localStorage.setItem('token',data.token)
        setAuthenticated(true)
        navigate('/')
    }
    const register = (data) => {
        api.post('/register',data).then((response)=>{authUser(response.data)}).catch((err)=>{console.log('Erro no registro!')})
    }
    const login = (data) => {
        api.post('/login',data).then((response)=>{authUser(response.data)}).catch((err)=>{console.log('Erro no login!')})
    }

    const logout = async()=>{
        const token = localStorage.getItem('token')
        await api.delete('/exit',{
            headers:{
              authorization:`Bearer ${token}`
            }
        }).then((response)=>{
            console.log(response.data.msg)
            api.defaults.headers.Authorization = undefined
            localStorage.removeItem('token')
            setAuthenticated(false)
            navigate('/login')
        }).catch((err)=>{
            console.log(err.response.data.msg)
        })
        
    }

  
    return {register,login,logout}
}