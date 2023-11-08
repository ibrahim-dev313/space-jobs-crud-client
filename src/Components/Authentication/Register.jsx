import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { pageTitle } from '../../Functions/DynamicTitle';
import { AuthContext } from '../../Providers/AuthProvider';



const Register = () => {
    pageTitle("Sign Up")

    const { registerUser, updateProfileInfo, setPhotoURL } = useContext(AuthContext);

    const handleSignUp = e => {
        e.preventDefault()
        const name = e.target.name.value;
        const photoURL = e.target.photoURL.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (password.length < 6) {
            return toast.error("Password should be at least 6 characters")
        }
        if (!/[A-Z]/.test(password)) {
            return toast.error("Password should have at least 1 Capital Letter")

        }
        if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(password)) {
            return toast.error("Password should be at least 1 special character")

        }


        registerUser(email, password)
            .then(res => {
                console.log(res.user)
                toast.success("Registration Successful");

                updateProfileInfo(name, photoURL).then(() => setPhotoURL(photoURL)).then(err => console.log(err))
                // setTimeout(() => {
                //     navigate("/");

                // }, 3000);
            })
            .catch(err => {
                if (err.message == "Firebase: Error (auth/email-already-in-use).") {
                    toast.error("This email is already used.")
                }
            })
    }


    return (
        <div className="w-full min-h-screen hero ">
            <div className="flex-col w-full hero-content lg:flex-row ">

                <div className="flex-shrink-0 w-full shadow-2xl card bg-base-100 lg:w-1/2">
                    <form onSubmit={handleSignUp} className="w-full space-y-1 card-body">
                        <h1 className="text-5xl font-bold text-center">Sign Up Now!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="font-semibold label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Your Name" className="input input-bordered" name='name' required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="font-semibold label-text">Photo URL</span>
                            </label>
                            <input type="text" placeholder="Your Photo URL" className="input input-bordered" name='photoURL' required />
                        </div>
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
                            <div className="mt-6 form-control">
                                <button className="btn btn-accent">Sign Up</button>
                            </div>
                            <p className='my-4'>Already have an account? <Link to={'/login'} href="#" className="underline text-primary underline-offset-4 link-hover">Login</Link></p>
                        </div>


                    </form>
                </div>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default Register;