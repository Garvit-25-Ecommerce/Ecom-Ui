import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import '../static/css/cart.css'
import { Link } from "react-router-dom";

export default function CartItem(props){
    const {userId,productId, q, updateValues,deleteProduct} = props;
    const [productData,setProductData] = useState({});
    const [currentQuantity,setCurrentQuantity] = useState(q);
    const [extra,setExtra] = useState('');

    useEffect(()=>{
        console.log("item mei",productId);
        axios.get('http://localhost:8090/product/byId/'+productId)
        .then(response=>{
            let data = response.data.data;
            console.log("item data",data);
            setProductData(data);
        }).catch(err=>{
            console.log("error occurred: ",err);
        })
    },[extra]);


    function handleMinus() {

        if(currentQuantity>1){
            setCurrentQuantity(()=>{
                return currentQuantity-1;
            });

            axios.delete(`http://localhost:8100/cart/delete?userId=${userId}&productId=${productId}`)
            .then(response=>{
                updateValues(productId,currentQuantity);
            }).catch(err=>{ 
                console.log(err);
            });
        }
    }

    function handlePlus(){
        if(currentQuantity<10){
            setCurrentQuantity(()=>{
                return currentQuantity+1;
            });
    
            axios.post(`http://localhost:8100/cart/add?userId=${userId}&productId=${productId}`).
            then(response=>{
                updateValues(productId,currentQuantity);
            }).catch(err=>{ 
                console.log(err);
            })
        }
    }

    function handleQuantity(e){
        if(e.target.value>=1 && e.target.value<=10){
            setCurrentQuantity(e.target.value);
            axios.patch(`http://localhost:8100/cart/update?userId=${userId}&productId=${productId}`,
            {quantity: currentQuantity})
            .then(response=>{
                updateValues(productId,currentQuantity);
            }).catch(err=>{
                console.log(err);
            })
        }
        

        
    }

    const handleDelete=async ()=>{
        
        await axios.patch(`http://localhost:8100/cart/update?userId=${userId}&productId=${productId}`,
        {quantity:0})
        .then(response=>{
            deleteProduct(productId);
            setExtra(productId);
        })
        .catch(err=>{ 
            console.log(err);
        })

       // window.location.reload();
       
    }

    return (
        <>
        <div className="row align-items-center" >
            <div className="col-md-2 d-flex justify-content-center">
                <img src={productData.imageUrl} className='cartItemImage'></img>
            </div>

            <div className="col-4">
                <h6>{productData.category}</h6>
                <Link to={`/product/${productId}`}><h5>{productData.brand} {productData.name}</h5></Link>
            </div>

            <div className="col-2">
                <div className="row">
                    <div className="col-2 d-flex justify-content-center">
                        <button type="button" onClick={handlePlus} className='editButton'><AddIcon/></button>
                    </div>

                    <div className="col-7 d-flex justify-content-center">
                        <input type='number' value={currentQuantity} min = '1' max='10' className="form-control form-control-lg" onChange={handleQuantity}></input>
                    </div>

                    <div className="col-2 d-flex justify-content-center">
                    <button type="button" onClick={handleMinus} className='editButton btn-sm'><RemoveIcon/></button>
                    </div>
                </div>
            </div>

            <div className="col-2 d-flex justify-content-center">
                <h3>₹{productData.price}</h3>
            </div>

            <div className="col-2 d-flex justify-content-center">
                <button type='button' onClick={handleDelete} className='deleteButton'><DeleteIcon/></button>
            </div>

        </div>

        <hr class='cartItemLine'/>
        </>
    );
}