import React from "react";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import HomePageComponent from "../components/HomePageComponent";
import NavBarUser from "../components/NavBarUser";

export default function HomePage(){
    return(
        <div className="flex-wrapper">
        <NavBarUser/>
        <Carousel/>
        <HomePageComponent/>
        <Footer/>
        </div>
    );
}