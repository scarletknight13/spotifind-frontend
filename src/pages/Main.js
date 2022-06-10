import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Like from '../components/Like';
import Reject from '../components/Reject';
import ViewPlaylist from '../components/ViewPlaylist';
import ViewUser from '../components/ViewUser';
import Header from '../components/Header';
import {getUsersRoute} from '../utils/APIRoutes'
import axios from 'axios'
function Main() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(-1);
  const [userSignedIn, setUserSignedIn] = useState(undefined);
  console.log(selectedUser);
  useEffect(() => {
    async function fetchData(){
      if (!localStorage.getItem('chat-app-user')){
        navigate("/login");
      } 
      else{
        try{
          setUserSignedIn(await JSON.parse(localStorage.getItem('chat-app-user')));
        }
        catch(error){
          console.log(error)
        }
      }
    }
    fetchData();
  }, [])
  useEffect(() => {
    async function fetchData(){
        console.log(`${getUsersRoute}${userSignedIn._id}`);
        const data = await axios.get(`${getUsersRoute}${userSignedIn._id}`);
        setUsers(data.data);
        setSelectedUser(0);
      }
      if(userSignedIn)
        fetchData();
  }, [userSignedIn])
  return userSignedIn ? (
    <div className="Main">
      <Header/>
      <ViewUser users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} userSignedIn={userSignedIn}/>
      <div className="button-container">
        <Like userSignedIn={userSignedIn} users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
        <ViewPlaylist/>
        <Reject selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
      </div>
    </div>
  ) : <h1>loading...</h1>
}

export default Main