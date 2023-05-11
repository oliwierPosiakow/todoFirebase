import {Link, useNavigate} from "react-router-dom";
import '../css/signup.css'
import {useState} from "react";
import signUp from '../assets/signup.jpg'
// @ts-ignore
import {UserAuth} from "../context/AuthContext"
function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const {createUser} = UserAuth()
    // @ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await createUser(email, password)
            navigate('/app')
        }
        catch (e){
            // @ts-ignore
            setError(e.message.slice(10))
        }
    }

    return(
        <div className="wrapper">
            <h1 className='wrapper__h1'>Create an account</h1>
            <img src={signUp} alt="Signup image, people, account"/>
            <form className='wrapper-form' onSubmit={handleSubmit}>
                <label htmlFor="signup-email">Email</label>
                <input
                    id='signup-email'
                    className='wrapper-form__email'
                    type="email" placeholder='Enter email'
                    onChange={(e)=> setEmail(e.target.value)}
                    required
                />

                <label htmlFor="signup-password">Password</label>
                <input
                    id='signup-password'
                    className='wrapper-form__password'
                    type="password" placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error != '' ? <p className='wrapper-form__error'>{error}</p> : ''}
                <button className='wrapper-form__button'>Sign Up</button>
            </form>
            <p className='wrapper__p'>Already have an account? <Link className='p__link' to='/'>Sign In</Link></p>
        </div>
    )
}
export default SignUp