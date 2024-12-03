import React, { useEffect, useState } from 'react'

import axiosClient from "../axios.client";
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

function Users() {
  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(false);

  const {setNotification} = useStateContext();

  useEffect(()=>{
    getUsers();
  },[]);

  const getUsers = () =>{
    setLoading(true);
    axiosClient.get('/users').then(({data})=>{
        setLoading(false);
        console.log(data);
        setUsers(data.data);
    },(errors)=>{
      setLoading(false);
        console.log(errors);
    })
  }

  const onDelete = (u) =>{
    if(!confirm('Are you sure want to delete')){
      return;
    }
    setLoading(true);
    axiosClient.delete(`/users/${u.id}`).then(({data})=>{
      setNotification('User Deleted successfully.');
      setLoading(false);
      //show notification
      getUsers();
    },(errors)=>{
      setLoading(false);
    })
  }
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1>User List</h1>
        <Link to="/users/new" className='btn-add'>Add New</Link>
      </div>
      <div className='card animated fadeInDown'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          {loading &&
          <tbody>
            <tr>
              <td colSpan="5" className='text-center'>
                Loading...
              </td>
            </tr>
          </tbody>
          }
          {!loading &&
          <tbody>
            {users.map(u=>(
                <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.created_at}</td>
              <td>
                <Link className='btn-edit' to={'/users/'+u.id}>Edit</Link> &nbsp;
                <button  className='btn-delete' onClick={ ev => onDelete(u)}>Delete</button>
              </td>
            </tr>
              ))
            }
          </tbody>
        }
        </table>
      </div>
    </div>
  )
}

export default Users