import axios from "axios";
import React, { useEffect, useState } from "react";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReplayIcon from '@mui/icons-material/Replay';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { Link, useNavigate } from "react-router-dom";
import noReview from '../static/images/noReview.jpg'

export default function AdminViewProduct(props){
    
    const {id} = props;
    const [productData,setProductData] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8090/product/byId/${id}`)
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
    },[]);

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
                            <div className="col-3 d-flex justify-content-start mx-3">
                                <Link to = "/admin?type=products" type="button" className="btn btn-primary">Back to Products List</Link>
                            </div>
                        </div>
                        <div className="row mb-3 align-items-center">
                            <div className="col-2 d-flex justify-content-start">
                                <span><LocalShippingIcon/>Faster Deliveries</span>
                            </div>
                            <div className="col-3 d-flex justify-content-center">
                                <ReplayIcon/>15 Day Return Policy
                            </div>
                            <div className="col-4 d-flex justify-content-start">
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
        
    )
}