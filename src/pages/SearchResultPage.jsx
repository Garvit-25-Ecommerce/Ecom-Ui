import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CatalogueItem from "../components/CatalogueItem";
import Footer from "../components/Footer";
import NavBarUser from "../components/NavBarUser";
import noSearchResults from '../static/images/noSearchResults.jpg'
import '../static/css/search.css'

export default function SearchResultPage(){
    const {searchQuery} = useParams();
    const [data,setData] = useState([]);
    const [filteredData,setFilteredData] = useState([]);

    const getData = async ()=>{
        await axios.get(`http://localhost:8090/product/all`)
        .then(response=>{
            setData(response.data.data);
            setFilteredData(filterData(response.data.data));
            //console.log(searchQuery);
        }).catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>getData,[]);

    const filterData = (input)=>{
        return input.filter(item=>item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }
   

    return (
        <>
        <div className="flex-wrapper">
        <NavBarUser/>

        <div className="container-fluid searchResultsContainer">
            <div className="row align-items-center">
                <div className="col-12 d-flex justify-content-center mb-4">
                    <h1>{filteredData.length} result/s found for the search query "{searchQuery}"</h1>
                </div>
            </div>
            <div className="row align-items-center">
                {
                    filteredData.length==0
                    ?<div className="d-flex justify-content-center"><img src={noSearchResults} className="searchImage"></img></div>
                    :filteredData.map(item=>{
                        return <div className="col-3 d-flex justify-content-center">
                        <CatalogueItem product={item}/>
                        </div>
                    })
                }
            </div>
        </div>

        <Footer/>
        </div>
        </>

    )
}
