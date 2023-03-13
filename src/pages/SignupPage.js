import React from "react";
import Footer from "../components/Footer";
import NavBarUser from "../components/NavBarUser";
import RegisterForm from "../components/RegisterForm";

export default function SignupPage(){
    return(
        <div className="flex-wrapper">
        <NavBarUser/>
        <RegisterForm/>
        <Footer/>
        </div>
    )
}