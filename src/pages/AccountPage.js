import React from "react";
import Account from "../components/Account";
import Footer from "../components/Footer";
import NavBarUser from "../components/NavBarUser";

export default function AccountPage(){
    return(
        <div className="flex-wrapper">
        <NavBarUser/>
        <Account/>
        <Footer/>
        </div>
    )
}