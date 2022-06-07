import React from 'react'
import { BiCheck } from "react-icons/bi";
function Like({setSelectedUser, selectedUser}) {
  function handleClick(event) {
    setSelectedUser(selectedUser + 1);
    console.log(selectedUser);
  }
  return (
    <>
        <button><BiCheck/></button>
    </>
  )
}

export default Like