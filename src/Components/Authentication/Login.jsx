import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { pageTitle } from '../../Functions/DynamicTitle';
import { AuthContext } from '../../Providers/AuthProvider';


const Login = () => {
    pageTitle("Login")

    const { login, googleSignIn } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const form = event.target
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, password, email);
        login(email, password)
            .then(res => {
                const loggedInUser = res.user
                console.log(loggedInUser);
                toast.success('Logged In Successfully')

            })
            .catch(err => {
                console.log(err.message)
                const error = err.message
                if (error == "Firebase: Error (auth/invalid-login-credentials).") {
                    toast.error('Incorrect Email & Password')
                }
            })
    }

    return (
        <div className="w-full min-h-screen hero ">
            <div className="flex-col w-full hero-content lg:flex-row ">

                <div className="flex-shrink-0 w-full shadow-2xl card bg-base-100 lg:w-1/2">
                    <form onSubmit={handleLogin} className="w-full space-y-5 card-body">
                        <h1 className="text-5xl font-bold text-center">Login now!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="font-semibold label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Your Email" className="input input-bordered" name='email' required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="font-semibold label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Your Password" className="input input-bordered" name='password' required />

                        </div>
                        <div className="mt-6 form-control">
                            <button className="btn btn-accent">Login</button>
                        </div>
                        <div>
                            <p className='mb-4'>Don't have an account? <Link to={'/signup'} href="#" className="underline text-primary underline-offset-4 link-hover">Register Here</Link></p>
                            <p className="font-semibold text-center">Or</p>
                            <div className='flex items-center justify-center gap-4 my-4'>

                                <div onClick={googleSignIn} className='flex items-center justify-center rounded-full btn-accent btn'>
                                    <div>
                                        <FontAwesomeIcon icon={faGoogle} size='2xl' style={{ color: "black", }} />
                                    </div>
                                    <div>Continue with Google</div>
                                </div>

                            </div>
                        </div>

                    </form>
                </div>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default Login;