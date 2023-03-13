import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAdmin = ()=>{
    const isLoggedIn = localStorage.length==0?false:true;
    const isAdmin = localStorage.getItem('admin')=='false' || localStorage.getItem('admin')==undefined ? false:true;
    const location = useLocation();

    return(
        isLoggedIn && isAdmin
        ?<Outlet/>
        :<Navigate to='/login' state={{from:location}} replace/>
    );
}

export default RequireAdmin;