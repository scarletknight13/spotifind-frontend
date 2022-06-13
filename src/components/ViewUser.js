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
      <>
        <img src={user.profilePic}/>
        <h1>{`${user.username} ${user.age}`}</h1>
        <p>{user.gender}, {user.age}</p>
        <p>{user.bio}</p>
      </>)
    })
  setCurrentPotentialMatch(data[selectedUser]);
  }, [selectedUser])
  return (
      <div className="ViewUser">
          {
            users === undefined ? (<h1>loading....</h1>) : 
              (currentPotentialMatch)
          }
      </div>
  )
}

export default ViewUser