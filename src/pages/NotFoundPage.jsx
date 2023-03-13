import React from "react";
import { Link } from "react-router-dom";
import notFound from '../static/images/notFound.jpg'
import '../static/css/search.css'
import NavBarUser from "../components/NavBarUser";
import Footer from "../components/Footer";

export default function NotFoundPage(){
    return(
        <>
        <NavBarUser/>
        <div className="container-fluid notFoundContainer">
            <div className="row align-items-center">
                <div className="col-12 d-flex justify-content-center">
                    <h1>Page Not Found</h1>
                </div>
                <div className="col-12 d-flex justify-content-center">
                    <img src={notFound} className="notFoundImage"/>
                </div>
                <div className="col-12 d-flex justify-content-center">
                    <h5 className="mx-2">Back to </h5><Link to='/'><h5>Home?</h5></Link>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}