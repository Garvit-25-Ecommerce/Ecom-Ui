import axios from "axios";
import React, { useEffect, useState } from "react";
import '../static/css/homePageComponent.css'
import CatalogueItem from "./CatalogueItem";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Link } from "react-router-dom";
import noProduct from '../static/images/noProduct.jpg'

export default function HomePageComponent(){
    const  [featuredProduct,setFeaturedProduct] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:8090/product/featuredProducts')
        .then(response=>{
            let data = response.data.data;
            setFeaturedProduct(data);
        }).catch(err=>{
            console.log(err);
        })
    },[]);

    return(
        <>
        
        <div className="container-fluid homePageContainer">
            <div className="row mb-3 align-items-center">
                <h3>Shop by category</h3>
            </div>
            <div className="row mb-3 align-items-center">
                <div className="col-2 d-flex justify-content-center">
                    <Link to="/products/Laptops"><img src="https://i5.walmartimages.com/dfw/4ff9c6c9-300c/k2-_ed487013-2869-4183-9b1a-39fb82e07501.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF"></img></Link>
                </div>

                <div className="col-2 d-flex justify-content-center">
                    <Link to="/products/Televisions"><img src="https://i5.walmartimages.com/dfw/4ff9c6c9-d372/k2-_06b5f526-343a-4eac-8ce9-5870fbf46cb6.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF"></img></Link>
                    
                </div>

                <div className="col-2 d-flex justify-content-center">
                    <Link to="/products/Smartphones"><img src="https://i5.walmartimages.com/dfw/4ff9c6c9-204c/k2-_7957b599-db05-404b-b1ce-221d5f115133.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF"></img></Link>
                    
                </div>

                <div className="col-2 d-flex justify-content-center">
                    <Link to="/products/Video Games"><img src="https://i5.walmartimages.com/dfw/4ff9c6c9-4189/k2-_63c67a27-5b07-4b86-bd12-07575b3d1247.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF"></img></Link>
                    
                </div>

                <div className="col-2 d-flex justify-content-center">
                    <Link to="/products/Cameras"><img src="https://i5.walmartimages.com/dfw/4ff9c6c9-9065/k2-_adb96eb5-dce4-46e9-8644-80690169d2fe.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF"></img></Link>
                    
                </div>

                <div className="col-2 d-flex justify-content-center">
                    <Link to="/products/Wearables"><img src="https://i5.walmartimages.com/dfw/4ff9c6c9-b1f2/k2-_ac0b2975-60e9-4de3-afc7-f26ab3a44dbc.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF"></img></Link>
                    
                </div>
            </div>

            <div className="row mb-3 align-items-center">
                <div className="col-2 d-flex justify-content-center">
                    <Link to={`/products/Laptops`}>Laptops</Link>
                </div>

                <div className="col-2 d-flex justify-content-center">
                    <Link to="/products/Televisions">Televisions</Link>
                </div>

                <div className="col-2 d-flex justify-content-center">
                    <Link to="/products/Smartphones">Smartphones</Link>
                </div>

                <div className="col-2 d-flex justify-content-center">
                    <Link to="/products/Video Games">Video Games</Link>
                </div>

                <div className="col-2 d-flex justify-content-center">
                    <Link to="/products/Cameras">Cameras</Link>
                </div>

                <div className="col-2 d-flex justify-content-center">
                    <Link to="/products/Wearables">Wearables</Link>
                </div>
            </div>
        </div>

        <div className={`container-fluid featuredProductsContainer`}>
            <div className="row mb-3 align-items-center">
                <div className="col-1"></div>
                <div className="col-5">
                    <h3>Featured products</h3>
                </div>
                
            </div>

            <div className={`row mb-3 align-items-center  ${featuredProduct.length==0 && 'errorFeature'}`}>
                <div className="col-1"></div>
                
                {
                    featuredProduct.length == 0
                    ?<div className="col-10 d-flex align-items-center errorFeature">
                    
                        <div className="col-6 d-flex justify-content-end">
                            <h3>Uh-oh Something went wrong on our end</h3>
                        </div>
                        <div className="col-6 d-flex justify-content-center">
                            <img src={noProduct} className="w-50"/>
                        </div>
                    </div>
                        
                    
                    
                    :featuredProduct.map(product=>{
                        return <div className="col-2 d-flex justify-content-center"><CatalogueItem key = {product.id} product={product}/>  </div>
                            
                    })
                }
                <div className="col-1"></div>
                
            </div>
            <div className="row mb-3 align-items-center">
                <div className="col-9"></div>
                <div className="col-2 d-flex justify-content-end">
                    <Link to='/products/all'><button className="btn btn-primary ">All Products <ShoppingBagOutlinedIcon className="mb-1"/></button></Link>
                </div>
            </div>

            
        </div>
        
        <div className="container-fluid siteDescriptionContainer">
            <div className="row mb-3 align-items-baseline">
                <div className="col-3 d-flex justify-content-center">
                    <div className="col-5"></div>
                    <div className="col-2 d-flex justify-content-center">
                        <img src="https://www.lg.com/in/images/LG-Certified-Installation.jpg"></img>
                    </div>
                    <div className="col-5"></div>
                    
                </div>
                <div className="col-3 d-flex justify-content-center">
                    <div className="col-5"></div>
                    <div className="col-2 d-flex justify-content-center">
                        <img src="https://www.lg.com/in/images/02-Secure-Payments.jpg"></img>
                    </div>
                    <div className="col-5"></div>
                    
                </div>
                <div className="col-3 d-flex justify-content-center">
                    <div className="col-5"></div>
                    <div className="col-2 d-flex justify-content-center">
                        <img src="https://www.lg.com/in/images/03-Exclusive-Offers.jpg"></img>
                    </div>
                    <div className="col-5"></div>
                    
                </div>
                <div className="col-3 d-flex justify-content-center">
                    <div className="col-5"></div>
                    <div className="col-2 d-flex justify-content-center">
                        <img src="https://www.lg.com/in/images/01-Free-Shoping-v1.jpg"></img>
                    </div>
                    <div className="col-5"></div>
                    
                </div>
            </div>

            <div className="row mb-1 align-items-center">
                <div className="col-3 d-flex justify-content-center">
                    <h4>Certified Installation</h4>
                </div>
                <div className="col-3 d-flex justify-content-center">
                    <h4>Secure Payments</h4>
                </div>
                <div className="col-3 d-flex justify-content-center">
                    <h4>Exclusive Offers</h4>
                </div>
                <div className="col-3 d-flex justify-content-center">
                    <h4>Free Shipping</h4>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-3 d-flex justify-content-center">
                    <div className="col-1"></div>
                    <div className="col-10">
                    Once you place order on Electronic Hub your installation request will be generated post-delivery and our expert engineers will guide you through user manual
                    </div>
                    <div className="col-1"></div>
                
                </div>
                <div className="col-3 d-flex justify-content-center">
                    <div className="col-1"></div>
                    <div className="col-10">
                    Your Data security & privacy is our priority. Pay securely through 128 bit encrypted payment gateway. We support credit cards, net banking and debits cards.
                    </div>
                    <div className="col-1"></div>
                
                </div>
                <div className="col-3 d-flex justify-content-center">
                    <div className="col-1"></div>
                    <div className="col-10">
                    Now enjoy the benefits of our exclusive offers. Keep browsing to remain updated on latest offers
                    </div>
                    <div className="col-1"></div>
                
                </div>
                <div className="col-3 d-flex justify-content-center">
                    <div className="col-1"></div>
                    <div className="col-10">
                    Avail Free & Safe shipping in serviceable pin codes, whenever you shop from Electronic Hub We take pride in delivering most of our orders on priority
                    </div>
                    <div className="col-1"></div>
                
                </div>
            </div>
        </div>
        </>
    )
}