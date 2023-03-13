import React from "react";
import { useNavigate } from "react-router-dom";
import AddProductForm from "../components/AddProductForm";
import NavBarAdmin from "../components/NavBarAdmin";
import { useSearchParams } from "react-router-dom";

export default function AddProductPage(){
    // const [queryParams] = useSearchParams();
    const navigate = useNavigate();
    return(
        <>
        {
            // queryParams.get("isAdmin")=='true'
            // ? <>
            
            // </>
            // : navigate('/', {replace:true})
        }
        <NavBarAdmin/>
        <AddProductForm/>
        </>
        
        
    );
}