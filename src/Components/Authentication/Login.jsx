import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';


const Login = () => {

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
                // console.log(loggedInUser);
                // const user = { email }
                // axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                //     .then((res) => {
                //         console.log(res.data);
                //         if (res.data.success) {
                //             // navigate(location?.state ? location?.state : '/')
                //         }
                //     })

            })
            .catch(err => console.log(err.message))
    }
    const handleGoogleLogin = () => {
        googleSignIn()
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
                            <label className="label">
                                <Link to={'/signup'} href="#" className="label-text-alt link link-hover">Register</Link>
                            </label>
                        </div>
                        <div className="mt-6 form-control">
                            <button className="btn btn-accent">Login</button>
                        </div>
                        <div>
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