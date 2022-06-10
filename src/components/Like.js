import React from 'react'
import { BiCheck } from "react-icons/bi";
import {addMatchRoute, addToLikesRoute, isMatchRoute} from '../utils/APIRoutes';
import axios from 'axios'
function Like({setSelectedUser, selectedUser, userSignedIn, users}) {
  function handleClick(event) {
    setSelectedUser(selectedUser + 1);
    console.log(users);
    addToLikes();
  }
  async function addToLikes(){
    console.log(users[selectedUser], userSignedIn);
    const data = await axios.put(addToLikesRoute, {user : userSignedIn.username, likedUser : users[selectedUser].username})
    const response = await axios.put(isMatchRoute, {currentUser : userSignedIn.username, likedUser : users[selectedUser].username});
    console.log(response);
  }
  return (
    <>
        <button onClick={(e) => handleClick(e)}><BiCheck/></button>
    </>
  )
}

export default Like