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
    const response = await axios.get(`${isMatchRoute}/${users[selectedUser].username}/${userSignedIn.username}`);
    console.log(response);
  }
  return (
    <div className="Like">
        <button className="like-button" onClick={(e) => handleClick(e)}><BiCheck size="lg"/></button>
    </div>
  )
}

export default Like