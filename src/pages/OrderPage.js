import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavBarUser from "../components/NavBarUser";
import OrderItem from "../components/OrderItem";
import '../static/css/order.css'
import noOrders from '../static/images/noOrdersFound.jpg'

export default function OrderPage(){
    const [orderData,setOrderData] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get(`http://localhost:8100/orders/all/${localStorage.getItem('id')}`)
        .then(response=>{
            let data = response.data.data;
            setOrderData(data);
        }).catch(err=>{
            if(err.response!=undefined && err.response.data!=undefined){
                setOrderData([]);
            }else
                console.log(err);
                if(err.code=='ERR_NETWORK'){
                    navigate('/error',{replace:true});
                }
        })
    },[])

    return(
        <div className="flex-wrapper">
            <NavBarUser/>
            <div className="container-fluid d-flex justify-content-center mb-4 mt-4">
                <h1>Order History</h1>
            </div>
            <div className="container-fluid orderPageContainer mb-5">
                
                {
                orderData.length==0
                ?<div className="row align-items-center">
                    <div className=" col-12 d-flex justify-content-center">
                        <h1 className="text-center">Uh oh, You haven't placed any orders yet</h1>
                    </div>
                    <div className=" col-12 d-flex justify-content-center">
                        <img src={noOrders} className="w-25"></img>
                    </div>
                    
                </div>
                :orderData.map(order=>{
                    return  <OrderItem orderId = {order.id}/>
                })
                }
                
            </div>
            <Footer/>
        </div>
    )
}