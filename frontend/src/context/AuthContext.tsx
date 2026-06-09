import { createContext , useContext,useState,useEffect} from "react";
import type { ReactNode } from "react";
import  type { IUser } from "../types";


interface AuthContextType {
    user : IUser | null ; 
    token : string | null ; 
    login : (token : string , user : IUser )=>  void  ; 
    logout : ()=> void ; 
    isAuthenticated : boolean
}

const AuthContext = createContext<AuthContextType|undefined>(undefined) ; 



export const AuthProvider = ({children} : {children:ReactNode})=>{
          const [user,setUser] = useState<IUser|null>(null) ; 
          const [token,setToken] = useState<string|null>(null) ; 


          // Load from local storage at the starting of the app
          useEffect(()=>{
            const savedToken = localStorage.getItem('token') ; 
            const savedUser = localStorage.getItem('user') ; 
            if(savedToken && savedUser){
                 setToken(savedToken) ; 
                 setUser(JSON.parse(savedUser)) ; 
            }
          },[]) ; 


          const login = (token:string , user :IUser)=>{
                localStorage.setItem('token' , token) ;
                localStorage.setItem('user' , JSON.stringify(user)) ; 
                setToken(token) ; 
                setUser(user) ;  
          }

          const logout = ()=>{
              localStorage.removeItem('token') ; 
              localStorage.removeItem('user') ; 
              setToken(null) ; 
              setUser(null)  ; 
          }


          return (
             <AuthContext.Provider value={{user,token,login,logout,isAuthenticated : !!token}}>
                       {children}
             </AuthContext.Provider>
          ) ; 
}


export const useAuth = ()=>{
        const context = useContext(AuthContext) ; 
        if(!context) throw new Error("use auth must be within auth provider") ;
        return context ;  
} ; 