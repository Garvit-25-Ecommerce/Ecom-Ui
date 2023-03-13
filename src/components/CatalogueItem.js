import React, { useEffect, useState } from "react";
import "../static/css/catalogueItem.css"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CatalogueItem(props){
    const {product} = props;
    const isLoggedIn = localStorage.length==0?false:true;
    const navigate = useNavigate();
    const location = useLocation();

    const addToCart = ()=>{
        if(isLoggedIn===true){
            axios.post(`http://localhost:8100/cart/add?userId=${localStorage.getItem('id')}&productId=${product.id}`)
            .then(response=>{
                console.log(response);
                if(response.data.status===true){
                    toast.success("Product added to cart");
                }else{
                    toast.error("Cannot add product to cart");
                }
            }).catch(err=>{
                console.log(err);
                if(err.code=='ERR_NETWORK'){
                    navigate('/error',{replace:true});
                }
            });
        }else{
            navigate('/login',{replace:true});
        }
        
    }
    return(
        
            <div className="card catalogueCard">
                <div>
                    <h5 className="card-title cardTitle">{product.brand}</h5>
                </div>

                <img className={`cardImage ${location.pathname !== '/' && 'cardImageHover'}`} src={product.imageUrl}/>

                <div className="card-body">
                    <div className="product-details">
                        
                    <span><Link to={`/product/${product.id}`} className="product-details-anchor">{product.name}</Link></span>
                    </div>

                    <div className="cardFooter">
                    <p className="price">₹{product.price}</p>
                    <button className="btn btn-primary cart-button" onClick={addToCart}>Add to Cart <AddShoppingCartIcon/></button>
                    </div>
                </div>
            </div>
        
    );
} 