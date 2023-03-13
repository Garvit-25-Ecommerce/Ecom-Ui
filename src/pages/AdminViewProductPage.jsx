import React from "react";
import { useParams } from "react-router-dom";
import AdminViewProduct from "../components/AdminViewProduct";
import NavBarAdmin from "../components/NavBarAdmin";

export default function AdminViewProductPage(){
    const {id} = useParams();
    return (
        <>
        <NavBarAdmin/>
        <AdminViewProduct id={id}/>
        </>
    );
}