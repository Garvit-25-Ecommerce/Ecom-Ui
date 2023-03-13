import axios from "axios";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import OrderDetails from "./OrderDetail";
import '../static/css/order.css'

export default function OrderItem(props){
    const {orderId} = props;
    const [data,setData] = useState({});
    const [values,setValues] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8100/orders/${orderId}`)
        .then(response=>{
            let responseData = response.data.data;
            getOrderDetails(responseData);
            setData(responseData);
        }).catch(err=>{
            console.log(err);
        })
    },[]);

    const getOrderDetails =(input)=>{
        let ans = [];
        for (const key in input.order){
            ans.push({
                productId:key,
                quantity:input.order[key].first
            })
        }
        setValues(ans);
    }

    return(
        <div className="card orderCard mb-5">
            {/* <h5 className="card-title">Order Details</h5> */}
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-1"></div>
                    <div className="col-2 d-flex justify-content-center">
                        <p><strong>Order Id: </strong>{data.id}</p>
                    </div>
                    <div className="col-2 d-flex justify-content-center">
                        <p><strong>Date: </strong>{data.timestamp}</p>
                    </div>
                    <div className="col-2 d-flex justify-content-center">
                        <p><strong>Item/s: </strong>{values.length}</p>
                    </div>
                    <div className="col-2 d-flex justify-content-center">
                        <p><strong>Total Price: </strong>₹ {data.totalPrice}</p>
                    </div>

                    <div className="col-2 d-flex justify-content-center">
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={"#"+orderId} aria-expanded="false" aria-controls={orderId}>Show Details<KeyboardArrowDownOutlinedIcon/></button>
                    </div>
                    <div className="col-1"></div>

                    <div class="collapse" id={orderId}>
                        <div className="container-fluid orderItemContainer">
                        {
                            values.map(item=>{
                                return <OrderDetails productId={item.productId} quantity={item.quantity}/>
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}