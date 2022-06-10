import React from 'react'
import {useState, useEffect} from 'react'
import {getUsersRoute} from '../utils/APIRoutes'
import axios from 'axios'
function ViewUser({selectedUser, setSelectedUser, userSignedIn, users}) {
  console.log(selectedUser);
  const [currentPotentialMatch, setCurrentPotentialMatch] = useState([]);

  useEffect(() => {
    console.log(users)
    const data = users.map((user) => {
      return (
      <div className='container'>
        <img src={user.profilePic}/>
        <h1>{user.username}</h1>
      </div>)
    })
  setCurrentPotentialMatch(data[selectedUser]);
  }, [selectedUser])
  return (
      <div>
          {
            users === undefined ? (<h1>loading....</h1>) : 
              (currentPotentialMatch)
          }
      </div>
  )
}

export default ViewUser