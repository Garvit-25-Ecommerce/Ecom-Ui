import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import '../static/css/admin.css'
import AddIcon from '@mui/icons-material/Add';
import { toast } from "react-toastify";

export default function NavBarAdmin(props) {
    const {getData} = props;
    const navigate = useNavigate();

    const handleLogout = ()=>{
        localStorage.removeItem('id');
        localStorage.removeItem('admin');
    
        navigate('/', {replace:true});
        toast.success('Logged Out Successfully');
    }

    return (
        <nav class="navbar navbar-expand-lg stickyNavbar text-white">
            <div class="container-fluid">
                <Link class="navbar-brand logo" to="/"><h1 className="text-white">Admin</h1></Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse justify-content-end navbarItems" id="navbarSupportedContent">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link" to='/admin?type=products' onClick={()=>{getData('products');}}>Products <Inventory2OutlinedIcon className="mb-1"/></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to='/admin?type=users' onClick={()=>{getData('users')}}>Users <PersonOutlineOutlinedIcon className="mb-1"/></Link>
                        </li>
                        <li class="nav-item">
                            <Link to='/admin/addProduct' class="nav-link">Add Product <AddIcon className="mb-1"/></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" onClick={handleLogout}>Logout <LogoutIcon className="mb-1"/></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}