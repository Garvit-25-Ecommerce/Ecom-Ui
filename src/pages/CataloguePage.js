import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Catalogue from "../components/Catlogue";
import Filters from "../components/Filters";
import Footer from "../components/Footer";
import NavBarUser from "../components/NavBarUser";
import '../static/css/catalogueItem.css'

export default function CataloguePage(){
    const {category} = useParams();
    const [extraCategory,setExtraCategory] = useState(category);
    const[refresh,setRefresh] = useState(true);

    const [min,setMin] = useState(0);
    const [max,setMax] = useState(1000000);
    const [sortBy,setSortBy] = useState("");

    const updateCategory=(cat)=>{
        setExtraCategory(cat);
    }

    return(
        <div className="flex-wrapper">
        <NavBarUser/>

        <div className="container-fluid catalogueContainer">
            <h1 className="shopHeading">Shop</h1>
            <div className="row">
                <div className="col-1"></div>
                <div className="col-2">
                    <Filters updateCategory={updateCategory} updateMin={setMin} updateMax={setMax} updateSortBy={setSortBy}/>
                </div>
                <div className="col-8">
                    <Catalogue category={extraCategory} min={min} max={max} sortBy={sortBy}/>
                </div>
            </div>
        </div>

        <Footer/>
        </div>

    )
}