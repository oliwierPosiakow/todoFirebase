import {Link, useNavigate} from "react-router-dom";
import loginImg from '../assets/login.png'
// @ts-ignore
import {UserAuth} from "../context/AuthContext";
import '../css/signup.css'
import {useState} from "react";
const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const {signIn} = UserAuth()
    const navigate = useNavigate()

    // @ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await signIn(email,password)
            navigate('/app')
        }
        catch (e){
            // @ts-ignore
            setError(e.message.slice(10))
        }
    }

    return (
        <div className="wrapper">
            <h1 className='wrapper__h1'>Sign In</h1>
            <img src={loginImg} alt="Login img, laptop keylock"/>
            <form className='wrapper-form' onSubmit={handleSubmit}>
                <label htmlFor="signin-email">Email</label>
                <input
                    id='signin-email'
                    className='wrapper-form__email'
                    type="email" placeholder='Enter email'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="signin-password">Password</label>
                <input
                    id='signin-password'
                    className='wrapper-form__password'
                    type="password" placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error != '' ? <p className='wrapper-form__error'>{error}</p> : ''}
                <button className='wrapper-form__button'>Sign In</button>
            </form>
            <p className='wrapper__p'>Don't have an account yet? <Link to='/signup'>Sign Up</Link></p>
        </div>
    )
}
export default SignIn