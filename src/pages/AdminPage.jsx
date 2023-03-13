import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import NavBarAdmin from "../components/NavBarAdmin";
import '../static/css/admin.css'
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AdminPage() {
    const [queryParams] = useSearchParams();
    const isAdmin = localStorage.getItem('admin');
    const [userData, setUserData] = useState([]);
    const [filteredUserData,setFilteredUserData] =useState([]);
    const [productData,setProductData] = useState([]);
    const [filteredProductData,setFilteredProductData] =useState([]);
    const [typeOfData,setTypeOfData] = useState(queryParams.get('type')==undefined?'users':queryParams.get('type'));
    const [searchText,setSearchText] = useState("");
    const [refresh,setRefresh] = useState("");

    const navigate=useNavigate();


    useEffect(() => {
        axios
            .get(`http://localhost:8080/user/all`)
            .then((response) => {
                let data = response.data.data;
                setUserData(data);
                setFilteredUserData(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [refresh,typeOfData]);

    useEffect(()=>{
        axios.get(`http://localhost:8090/product/all`)
        .then(response=>{
            let data = response.data.data;
            setProductData(data);
            setFilteredProductData(data)
        }).catch(err=>{
            console.log(err);
        })
    },[refresh,typeOfData])

    useEffect(()=>{
        setFilteredUserData(filterUserData(userData));
    },[searchText,userData]);

    useEffect(()=>{
        setFilteredProductData(filterProductData(productData));
    },[searchText,productData]);

    const getData = (type)=>{
        setTypeOfData(type);
    }

    const filterUserData = (input)=>{
        
        return input.filter(item=>item.username && item.username.toLowerCase().includes(searchText.toLowerCase()),
        );
    }

    const filterProductData =(input)=>{
        return input.filter(item=>item.name && item.name.toLowerCase().includes(searchText.toLowerCase()),
        );
    }

    const handleDeleteUser = (id)=>{

        if(id==localStorage.getItem('id')){
            toast.error("Currently logged in, Cannot delete")
        }else{
            axios.delete(`http://localhost:8080/user/delete/${id}`)
            .then(()=>{
                toast.success("user deleted succesfully");
                setRefresh("true"+id);
            }).catch((err)=>{
                console.log(err);
            }); 
        }

         
    }

    const handleViewUser = (id)=>{
        
        navigate(`/admin/users/${id}`,{replace:true});
    }

    const handleDeleteProduct = (id)=>{
        axios.delete(`http://localhost:8090/product/delete/${id}?isAdmin=true`
        ).then(()=>{
            toast.success("Product deleted successfully");
            setRefresh(id);
        }).catch(err=>{
            console.log(err);
        });
    }

    const handleViewProduct = (id)=>{
        navigate(`/admin/products/${id}`,{replace:true});
    }

    const myStyle = {
        headCells:{
            style:{
                fontWeight: 600,
                fontSize:'medium'
            }
        }
    }

    const userColumns = [
        {
            name: 'User Id',
            selector: row=>row.id,
            sortable: true,
        },
        {
            name: 'Username',
            selector: row=>row.username,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row=>row.email,
            sortable: true,
        },
        {
            name: 'Contact Number',
            selector: row=><strong> {row.contactNumber}</strong>,
            sortable: true,
            sortFunction: (rowA,rowB)=>
            { 
                const a = rowA.contactNumber;
                const b = rowB.contactNumber;
                if(a>b){
                    return 1;
                }

                if(b>a){
                    return -1;
                }

                return 0;  
            }
            
        },
        {
            name: 'Action',
            cell: row=> <div className="d-flex"><button type = "button" className="btn btn-primary adminDeleteButton" data-bs-toggle="modal" data-bs-target={"#"+row.id+"Modal"}><DeleteIcon className="mx-1"/></button>
            <button type="button" className="btn btn-primary adminViewButton mx-3" onClick={()=>{handleViewUser(row.id)}} id={row.id}><VisibilityIcon className="mx-1" id={row.id} /></button>
                
            <div className="modal fade" tabIndex="-1" id={row.id+"Modal"} aria-labelledby={row.id+"label"} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered align-items-center justify-content-center">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title deleteProductTitle" id ={row.id+"label"}>Delete User</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                        <h5>Do you want to delete this user?</h5>
                        <h5>This action can not be reversed!</h5>
                        </div>

                        <div className="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary deleteProductButton" data-bs-dismiss="modal" id={row.id} onClick={()=>{handleDeleteUser(row.id)}}>Delete User</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        },
    ]

    const productColumns = [
        {
            name: 'Product Id',
            selector: row=>row.id,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row=>row.category,
            sortable: true,
        },
        {
            name: 'Brand',
            selector: row=>row.brand,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row=>row.name,
            sortable: true,
        },
        {
            name: 'Product Price',
            selector: row=>row.price,
            sortable: true,
        },

        {
            name: 'Action',
            cell: row=> <div className="d-flex"><button type = "button" className="btn btn-primary adminDeleteButton" data-bs-toggle="modal" data-bs-target={"#"+row.id} ><DeleteIcon className="mx-1"/></button>
                <button type="button" className="btn btn-primary adminViewButton mx-3" onClick={()=>{handleViewProduct(row.id)}}><VisibilityIcon className="mx-1"/></button>
                <div className="modal fade" tabIndex="-1" id={row.id} aria-labelledby={row.id+"label"} aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered align-items-center justify-content-center">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title deleteProductTitle" id ={row.id+"label"}>Delete Product</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                            <h5>Do you want to delete this Product?</h5>
                            <h5>This action is irreversible.</h5>
                            </div>

                            <div className="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary deleteProductButton" data-bs-dismiss="modal" id = {row.id} onClick={()=>{handleDeleteProduct(row.id)}}>Delete Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        },
    ]

    return (
        <>
        <NavBarAdmin getData={getData}/>
        <div className="container-fluid dataTableContainer">
        {
            typeOfData=='users'
            ?<DataTable 
            className=""
            title={<h2 className="text-center">User List</h2>} 
            columns={userColumns} data={filteredUserData} 
            pagination 
            subHeader 
            subHeaderComponent={<input type="search" className="form-control w-25" value={searchText} placeholder="search here" onChange={(e)=>{setSearchText(e.target.value)}}/>}
            customStyles={myStyle}
            />
            :<DataTable 
            title={<h2 className="text-center">Product List</h2>} 
            columns={productColumns} 
            data={filteredProductData} 
            pagination
            subHeader
            subHeaderComponent={<input type="search" className="form-control w-25" value={searchText} placeholder="search here" onChange={(e)=>{setSearchText(e.target.value)}}/>}
            customStyles={myStyle}
            />
        }
        </div>  
        </>
        
    );
}
