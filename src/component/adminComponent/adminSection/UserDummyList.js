import React from 'react'
import "./adminSection.css";
import {userRows} from "./dummyData"
function UserDummyList() {
    
  return (
    <div className='userDummyList-container'>
        <p className='dummy-p'> Dummy User Data</p>
            <table className='table'>
            <tbody>
            <tr className='table-row'>
                <th className='table-header'> Avatar</th>
              <th className='table-header'> Full Name</th> 
              <th className='table-header'> Email</th>   
              <th className='table-header'> Status</th>   
              <th className='table-header'> Transaction</th>      
              </tr>

              {userRows.map( (val, key) => (

              <tr key = {key}>
              <td  className = "data"> <img src= {val.avatar} className = "dummy-avatar"/> </td>
              <td  className='data' >   {val.username} </td>
              <td  className='data' >   {val.email} </td>
              <td  className='data' >   {val.status} </td>
              <td  className='data' >   {val.transaction} </td>
                </tr>
                ))}
          </tbody>
          </table>
    </div>
  )
}

export default UserDummyList