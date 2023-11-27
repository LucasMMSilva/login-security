import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom"
import api from "./api";
export const useAuthentication = () =>{
    const {authenticated,setAutheticated} = useAuthContext()
    const navigate = useNavigate()

    const authUser = (data) => {
        localStorage.setItem('token',data.token)
        setAutheticated(true)
        navigate('/')
    }
    const register = (data) => {
        api.post('/register',data).then((response)=>{authUser(response.data)}).catch((err)=>{console.log('Erro no registro!')})
    }
    const login = (data) => {
        api.post('/login',data).then((response)=>{authUser(response.data)}).catch((err)=>{console.log('Erro no login!')})
    }

    const logout = ()=>{
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        setAutheticated(false)
        navigate('/login')
    }

    return {register,login,logout}
}