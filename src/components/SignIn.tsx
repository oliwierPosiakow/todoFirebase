import {Link} from "react-router-dom";

const SignIn = () => {
    return (
        <div className="signIn">
            <form className='signIn-form'>
                <h1 className='signIn-form__h1'>Log In</h1>
                <input className='signIn-form__email' type="email" placeholder='Enter email'/>
                <input className='signIn-form__password' type="password" placeholder='Password'/>
            </form>
            <p className='signIn__p'>Don't have an account? <Link to='/signup'>Sign up</Link></p>
        </div>
    )
}
export default SignIn