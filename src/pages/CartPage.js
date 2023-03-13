import React from "react";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import NavBarUser from "../components/NavBarUser";

export default function CartPage(){
    return (
        <div className="flex-wrapper">
        <NavBarUser/>
        <Cart userId={localStorage.getItem('id')}/>
        <Footer/>
        </div>
    );
}