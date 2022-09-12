import {Navigate} from "react-router-dom"

import {useUserAuth} from '../context/UserAuthContext'

 const ProtectedRoute = ({children}:any)=> {
  let {user}:any = useUserAuth();

  if(!user) {
    
    return <Navigate to="/"/>
  }
  return children
}
export default ProtectedRoute