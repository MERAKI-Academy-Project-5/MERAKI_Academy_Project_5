import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main"
import Home from "../Home"
import About from "../About"
import Favourite from "../Favourite";
import Courses from "../Courses";
export const router = createBrowserRouter([
    {
        path:"/",
        element:<Main/>,
        children:[{
            path:"",
            element:<Home/>
        },
    {
        path:"about",
        element:<About/>
    },
{
    path:"favourite",
    element:<Favourite/>
},
{
    path:"courses",
    element:<Courses/>
},
{
    
}]
    }
])