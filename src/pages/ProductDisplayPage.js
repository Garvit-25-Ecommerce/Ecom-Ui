import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import NavBarUser from "../components/NavBarUser";
import ProductDisplay from "../components/ProductDisplay";

export default function ProductDisplayPage(props){
    const {productId} = useParams();
    return(
        <div className="flex-wrapper">
        <NavBarUser/>
        <ProductDisplay productId={productId}/>
        <Footer/>
        </div>
    )
}