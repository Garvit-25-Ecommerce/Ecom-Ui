import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../static/css/form.css'
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import axios from "axios";
import { toast } from "react-toastify";
import { ConstructionOutlined } from "@mui/icons-material";

export default function RegisterForm(){
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [contactNumber,setContactNumber] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('id')!==null){
            navigate('/',{replace:true});
        }
        
    },[])

    const handleRegister = ()=>{
        if(password!=confirmPassword){
            setErrorMessage("Password fields doesnot match")
            
        }else{
            axios.post(`http://localhost:8080/user/add`,
            {
                username: username,
                email:email,
                password:password,
                contactNumber:contactNumber
            }).then(response=>{
                axios.get(`http://localhost:8080/user/byEmail/${email}`)
                .then(res=>{
                    let data = res.data.data;
                    localStorage.setItem('id',data.id);
                    localStorage.setItem('admin',data.admin);
                    toast.success("User profile created");
                    navigate('/',{replace:true});
                }).catch(err=>{
                    console.log(err);
                })
                
            }).catch(err=>{
                if(err.code=='ERR_NETWORK'){
                    navigate('/error',{replace:true});
                }else{
                    setErrorMessage(err.response.data.message);
                }
                
                
            })
        }
        
    }

    return(
        <div className="container-fluid mt-5 mb-5">
            <div className="row align-items-center">
                <div className="col-2"></div>

                <div className="col-8 d-flex justify-content-center">
                    <div className="container-fluid formContainer">
                    <div className="row align-items center">
                    
                    <div className="col-5 d-flex justify-content-center">
                        <img src="loginPageImage.jpg" className="w-100"></img>
                    </div>

                    <div className="col-7 d-flex justify-content-center">
                        <div className="card formCard">
                            <h1 className="card-title d-flex justify-content-center mb-4">Register</h1>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label for ="username" className="form-label">Username<span style={{color: "red"}} className="fs-5">*</span></label>
                                        <div className="inputGroup">
                                            <PersonIcon className="emailIcon"/>
                                            <input type="text" className="form-control"  placeholder="user123" value={username} onChange={(e)=>{setUsername(e.target.value)}} required></input>
                                        </div>
                                        
                                    </div>

                                    <div className="mb-3">
                                        <label for ="userEmail" className="form-label">Email<span style={{color: "red"}} className="fs-5">*</span></label>
                                        <div className="inputGroup">
                                            <EmailIcon className="emailIcon"/>
                                            <input type="email" className="form-control"  placeholder="example@abc.com" value={email} onChange={(e)=>{setEmail(e.target.value)}} required></input>
                                        </div>
                                        
                                    </div>

                                    <div className="mb-3">
                                        <label for ="userPassword" className="form-label">Password<span style={{color: "red"}} className="fs-5">*</span></label>
                                        <div className="inputGroup">
                                            <PasswordIcon className="emailIcon"/>
                                            <input type="password" className="form-control"  placeholder="Enter password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required></input>
                                        </div>
                                        
                                    </div>

                                    <div className="mb-3">
                                        <label for ="userConfirmPassword" className="form-label">Confirm Password<span style={{color: "red"}} className="fs-5">*</span></label>
                                        <div className="inputGroup">
                                            <PasswordIcon className="emailIcon"/>
                                            <input type="password" className="form-control"  placeholder="Confirm password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} required></input>
                                        </div>
                                        
                                    </div>

                                    <div className="mb-3">
                                        <label for ="userPassword" className="form-label">Contact Number<span style={{color: "red"}} className="fs-5">*</span></label>
                                        <div className="inputGroup">
                                            <CallIcon className="emailIcon"/>
                                            <input type="tel" className = "form-control" placeholder="Enter your 10 digit phone number here" pattern="[1-9]{1}[0-9]{9}" required value={contactNumber} onChange={(e)=>{setContactNumber(e.target.value)}}></input>
                                        </div>
                                        
                                    </div>

                                    <div className="mb-3 d-flex justify-content-center">
                                        <p style={{color:"red"}}>{errorMessage}</p>
                                    </div>

                                </form>

                                <button type="submit" className="btn btn-primary signin-btn" onClick={handleRegister}>Sign Up <LoginIcon/></button>
                                
                                <div className="d-flex justify-content-center mt-2">
                                <p>Already a user? </p><Link to="/login" className="mx-1"> Login Now </Link>
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