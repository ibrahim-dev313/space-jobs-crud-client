import { createBrowserRouter } from "react-router-dom";
import AddJob from "../Components/AddJob/AddJob";
import AllJobs from "../Components/AllJobs/AllJobs";
import AppliedJobs from "../Components/AppliedJobs/AppliedJobs";
import Login from "../Components/Authentication/Login";
import Register from "../Components/Authentication/Register";
import Blogs from "../Components/Blogs/Blogs";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import Home from "../Components/Home/Home";
import JobDetails from "../Components/JobDetails/JobDetails";
import MyJobs from "../Components/MyJobs/MyJobs";
import Main from "../Layout/Main";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                loader: () => fetch(`https://spacejobs-mi1357.vercel.app/jobs`)
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <Register></Register>
            },
            {
                path: "/blogs",
                element: <Blogs></Blogs>
            },
            {
                path: "/add-job",
                element: <PrivateRoute><AddJob /></PrivateRoute>
            },
            {
                path: "/all-jobs",
                element: <AllJobs />,
                loader: () => fetch(`https://spacejobs-mi1357.vercel.app/jobs`)
            },
            {
                path: "/my-jobs",
                element: <PrivateRoute><MyJobs /></PrivateRoute>,
                loader: () => fetch(`https://spacejobs-mi1357.vercel.app/jobs`)
            },
            {
                path: "/job/:id",
                element: <PrivateRoute><JobDetails></JobDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://spacejobs-mi1357.vercel.app/job/${params.id}`)
                //https://spacejobs-mi1357.vercel.app/
            },
            {
                path: "/applied-jobs",
                element: <PrivateRoute><AppliedJobs /></PrivateRoute>,
                loader: () => fetch(`https://spacejobs-mi1357.vercel.app/applied-jobs`)
            },
        ]
    },
]);
export default router;