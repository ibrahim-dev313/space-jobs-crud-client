import { createBrowserRouter } from "react-router-dom";
import AddJob from "../Components/AddJob/AddJob";
import AllJobs from "../Components/AllJobs/AllJobs";
import AppliedJobs from "../Components/AppliedJobs/AppliedJobs";
import Login from "../Components/Authentication/Login";
import Register from "../Components/Authentication/Register";
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
                loader: () => fetch(`http://localhost:4000/jobs`)
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
                path: "/add-job",
                element: <PrivateRoute><AddJob /></PrivateRoute>
            },
            {
                path: "/all-jobs",
                element: <PrivateRoute><AllJobs /></PrivateRoute>,
                loader: () => fetch(`http://localhost:4000/jobs`)
            },
            {
                path: "/my-jobs",
                element: <PrivateRoute><MyJobs /></PrivateRoute>,
                loader: () => fetch(`http://localhost:4000/jobs`)
            },
            {
                path: "/job/:id",
                element: <PrivateRoute><JobDetails></JobDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:4000/job/${params.id}`)
            },
            {
                path: "/applied-jobs",
                element: <PrivateRoute><AppliedJobs /></PrivateRoute>,
                loader: () => fetch(`http://localhost:4000/applied-jobs`)
            },
        ]
    },
]);
export default router;