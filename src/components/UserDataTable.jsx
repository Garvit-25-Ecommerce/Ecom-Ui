import React from "react";
import DataTable from "react-data-table-component";
import NavBarAdmin from "../components/NavBarAdmin";
import '../static/css/admin.css'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from "react-toastify";

export default UserDatatable(){
    const [userData, setUserData] = useState([]);
    const [filteredUserData,setFilteredUserData] =useState([]);
    const [searchText,setSearchText] = useState("");
    const [refresh,setRefresh] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/user/all`)
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
        setFilteredUserData(filterUserData(userData));
    },[searchText,userData]);

    const handleDeleteUser = (e)=>{

        axios.delete(`http://localhost:8080/user/delete/${e.target.id}`)
        .then(()=>{
            toast.success("user deleted succesfully");
            setRefresh("true"+e.target.id);
        }).catch((err)=>{
            console.log(err);
        });   
    }

    const filterUserData = (input)=>{
        
        return input.filter(item=>item.username && item.username.toLowerCase().includes(searchText.toLowerCase()),
        );
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
            cell: row=> <div><button type = "button" className="btn btn-primary adminDeleteButton" data-bs-toggle="modal" data-bs-target={"#"+row.id+"Modal"}><DeleteIcon className="mx-1"/></button>
            
                
            <div className="modal fade" tabIndex="-1" id={row.id+"Modal"} aria-labelledby={row.id+"label"} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered align-items-center justify-content-center">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title" id ={row.id+"label"}>Delete User</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                        <p>Do you want to delete this user?</p>
                        </div>

                        <div className="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id={row.id}onClick={handleDeleteUser}>Delete User</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        },
    ]
    return(
        <DataTable 
            className=""
            title={<h2 className="text-center">User List</h2>} 
            columns={userColumns} data={filteredUserData} 
            pagination 
            subHeader 
            subHeaderComponent={<input type="search" className="form-control w-25" value={searchText} placeholder="search here" onChange={(e)=>{setSearchText(e.target.value)}}/>}
            />
    );
}