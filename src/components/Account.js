import axios from "axios";
import React, { useEffect, useState } from "react";
import '../static/css/account.css'
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import { toast } from "react-toastify";
import userImage from '../static/images/user.png'
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [userData,
    setUserData] = useState({});
  const [username,
    setUsername] = useState("");
  const [contactNumber,
    setContactNumber] = useState("");

  const [oldPassword,setOldPassword] = useState("");
  const [newPassword,setNewPassword] = useState("");
  const navigate = useNavigate();

    useEffect(() => {
      axios.get(`http://localhost:8080/user/${localStorage.getItem('id')}`).then(response => {
        let data = response.data.data;
        setUserData(data);
        setUsername(data.username);
        setContactNumber(data.contactNumber);
        console.log(data);
      }).catch(err => {
        console.log(err);
        if(err.code=='ERR_NETWORK'){
          navigate('/error',{replace:true});
        }else{
            navigate('*',{replace:true})
        }

      })
    }, [])

  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  const handleUpdateProfile = () => {
    if((oldPassword!="" && newPassword=="") || (oldPassword=="" && newPassword!="")){
      toast.info("Enter both new and old password")
    }else if(oldPassword!="" && newPassword!=""){
      axios.patch(`http://localhost:8080/user/update/${userData.id}`,
      {
        username: username,
        contactNumber: contactNumber,
        oldPassword : oldPassword,
        newPassword: newPassword
      }).then(response=>{
        toast.success("Details updated");
      }).catch(err=>{
        toast.error("Cannot update details");
      })
    }else{
      axios.patch(`http://localhost:8080/user/update/${userData.id}`,
      {
        username: username,
        contactNumber: contactNumber,
      }).then(response=>{
        toast.success("Details updated");
      }).catch(err=>{
        toast.error("Cannot update details");
      })
    }

    setOldPassword("");
    setNewPassword("");
  }

  return (
    <div className="container-fluid accountPageContainer">
      <div className="row align-items-start">
        <div className="col-2"></div>

        <div className="col-2 d-flex justify-content-center">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header d-flex justify-content-center" style={{color:"#FF4C29"}}>{userData.username}</div>
            <div className="card-body text-center">
              <img className="img-account-profile rounded-circle mb-2" src={userImage}></img>
              <div className="small font-italic text-muted mb-4">Profile Type: {localStorage.getItem('admin')=='false'
                ? "User"
                : "Admin"}</div>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-center" style={{color:"#FF4C29"}}>Account Details</div>
            <div className="card-body accountCardBody">
              <form>
                <div className="mb-3 inputGroup">
                  <PersonIcon className="emailIcon" />
                  <label className="small mb-1" for="username">Username</label>
                  <input
                    className="form-control"
                    id="username"
                    type="text"
                    value={username}
                    onChange={handleUsername}
                    required></input>
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
                    value={contactNumber}
                    onChange={(e) => {
                      setContactNumber(e.target.value);
                    }}
                    pattern="[1-9]{1}[0-9]{9}"
                    required></input>
                </div>

                <div className="row gx-3 mb-3">
                  <div className="col-6">
                    <div className="mb-3 inputGroup">
                      <PasswordIcon className="emailIcon" />
                      <label className="small mb-1" for="oldPassword">Old Password</label>
                      <input
                        className="form-control"
                        id="oldPassword"
                        type="password"
                        value={oldPassword}
                        onChange={(e)=>{
                          setOldPassword(e.target.value);
                        }}
                        placeholder="Old password"></input>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="mb-3 inputGroup">
                      <PasswordIcon className="emailIcon" />
                      <label className="small mb-1" for="newPassword">New Password</label>
                      <input
                        className="form-control"
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e)=>{
                          setNewPassword(e.target.value);
                        }}
                        placeholder="New Password"></input>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary saveChangesButton" type="button" data-bs-toggle="modal" data-bs-target="#saveChangesModal">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-2"></div>
      </div>
      <div className="modal fade" tabIndex="-1" id="saveChangesModal" aria-labelledby="saveChangesModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered align-items-center justify-content-center">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" id = "saveChangesModalLabel" style={{color:"blue"}}>Update Profile</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                    <h5>Do you wish to save changes?</h5>
                    </div>

                    <div className="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdateProfile}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}