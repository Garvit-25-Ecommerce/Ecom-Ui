import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../static/css/order.css'
import noProduct from '../static/images/noProductInOrder.jpg'

export default function OrderDetails(props){
    const {productId,quantity} = props;
    const [productData,setProductData] = useState({});
    
    useEffect(()=>{
        axios.get(`http://localhost:8090/product/byId/${productId}`)
        .then(response=>{
            let data = response.data.data;
            setProductData(data);
        }).catch(err=>{
            console.log(err);
        })
    },[]);

    return(
        <div className="card mb-3 mt-3 orderDetailCard">

            <div className="card-body">
                {
                    productData.name==undefined
                    ?<div className="row align-items-center">
                        <div className="col-1"></div>
                        <div className="col-5 d-flex justify-content-start">
                            <h4>Uh-oh something went wrong on our end</h4>
                        </div>
                        <div className="col-5 d-flex justify-content-center">
                            <img src={noProduct} className="errorImage"/>
                        </div>
                        <div className="col-1"></div>
                    </div>
                    :<div className="row align-items-center">
                        <div className="col-1"></div>
                        <div className="col-2">
                            <img className="img-fluid" src={productData.imageUrl}></img>
                        </div>
                        <div className="col-2 text-center d-flex justify-content-center">
                            <Link to={`/product/${productId}`}><h5>{productData.brand+" "+productData.name}</h5></Link>
                        </div>

                        <div className="col-2 text-center d-flex justify-content-center">
                            <h5>Category: {productData.category}</h5>
                        </div>
                        <div className="col-2 text-center d-flex justify-content-center">
                            <h5>Quantity: {quantity}</h5>
                        </div>
                        <div className="col-2 text-center d-flex justify-content-center">
                            <h5>₹ {productData.price}</h5>
                        </div>
                        
                    </div>
                
                }
                
            </div>
        </div>
    )
}