import {Link, useNavigate} from "react-router-dom";
import '../css/signup.css'
import {useState} from "react";
// @ts-ignore
import {UserAuth} from "../context/AuthContext"
function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
            console.log(e.message)
        }
    }

    return(
        <div className="wrapper">
            <form className='wrapper-form' onSubmit={handleSubmit}>
                <h1 className='wrapper-form__h1'>Sign Up</h1>
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
                <button className='wrapper-form__button'>Sign Up</button>
            </form>
            <p className='wrapper__p'>Already have an account? <Link to='/'>Sign In</Link></p>
        </div>
    )
}
export default SignUp