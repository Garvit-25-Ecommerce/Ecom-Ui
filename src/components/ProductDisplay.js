import axios from "axios";
import React, { useEffect, useState } from "react";
import '../static/css/productDisplay.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReplayIcon from '@mui/icons-material/Replay';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { Link, useNavigate, useParams } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import noReview from '../static/images/noReview.jpg'

export default function ProductDisplay(props){
    const {productId} = useParams();
    const [productData,setProductData] = useState({});
    const [review,setReview] = useState("");
    const navigate = useNavigate();


    useEffect(()=>{
        axios.get('http://localhost:8090/product/byId/'+productId)
        .then(response=>{
            let data = response.data.data;
            setProductData(data);
        }).catch(err=>{
            console.log(err);
            if(err.code=='ERR_NETWORK'){
                navigate('/error',{replace:true});
            }else{
                navigate('*',{replace:true})
            }
           
        })
    },[review])

    const getProductFeatures = ()=>{
        const values=[];
        for(const k in productData.features){
            values.push({
                key:k,
                value:productData.features[k]
            })
        }
        return values;
    };

    const addToCart = ()=>{
        if(localStorage.length!=0){
            axios.post(`http://localhost:8100/cart/add?userId=${localStorage.getItem('id')}&productId=${productId}`)
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
            })
        }else{
            navigate('/login',{replace:true});
        }
    }

    const addReview =()=>{
        if(localStorage.length!=0){
            axios.post(`http://localhost:8090/product/addReview?productId=${productId}`,
            {
                review : review
            }).then(res=>{
                console.log(res);
                setReview("");
            }).catch(err=>{
                console.log(err);
            });
        }else{
            toast.info("Please login to add a review");
        }
    }

    // console.log(productData);


    return(
        <div className="container-fluid gridContainer">
            <div className="row">
                
                <div className="col-5 d-flex justify-content-center">
                    <div className="container-fluid imageContainer">
                        <div className="row mb-3 align-items-center">
                            <div className="col-12 d-flex justify-content-center productDisplayImageContainer">
                                <img className="displayImage" src={productData.imageUrl}></img>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="col-7 d-flex justify-content-center">
                    <div className="container detailsContainer">
                        <div className="row mb-2 align-items-center">
                            <h3>{productData.brand} {productData.name}</h3>
                            <h6>{productData.category}</h6>
                        </div>

                        <div className="row mb-3 align-items-center">
                            <h3>₹ {productData.price}</h3>
                        </div>

                        <div className="row mb-3 align-items-center">
                            <div className="col-6 d-flex justify-content-start">
                                <button type="button" className="btn btn-primary " onClick={addToCart}>Add to Cart <AddShoppingCartIcon/></button>
                                <button type="button" className="btn btn-primary mx-4"> <Link to="/products/all">Back to shop</Link> <ShoppingBagIcon/></button>
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-3 d-flex justify-content-start mx-3">
                                <span><LocalShippingIcon/>Faster Deliveries</span>
                            </div>
                            <div className="col-3 d-flex justify-content-start">
                                <ReplayIcon/>15 Day Return Policy
                            </div>
                            <div className="col-5 d-flex justify-content-start">
                                <SentimentSatisfiedAltIcon/>Customer Satisfaction Guarunteed
                            </div>
                        </div>
                        <div className="row mb-3  align-items-center">
                            <div className="col-12 d-flex justify-content-center">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Feature</th>
                                            <th scope="col">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getProductFeatures().map(product=>{
                                                return <tr>
                                                    <td>{product.key}</td>
                                                    <td>{product.value}</td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row mb-3 align">
                            <div className="col-9">
                                <input type="text" className="form form-control" value={review} placeholder="Write a review..." onChange={(e)=>{setReview(e.target.value);}} required/>
                            </div>

                            <div className="col-3 d-flex justify-content-start">
                                <button type="submit" className="btn btn-primary" onClick={addReview}>Submit</button>
                            </div>
                            
                            
                        </div>
                        <div className="row mb-3 align">
                            <div className="reviewsContainer">
                                <h4>Customer Reviews</h4>
                                
                                {
                                    productData.reviews==undefined || productData.reviews==null
                                    ?<div className="row align-items-center">
                                        <div className="col-12 d-flex justify-content-center">
                                            <h6>No reviews for this product yet</h6>
                                        </div>
                                    <div className="col-12 d-flex justify-content-center">
                                        <img src={noReview} className="noReviewImage"/>
                                    </div>
                                    </div>
                                    :productData?.reviews?.map(review=>{
                                        return <div className="col-12 d-block justify-content-start">
                                            <div className="card mb-3">
                                                <div className="card-body">
                                                    <h5 className="card-title">Verified User</h5>
                                                    <p className="card-text">{review}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    }) 
                                }
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}