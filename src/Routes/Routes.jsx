import { createBrowserRouter } from "react-router-dom";
import Login from "../Components/Authentication/Login";
import Home from "../Components/Home/Home";
import Main from "../Layout/Main";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                // element: <Register></Register>
            },
            {
                path: "/add-job",
                element: <PrivateRoute></PrivateRoute>
            },
            {
                path: "/job/:id",
                element: <PrivateRoute></PrivateRoute>,
                // loader: ({ params }) => fetch(`http://localhost:5000/services/${params.id}`)
            },
        ]
    },
]);
export default router;