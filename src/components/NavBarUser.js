import React, { useState } from "react";
import '../static/css/navbar.css'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link, useNavigate } from "react-router-dom";
import logo from '../static/images/logo-no-background.png'
import { toast } from "react-toastify";

export default function NavBarUser(){
  const navigate = useNavigate();
  const isLoggedIn = localStorage.length==0?false:true;
  const isAdmin = localStorage.getItem('admin')=='true'?true:false;

  const [searchQuery,setSearchQuery] = useState("");

  const handleLogout = ()=>{
    localStorage.removeItem('id');
    localStorage.removeItem('admin');

    navigate('/', {replace:true});
    toast.success('Logged Out Successfully');
  }

  const handleSearch = (e)=>{
    console.log(searchQuery);
    navigate(`/search/${searchQuery}`);
  }


    return(
        <nav class="navbar navbar-expand-lg stickyNavbar text-white">
  <div class="container-fluid">
    <Link class="navbar-brand logo" to="/"><img className="logoImage" src={logo}></img></Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
   
    <div class="collapse navbar-collapse justify-content-end navbarItems" id="navbarSupportedContent">
        
        <div className="search-container">
        <form class="d-flex" role="search">
                <input class="form-control search-bar" type="search" placeholder="Search" value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}} aria-label="Search"/>
                <button type="submit" className="search-btn" onClick={handleSearch}><SearchOutlinedIcon/></button>
            </form>
        </div>

        <ul class="navbar-nav">
            {
              isAdmin
              ?<li className="nav-item">
                <Link className="nav-link" to='/admin'><AdminPanelSettingsIcon className="mb-1"/> Admin</Link>
              </li>
              :<></>
            }
            <li class="nav-item">
            <Link class="nav-link" to="/products/all"><InventoryOutlinedIcon/> All Products</Link>
            </li>
            <li class="nav-item">
            <Link class="nav-link" to="/cart"><ShoppingCartOutlinedIcon/> Cart</Link>
            </li>
            <li class="nav-item">
            <Link class="nav-link" to="/order"><LocalShippingOutlinedIcon/> Orders</Link>
            </li>

            

          {
            isLoggedIn
            ? <>
            <li class="nav-item">
            <Link class="nav-link" to="/account"><AccountCircleOutlinedIcon/> My Account</Link>
            </li>

            <li class="nav-item" onClick={handleLogout}>
            <Link class="nav-link"><LogoutOutlinedIcon/> Logout</Link>
            </li>
            </>

            :<li class="nav-item" >
            <Link class="nav-link" to="/login"><LoginOutlinedIcon/> Login</Link>
            </li>
          }
            

            

            

        </ul>
      
    </div>
  </div>
</nav>
    );
}