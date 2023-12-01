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
        await api.post('/register',data).then((response)=>{authUser(response.data)}).catch((err)=>{console.log('Erro no registro!')})
    }
    const login = async(data) => {
        await api.post('/login',data).then((response)=>{authUser(response.data)}).catch((err)=>{
            if(err.response.data.isLogged === true){setError(true)}
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
            
        })
        
    }

  
    return {register,login,logout}
}