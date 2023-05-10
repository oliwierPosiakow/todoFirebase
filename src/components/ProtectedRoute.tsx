import {Navigate} from "react-router-dom";
// @ts-ignore
import {UserAuth} from "../context/AuthContext.jsx";

// @ts-ignore
const ProtectedRoute = ({children}) => {
    const {user} = UserAuth()

    if(!user){
        return <Navigate to='/'/>
    }
    return children
}

export default ProtectedRoute