import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Like from '../components/Like';
import Reject from '../components/Reject';
import ViewPlaylist from '../components/ViewPlaylist';
import ViewUser from '../components/ViewUser';
import Header from '../components/Header';
function Main() {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(-1);
  console.log(selectedUser);
  return (
    <div className="Main">
      <Header/>
      <ViewUser selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
      <div className="button-container">
        <Like/>
        <ViewPlaylist/>
        <Reject selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
      </div>
    </div>
  )
}

export default Main