import React, { useState } from "react";
import '../static/css/form.css'
import newProductImage from '../static/images/newProductImage.jpg'
import EditIcon from '@mui/icons-material/Edit';
import CategoryIcon from '@mui/icons-material/Category';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import HttpIcon from '@mui/icons-material/Http';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function AddProductForm(){
    
    const [buttonClicked,setButtonClicked] = useState(0);
    const [name,setName] = useState("");
    const [category,setCategory] = useState("");
    const [brand,setBrand] = useState("");
    const [price,setPrice] = useState("");
    const [imageUrl,setImageUrl] = useState("");
    const [warrantyPeriod,setWarrantyPeriod] = useState("");
    const [features,setFeatures] = useState([]);
    const [description,setDescription] = useState([]);
    const navigate = useNavigate();

    const addFeature =(e)=>{
        e.preventDefault();
        
        setButtonClicked(()=>{
            return buttonClicked+1;
        });
        features.push("");
        description.push("");

        var div = document.createElement('div');
        div.setAttribute('id',`${buttonClicked}newFeature`);
        div.setAttribute('class','d-flex mb-3');

        var input1 = document.createElement('input');
        input1.setAttribute('class','form-control mx-2');
        input1.setAttribute('value',features[buttonClicked]);
        input1.setAttribute('placeholder','feature');
        input1.setAttribute('type','text');
        input1.setAttribute('required','true');
        input1.addEventListener('change',(e)=>{
            features[buttonClicked]=e.target.value;
            setFeatures(features);
        });

        var input2 = document.createElement('input');
        input2.setAttribute('class','form-control mx-2');
        input2.setAttribute('value',description[buttonClicked]);
        input2.setAttribute('placeholder','description');
        input2.setAttribute('type','text');
        input2.setAttribute('required','true');
        input2.addEventListener('change',
        (e)=>{
            description[buttonClicked] = e.target.value;
            setDescription(description);
        });


        document.getElementById('additionalFeatures').insertBefore(div,this);
        document.getElementById(`${buttonClicked}newFeature`).insertBefore(input1,this);
        document.getElementById(`${buttonClicked}newFeature`).insertBefore(input2,this);
    }

    const handleSubmit = ()=>{
        let obj = {};
        for(let i=0;i<features.length;i++){
            obj[features[i]]=description[i];
        }

        obj['warranty period'] = warrantyPeriod;

        axios.post(`http://localhost:8090/product/add?isAdmin=true`,{
            brand:brand,
            name:name,
            price:price,
            category:category,
            imageUrl:imageUrl,
            features:obj
        }).then(()=>{
           
            navigate(0);
            toast.success("Product Added Successfully");
            
            
        }).catch(err=>{
            toast.error("Cannot add product");
        });
    }
   
    return (
        <div className="container-fluid mt-5 mb-5">
            <div className="row align-items-center">
                <div className="col-1"></div>
                <div className="col-10 d-flex justify-content-center">
                    <div className="container-fluid formContainer">
                        <div className="row">
                            
                            <div className="col-6 d-flex justify-content-center">
                                <img src={newProductImage} className="w-100"/>
                            </div>
                            
                            <div className="col-6 justify-content-center">
                                <div className="card formCard">
                                    <h1 className="card-title d-flex justify-content-center mb-4">Add Product</h1>
                                    <div className="card-body">
                                        <form id='addProductForm'>
                                            <div className="mb-3" id='toCopy'>
                                                <label for ="brand" className="form-label">Brand</label>
                                                <div className="inputGroup">
                                                    <EditIcon className="emailIcon"/>
                                                    <input type="text" className="form-control"  placeholder="Brand Name"  required value={brand} onChange={(e)=>{setBrand(e.target.value);}}></input>
                                                </div>  
                                            </div>

                                            <div className="mb-3">
                                                <label for ="name" className="form-label">Product Name</label>
                                                <div className="inputGroup">
                                                    <EditIcon className="emailIcon"/>
                                                    <input type="text" className="form-control"  placeholder="Product abc" required value={name} onChange={(e)=>{setName(e.target.value);}}></input>
                                                </div>  
                                            </div>

                                            <div className="mb-3">
                                                <label for ="category" className="form-label">Category</label>
                                                <div className="inputGroup">
                                                    <CategoryIcon className="emailIcon"/>
                                                    <select className="form-select" aria-label="category select" onChange={(e)=>{setCategory(e.target.value);}}>
                                                        <option selected disabled>Select a category</option>
                                                        <option value="Laptops">Laptops</option>
                                                        <option value="Smartphones">Smartphones</option>
                                                        <option value="Televisions">Televisions</option>
                                                        <option value="Video Games">Video Games</option>
                                                        <option value="Cameras">Cameras</option>
                                                        <option value="Wearables">Wearables</option>
                                                    </select>
                                                </div>  
                                            </div>

                                            <div className="mb-3">
                                                <label for ="price" className="form-label">Price</label>
                                                <div className="inputGroup">
                                                    <CurrencyRupeeIcon className="emailIcon"/>
                                                    <input type="number" className="form-control"  placeholder="10xxx" min='1' required value={price} onChange={(e)=>{setPrice(e.target.value);}}></input>
                                                </div>  
                                            </div>

                                            <div className="mb-3">
                                                <label for ="image" className="form-label">Image URL</label>
                                                <div className="inputGroup">
                                                    <HttpIcon className="emailIcon"/>
                                                    <input type="url" className="form-control"  placeholder="www.image.com" required value={imageUrl} onChange={(e)=>{setImageUrl(e.target.value);}}></input>
                                                </div>  
                                            </div>

                                            <div className="mb-3" >
                                                <label for ="warranty" className="form-label">Warranty Period</label>
                                                <div className="inputGroup">
                                                    <AccessTimeIcon className="emailIcon"/>
                                                    <input type="number" className="form-control"  placeholder="In years" min='0' required value={warrantyPeriod} onChange={(e)=>{setWarrantyPeriod(e.target.value);}}></input>
                                                    
                                                </div>
                                                <button type="button" className="btn btn-primary mt-3" onClick={addFeature}>Add feature</button>  
                                                <button type = "button" className="btn btn-primary mt-3 mx-3" onClick={handleSubmit} >Submit</button>
                                                
                                            </div>
                                            <div id='additionalFeatures'>

                                            </div>

                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    );
}