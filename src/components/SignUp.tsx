import {Link} from "react-router-dom";
import '../css/signup.css'

function SignUp() {
    return(
        <div className="wrapper">
            <form className='wrapper-form'>
                <h1 className='wrapper-form__h1'>Sign Up</h1>
                <label htmlFor="signup-email">Email</label>
                <input id='signup-email' className='wrapper-form__email' type="email" placeholder='Enter email' required/>
                <label htmlFor="signup-password">Password</label>
                <input id='signup-password' className='wrapper-form__password' type="password" placeholder='Password' required/>
                <button className='wrapper-form__button'>Sign Up</button>
            </form>
            <p className='wrapper__p'>Already have an account? <Link to='/'>Sign In</Link></p>
        </div>
    )
}
export default SignUp