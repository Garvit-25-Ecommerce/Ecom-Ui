import React from "react";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import NavBarUser from "../components/NavBarUser";



export default function LoginPage(){
    return(
        <div className="flex-wrapper">
        <NavBarUser/>
        
        <LoginForm/>
        <Footer/>
        </div>
    )
}