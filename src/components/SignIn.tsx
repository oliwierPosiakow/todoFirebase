import {Link} from "react-router-dom";
import '../css/signup.css'
const SignIn = () => {
    return (
        <div className="wrapper">
            <form className='wrapper-form'>
                <h1 className='wrapper-form__h1'>Sign In</h1>
                <label htmlFor="signin-email">Email</label>
                <input id='signin-email' className='wrapper-form__email' type="email" placeholder='Enter email' required/>
                <label htmlFor="signin-password">Password</label>
                <input id='signin-password' className='wrapper-form__password' type="password" placeholder='Password' required/>
                <button className='wrapper-form__button'>Sign In</button>
            </form>
            <p className='wrapper__p'>Don't have an account yet? <Link to='/signup'>Sign Up</Link></p>
        </div>
    )
}
export default SignIn