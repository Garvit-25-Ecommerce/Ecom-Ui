import React from "react";
import { useParams } from "react-router-dom";
import AdminViewUser from "../components/AdminViewUser";
import NavBarAdmin from "../components/NavBarAdmin";

export default function AdminViewUserPage(){
    const {id} = useParams;

    return(
        <>
        <NavBarAdmin/>
        <AdminViewUser id={id}/>
        </>
    )
}