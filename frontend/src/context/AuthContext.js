import {createContext,useState} from 'react'

export const AuthContext = createContext()
export const AuthContextProvider = (({children})=>{
    const token = localStorage.getItem('token')
    const hasToken = token ? true : false
    const [authenticated, setAuthenticated] = useState(hasToken)
    const [error,setError]= useState(false)

    return(
        <AuthContext.Provider value={{authenticated,setAuthenticated,error,setError}}>
            {children}
        </AuthContext.Provider>
    )
})