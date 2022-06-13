import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Like from '../components/Like';
import Reject from '../components/Reject';
import ViewPlaylist from '../components/ViewPlaylist';
import ViewUser from '../components/ViewUser';
import Header from '../components/Header';
import {getUsersRoute} from '../utils/APIRoutes'
import axios from 'axios'
import '../styles/Main.scss'
function Main() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(undefined);
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
  function displayTracks(){
    const displayedTracks = users[selectedUser].playlist.map(track => {
      return (
        <div className="track-container">
          <a className="track" target="_blank" href={`https://open.spotify.com/track/${track.song_uri}`}>{`${track.artist} - ${track.name}`}</a>
        </div>
      )
    })
    return displayedTracks;
  }
  return users &&  selectedUser < users.length? (
    <div className="Main">
      <Header/>
      <div className="display-container">
        <ViewUser className="user-info" users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} userSignedIn={userSignedIn}/>
        <div className="button-container">
          <Like userSignedIn={userSignedIn} users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
          <Reject selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
        </div>
        <div className="potential-playlist-container">
          {displayTracks()}
        </div>
      </div>
    </div>
  ) : <div className="Main"><h1>No users match your profile</h1></div>
}

export default Main