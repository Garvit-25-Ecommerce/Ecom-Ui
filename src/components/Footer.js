import React from "react";
import '../static/css/footer.css'
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import CopyrightRoundedIcon from '@mui/icons-material/CopyrightRounded';
import { Link } from "react-router-dom";
import logo from '../static/images/logo-no-background.png'

export default function Footer(){
    return(
        <footer className="text-center text-lg-start text-white myFooter">
            <div className="container p-4 pb-0 contentContainer">
                <section >
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-1">
                            <h6 className="text-uppercase mb-4 font-weight-bold"><img src={logo}></img></h6>
                            <p>A one-stop shop for all of your electronic needs.</p>
                        </div>
                        <hr className="w-100 clearfix d-md-none"></hr>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-1">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Quick Links</h6>
                            <p>
                                <Link className="text-white" to='/'>Home</Link>
                            </p>
                            <p>
                                <Link className="text-white" to="/account">My Account</Link>
                            </p>
                            <p>
                                <Link className="text-white" to="/cart">Cart</Link>
                            </p>
                            <p>
                                <Link className="text-white" to="/order">Orders</Link>
                            </p>
                        </div>
                        <hr className="w-100 clearfix d-md-none"></hr>
                        

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-1">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Contact Us</h6>
                            <p><HomeIcon/> Bengaluru, 560103, India</p>
                            <p><EmailIcon/> gnangia@fastenal.com</p>
                            <p><PhoneIcon/> +91-8607169054</p>
                        </div>

                        <div className="col-md-3 col-lg-2 col-xl-2 mt-1">
                            <h6 className="text-uppercase mb-4 font-weight-bold follow">Follow us</h6>
                            <a className="btn btn-primary btn-floating m-1 button" href="#"><FacebookRoundedIcon/></a>
                            <a className="btn btn-primary btn-floating m-1 button" href="#"><TwitterIcon/></a>
                            <a className="btn btn-primary btn-floating m-1 button" href="#"><GoogleIcon/></a>
                            <a className="btn btn-primary btn-floating m-1 button" href="#"><InstagramIcon/></a>
                            <a className="btn btn-primary btn-floating m-1 button" href="#"><LinkedInIcon/></a>
                            <a className="btn btn-primary btn-floating m-1 button" href="#"><GitHubIcon/></a>
                        </div>

                    </div>
                </section>
            </div>
            <div className="text-center copyright">
                <CopyrightRoundedIcon/> 2023 Copyright: Garvit Nangia
            </div>
        </footer>
    );
}