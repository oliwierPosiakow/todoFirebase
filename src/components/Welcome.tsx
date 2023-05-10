import SignIn from "./SignIn";
import SignUp from "./SignUp"
import App from "./App";
import {Routes, Route} from "react-router-dom";
import '../css/welcome.css'
import {AuthContextProvider} from '../context/AuthContext'
import ProtectedRoute from "./ProtectedRoute";
export function Welcome() {
    return (
        <div className="welcome">
            <AuthContextProvider>
                <header className="header">
                    <h1 className="welcome__h1">Todo App</h1>
                </header>

            <Routes>
                <Route path='/' element={<SignIn/>} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/app' element={
                    <ProtectedRoute>
                        <App/>
                    </ProtectedRoute>
                } />
            </Routes>
            </AuthContextProvider>
        </div>
    );
}