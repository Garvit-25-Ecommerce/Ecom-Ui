import axios from "axios";
import React, { useEffect, useState } from "react";
import CatalogueItem from "./CatalogueItem";
import '../static/css/catalogueItem.css'
import { toast } from "react-toastify";
import nothingToShow from '../static/images/nothingToShow.jpg'

export default function  Catalogue(props){
    const {category,min,max,sortBy} = props;
    const [data,setData] = useState([]);

    const customSort=(parameter,input)=>{
        let data;
        if(parameter=="name descending"){
            input.sort((a,b)=>{
                if(a.name.toLowerCase()<b.name.toLowerCase()){
                    return 1;
                }else if(a.name.toLowerCase()>b.name.toLowerCase()){
                    return -1;
                }else{
                    return 0;
                }
            })
        }else if(parameter=="name ascending"){
            input.sort((a,b)=>{
                if(a.name.toLowerCase()>b.name.toLowerCase()){
                    return 1;
                }else if(a.name.toLowerCase()<b.name.toLowerCase()){
                    return -1;
                }else{
                    return 0;
                }
            })
        }else if(parameter=="price descending"){
            input.sort((a,b)=>{
                if(a.price<b.price){
                    return 1;
                }else if(a.price>b.price){
                    return -1;
                }else{
                    return 0;
                }
            })
        }else if(parameter=="price ascending"){
            input.sort((a,b)=>{
                if(a.price>b.price){
                    return 1;
                }else if(a.price<b.price){
                    return -1;
                }else{
                    return 0;
                }
            })
        }
        
    };

    const filterByPrice =(minimum,maximum,input)=>{
        return input.filter((element)=>{
            return element.price<=maximum && element.price>=minimum;
        })
    }

    useEffect(()=>{

        if(category=='all'){
            axios.get('http://localhost:8090/product/all')
            .then(response=>{
                let data = response.data.data;
                data=filterByPrice(min,max,data);
                console.log(data);
                customSort(sortBy,data);
                setData(data);
            })
            .catch(err=>{
                console.log(err);
            });
        }else{
            axios.get(`http://localhost:8090/product/byCategory?category=${category}`)
        .then(response=>{
            let data = response.data.data;
            console.log(data);
            data=filterByPrice(min,max,data);
            customSort(sortBy,data);
            setData(data);
        })
        .catch(err=>{
            if(err.response.status=='404'){
                setData([]);
            }
            console.log(err);
        })
        }
        
    },[category,min,max,sortBy])
    return(

        <>
            <div className="row g3">
            {data.length==0
            ?<div className="d-flex justify-content-center uhOhContainer">
                
                <img src={nothingToShow} className="uhOhImage"></img>
                

                <h1>Uh oh, No products to show!</h1>
                
                
                
            </div>
            :data.map(product=>{
                return <div className="col-4 d-flex justify-content-center"><CatalogueItem key = {product.id} product={product}/></div>
            })}
            </div>
        </>

    );
}