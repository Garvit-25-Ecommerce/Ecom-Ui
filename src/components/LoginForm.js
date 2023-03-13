import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../static/css/form.css'
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import LoginIcon from '@mui/icons-material/Login';
import axios from "axios";
import { toast } from "react-toastify";

export default function LoginForm(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('id')!==null){
            navigate('/',{replace:true});
        }
        
    },[])

    const handleLogin = ()=>{
        axios.post(`http://localhost:8080/user/authenticate`,
        {
            email:email,
            password:password
        }).then(response=>{
            if(response.data.status==true){
                axios.get(`http://localhost:8080/user/byEmail/${email}`)
                .then(res=>{
                    console.log(res);
                    localStorage.setItem('id',res.data.data.id);
                    localStorage.setItem('admin',res.data.data.admin);
                    toast.success("Login successful");
                    navigate('/',{replace:true})   
                }).catch(err=>{
                    console.log('error in getting user by email',err);
                })
            }
        }).catch(err=>{
            if(err.code=='ERR_NETWORK'){
                navigate('/error',{replace:true});
            }else{
                toast.error("User details doesnot match");
            }
            
        })
    }

    return(
        
        <div className="container-fluid mt-5 mb-5">
            <div className="row align-items-center">
                <div className="col-2"></div>

                <div className="col-8 d-flex justify-content-center">
                    <div className="container-fluid formContainer">
                    <div className="row">
                    <div className="col-1"></div>
                    <div className="col-4 d-flex justify-content-center">
                        <img src="loginPageImage.jpg" className="w-100"></img>
                    </div>

                    <div className="col-7 d-flex justify-content-center">
                        <div className="card formCard">
                            <h1 className="card-title d-flex justify-content-center mb-4">Welcome Back</h1>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label for ="userEmail" className="form-label">Email<span style={{color: "red"}} className="fs-5">*</span></label>
                                        <div className="inputGroup">
                                            <EmailIcon className="emailIcon"/>
                                            <input type="email" className="form-control"  placeholder="example@abc.com" value={email} onChange={(e)=>{setEmail(e.target.value);}} required></input>
                                        </div>
                                        
                                    </div>

                                    <div className="mb-3">
                                        <label for ="userPassword" className="form-label">Password<span style={{color: "red"}} className="fs-5">*</span></label>
                                        <div className="inputGroup">
                                            <PasswordIcon className="emailIcon"/>
                                            <input type="password" className="form-control" value={password} onChange={(e)=> setPassword(e.target.value)}  placeholder="Enter password" required></input>
                                        </div>
                                        
                                    </div>

                                </form>

                                <button type="submit" className="btn btn-primary signin-btn" onClick={handleLogin}>Login <LoginIcon/></button>
                                
                                <div className="d-flex justify-content-center mt-2">
                                <p className="">New Here?</p><Link to="/signup" className="mx-1">Create an account </Link>
                                </div>
                                
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
            
            
            
            
        </div>
        
        
    );
}