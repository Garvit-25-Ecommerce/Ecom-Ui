import axios from "axios";
import React, { useEffect, useState } from "react";
import '../static/css/cart.css'
import CartItem from "./CartItem";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';
import { Link, useNavigate } from "react-router-dom";
import emptyCart from '../static/images/emptyCarte.jpg';
import { toast } from "react-toastify";

export default function Cart(props) {
    const { userId } = props;
    const [cartData, setCartData] = useState({});
    const [values,setValues] = useState([]);
    const [extra,setExtra] = useState([]);
    const [couponCode,setCouponCode] = useState("");
    const [discount,setDiscount] = useState(0);
    const [message,setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log(values);
        axios.get('http://localhost:8100/cart/' + userId)
            .then(response => {
                let data = response.data.data;
                console.log(data);
                setCartData(data);
                setValues(getCartItemDetails(data));
                console.log(values);
            }).catch(err => {
                console.log(err);
                if(err.code=='ERR_NETWORK'){
                    navigate('/error',{replace:true});
                }
            })
    }, [extra]);
   

    const getCartItemDetails = (input) => {
        const ans = [];
        for (const k in input.products) {
            ans.push({
                key: k,
                quantity: input.products[k].first
            })
        }
        console.log("ans",ans);
        return ans;
    }

    

    const handleClearCart = ()=>{
        axios.delete(`http://localhost:8100/cart/empty?userId=${localStorage.getItem('id')}`)
        .then()
        .catch(err=>{
            console.log(err);
        })

        setCartData({});
    }

    const updateValues = (productId,quan)=>{
        for(let i=0;i<values.length;++i){
            if(values[i].key==productId){
                values[i].quantity=quan;
                break;
            }
        }
        setExtra(values);
    }

    const deleteProduct = (productId)=>{
        for(let i=0;i<values.length;i++){
            if(values[i].key==productId){
                values.splice(i,1);
            }
        }

        setExtra(values);
    }

    const handleCheckout =()=>{
        axios.post(`http://localhost:8100/cart/checkout?userId=${userId}`,{
            userId : userId,
            products : cartData.products,
            totalPrice : cartData.totalPrice        
        }).then(response=>{
            navigate('/order',{replace:true});
        }).catch(err=>{
            console.log(err);
        });
    }

    const handleCouponCode = ()=>{
        if(couponCode.toLowerCase()=='discount20'){
            setDiscount(Math.ceil(cartData.totalPrice*0.2));
            document.getElementById("couponCodeValidity").style.color = "green";
            setMessage("Applied successfully");

        }else{
            setMessage("Coupon code invalid");
            document.getElementById("couponCodeValidity").style.color = "red";
        }
        setCouponCode("");
    }

    

    

    return (
        <>
        <div className="container-fluid outerContainer">
            <div className="row">
                <div className="col-9">
                    <div className="cartItemContainer">
                        <div className="row align-items-center">
                            <div className="col-12">
                                <div className="row align-items-center">
                                    <div className='col-10'>
                                        <h1>Shopping Cart</h1>
                                    </div>

                                    <div className="col-2 d-flex justify-content-center">
                                        <h5>{cartData.products === undefined ? 0 : Object.keys(cartData.products).length} Item/s</h5>
                                    </div>

                                </div>

                                <hr className="cardItemLine" />
{console.log("render",values)}
                                {cartData.products===undefined
                                ? <div className="row align-items-center">
                                    <div className="col-12 d-flex justify-content-center">
                                        <h3 className=" mb-3">Uh oh, no items in your cart yet</h3>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <img src={emptyCart} className="emptyCartImage"></img>
                                    </div>
                                </div>
                                : values.map(item => {
                                    {console.log("andar",item.key)}
                                    return <CartItem userId={cartData.userId} productId={item.key} q={item.quantity} updateValues={updateValues} deleteProduct={deleteProduct}/>
                                })}
                                {
                                    
                                }
                                <div className="row align-items-center mt-4">
                                    <div className="col-10 justify-content-start">
                                        <Link to="/products/all"><span><ArrowBackIcon /> Back to shop</span></Link>
                                    </div>

                                    <div className="col-2 d-flex justify-content-center">
                                        {cartData.products===undefined
                                        ?<button className="btn btn-primary emptyCart disabled" type="button" onClick={handleClearCart}>Clear Cart <DeleteIcon className="mb-1"/></button>
                                        :<button className="btn btn-primary emptyCart " type="button" onClick={handleClearCart}>Clear Cart <DeleteIcon className="mb-1"/></button>
                                        }
                                        
                                    </div>

                                </div>


                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-3">
                    <div className="summaryContainer">
                        <div className="row align-items-center">
                            <div className="col-12 justify-content-start">
                                <h1>Summary</h1>
                            </div>
                        </div>
                        <hr className="carditemLine" />
                        <div className="row align-items-center">
                            <div className="col-7 d-flex justify-content-start">
                                <h5>ITEMS: {cartData.products === undefined ? 0 : Object.keys(cartData.products).length} </h5>
                            </div>
                            <div className="col-5">
                                <h5>₹ {cartData.products===undefined?0: cartData.totalPrice}</h5>
                            </div>
                        </div>

                        <br />
                        <div className="row align-items-center">
                            <div className="col-12 d-flex justify-content-start">
                                <h5>Have a code?</h5>
                            </div> 
                            <p style={{paddingLeft:"18px"}} id="couponCodeValidity">{message}</p>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-8 d-flex">
                                <input type='text' placeholder="Enter your code" className="form-control form-control-lg codeInput" value={couponCode} onChange={(e)=>{setCouponCode(e.target.value)}}></input>
                            </div>
                            <div className="col-3 d-flex justify-content-center">
                                <button type="button" className="btn btn-primary applyButton " onClick={handleCouponCode}>Apply</button>
                            </div>
                        </div>
                        <hr className="cardItemLine" />
                        
                        <div className="row align-items-center" id='toCopy'>
                            <div className="col-7 justify-content-start"><h5>Discount</h5></div>
                            <div className="col-5 justify-content-start"><h5>₹ {discount}</h5></div>
                        </div>
                        <div className="row align-items-center" id='toCopy'>
                            <div className="col-7 justify-content-start"><h5>Total Price</h5></div>
                            <div className="col-5 justify-content-start"><h5>₹ {cartData.products===undefined?0:cartData.totalPrice-discount}</h5></div>
                        </div>
                        <div className="row align-items-center" id="couponCodeContainer">
                            <div className="col-12 d-flex justify-content-start">
                            {cartData.products===undefined
                            ?<button type="submit" className="btn btn-primary disabled checkoutButton">Checkout</button>
                            :<>
                            <button type="button" className="btn btn-primary checkoutButton" data-bs-toggle="modal" data-bs-target="#checkoutModal">Checkout <PaymentIcon className="mb-1"/></button>
                            
                            </>
                        }
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            
        </div>

        <div className="modal fade" tabIndex="-1" id="checkoutModal" aria-labelledby="checkoutModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered align-items-center justify-content-center">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id = "checkoutModalLabel">Checkout</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                    <h5>Do you want to checkout?</h5>
                    <h5>This action will clear cart and place the order!</h5>
                    </div>

                    <div className="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleCheckout}>Proceed <PaymentIcon className="mb-1"/></button>
                    </div>
                </div>
            </div>
        </div>
        </>

    );
}