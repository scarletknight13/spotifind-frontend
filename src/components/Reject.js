import React from 'react'
import { BiX } from "react-icons/bi";
function Reject({setSelectedUser, selectedUser}) {

  function handleClick(event) {
    setSelectedUser(selectedUser + 1);
    console.log(selectedUser);
  }
  return (
    <div className="Reject">
        <button className="reject-button" type="submit" onClick={(e)=>handleClick(e)}><BiX size="lg"/></button>
    </div>
  )
}

export default Reject