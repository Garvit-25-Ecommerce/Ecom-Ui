import React, { useState } from "react";
import '../static/css/filters.css'
import { Link, useParams } from "react-router-dom";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function Filters(props){
    const param = useParams();
    const {updateCategory,updateMin,updateMax,updateSortBy} = props;
    const [category,setCategory] = useState(param.category);
    const [min,setMin] = useState("");
    const [max,setMax] = useState("");
    const [sortBy,setSortBy] = useState("");

    const handleCategory = (e)=>{
        setCategory(e.target.value);
        updateCategory(e.target.value);
    }

    const handleSortBy = (e)=>{
        setSortBy(e.target.value);
        updateSortBy(e.target.value);
    }

    const handlePriceFilter = ()=>{
        if(min!=''){
            updateMin(min);
        }else{
            updateMin(0);
        }
            
        if(max!=''){
            updateMax(max);
        }else{
            updateMax(1000000);
        }
            
    }
    
    return(
        <div className="container filterContainer">
            <div className="categoryContainer">
                <h4 className="mb-3">Filters <FilterAltIcon className="mb-1"/></h4>
            
                <h5>Categories</h5>
                <div class="form-check">
                    <input class="form-check-input" name="flexRadioDefault" type="radio" id="all" value="all" checked={category==="all"} onChange={handleCategory}/>
                    <label class="form-check-label" for="all">All</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" name="flexRadioDefault" type="radio" id="cameras" value="Cameras" checked={category==="Cameras"} onChange={handleCategory}/>
                    <label class="form-check-label" for="cameras">Cameras</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" name="flexRadioDefault" type="radio" id="Laptops" value="Laptops" checked={category==="Laptops"} onChange={handleCategory}/>
                    <label class="form-check-label" for="Laptops">Laptops</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" name="flexRadioDefault" type="radio" id="Smartphones" value="Smartphones" checked={category==="Smartphones"} onChange={handleCategory}/>
                    <label class="form-check-label" for="Smartphones">Smartphones</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" name="flexRadioDefault" type="radio" id="Televisions" value="Televisions" checked={category==="Televisions"} onChange={handleCategory}/>
                    <label class="form-check-label" for="Televisions">Televisions</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" name="flexRadioDefault" type="radio" id="Video Games" value="Video Games" checked={category==="Video Games"} onChange={handleCategory}/>
                    <label class="form-check-label" for="Video Games">Video Games</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" name="flexRadioDefault" type="radio" id="Wearables" value="Wearables" checked={category==="Wearables"} onChange={handleCategory}/>
                    <label class="form-check-label" for="Wearables">Wearables</label>
                </div>
            </div>

            <div className="priceRange">
                <h5 className="mb-3">Price</h5>
                <div className="d-flex align-items-center">
                    <input type ="number" className="form-control" placeholder="min" value={min} min='0' onChange={(e)=>setMin(e.target.value)}/>
                    <p className="mx-2">to</p>
                    <input type ="number" className="form-control" placeholder="max" value={max} max='1000000' onChange={(e)=>setMax(e.target.value)}/>
                    <button type="button" className="btn btn-primary mx-2" onClick={handlePriceFilter}>Apply</button>
                </div>
            </div>

            <div className="sortBy">
                <h5>Sort By</h5>
                <div class="form-check">
                    <input class="form-check-input" name="flexRadio" type="radio" id="name_a-z" checked={sortBy==="name ascending"} onChange={handleSortBy} value="name ascending"/>
                    <label class="form-check-label" for="name_a-z">Name A-Z</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" name="flexRadio" type="radio" id="name_z-a" checked={sortBy==="name descending"} onChange={handleSortBy} value="name descending"/>
                    <label class="form-check-label" for="name_z-a">Name Z-A</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" name="flexRadio" type="radio" id="price_lowToHigh" checked={sortBy==="price ascending"} onChange={handleSortBy} value="price ascending"/>
                    <label class="form-check-label" for="price_lowToHigh">Price: Low to High</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" name="flexRadio" type="radio" id="price_highToLow" checked={sortBy==="price descending"} onChange={handleSortBy} value="price descending"/>
                    <label class="form-check-label" for="price_highToLow">Price: High to Low</label>
                </div>
            </div>
            
        </div>
    )
}