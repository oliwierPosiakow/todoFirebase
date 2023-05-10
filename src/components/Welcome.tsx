import SignIn from "./SignIn";
import SignUp from "./SignUp"
import App from "./App";
import {Routes, Route} from "react-router-dom";
import '../css/welcome.css'

export function Welcome() {
    return (
        <div className="welcome">
            <h1 className="welcome__h1">Todo App</h1>
            <Routes>
                <Route path='/' element={<SignIn/>} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/app' element={<App/>} />
            </Routes>
        </div>
    );
}