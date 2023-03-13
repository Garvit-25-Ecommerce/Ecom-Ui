import axios from "axios";
import React, { useEffect, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import { Link, useNavigate, useParams } from "react-router-dom";
import userImage from '../static/images/user.png'

export default function AdminViewUser(props){
    const {id} = useParams();
    const [userData,setUserData] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(props.id);
        axios.get(`http://localhost:8080/user/${id}`)
        .then(response=>{
            let data = response.data.data;
            setUserData(data);
        }).catch(err=>{
            console.log(err);
            if(err.code=='ERR_NETWORK'){
              navigate('/error',{replace:true});
            }else{
                navigate('*',{replace:true})
            }
        })
    },[]);

    return (
        <div className="container-fluid accountPageContainer">
      <div className="row align-items-start">
        <div className="col-2"></div>

        <div className="col-2 d-flex justify-content-center">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header d-flex justify-content-center">{userData.username}</div>
            <div className="card-body text-center">
              <img className="img-account-profile rounded-circle mb-2" src={userImage}></img>
              <div className="small font-italic text-muted mb-4">Profile Type: {userData.admin
                ? "Admin"
                : "User"}</div>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-center">Account Details</div>
            <div className="card-body accountCardBody">
              <form>
                <div className="mb-3 inputGroup">
                  <PersonIcon className="emailIcon" />
                  <label className="small mb-1" for="username">Username</label>
                  <input
                    className="form-control"
                    id="username"
                    type="text"
                    value={userData.username}
                    disabled></input>
                </div>

                <div className="mb-3 inputGroup">
                  <EmailIcon className="emailIcon" />
                  <label className="small mb-1" for="email">Email</label>
                  <input
                    className="form-control"
                    id="email"
                    type="email"
                    value={userData.email}
                    disabled></input>
                </div>

                <div className="mb-3 inputGroup">
                  <CallIcon className="emailIcon" />
                  <label className="small mb-1" for="phoneNumber">Contact Number</label>
                  <input
                    className="form-control"
                    id="phoneNumber"
                    type="tel"
                    value={userData.contactNumber}
                    disabled
                    required></input>
                </div>

                <div className="d-flex justify-content-center ">
                <Link className="btn btn-primary" to='/admin?type=users'>Back to all Users</Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-2"></div>
      </div>
    </div>
    );

}