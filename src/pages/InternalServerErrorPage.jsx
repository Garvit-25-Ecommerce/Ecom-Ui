import React from "react";
import { Link } from "react-router-dom";
import internalServerError from '../static/images/internalServerError.jpg'
import '../static/css/search.css'
import NavBarUser from "../components/NavBarUser";
import Footer from "../components/Footer";

export default function InternalServerErrorPage(){
    return(
        <>
        <NavBarUser/>
        <div className="container-fluid notFoundContainer">
            <div className="row align-items-center">
                <div className="col-12 d-flex justify-content-center">
                    <h1>It's Not You It's Us :/</h1>
                </div>
                <div className="col-12 d-flex justify-content-center">
                    <img src={internalServerError} className="notFoundImage"/>
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