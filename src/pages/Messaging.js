import React, {useState, useEffect, useRef } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { allMatchesRoute, host } from '../utils/APIRoutes';
import Matches from './Matches';
import ChatDefault from '../components/ChatDefault';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client';
import Header from '../components/Header';
import '../styles/Messaging.css'
function Messaging() {
  const socket = useRef();
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentMessages, setCurrentMessages] = useState(undefined);
  useEffect(()=>{
    async function fetchData(){

      if (!localStorage.getItem('chat-app-user')){
        console.log('Returning to login chat user not available', localStorage.getItem('chat-app-user'))
        navigate("/login");
      } 
      else{
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
      }
    }
    fetchData();
  }, [])
  useEffect(() => {
    if(currentUser){
      socket.current = io(host)
      socket.current.emit('add-user', currentUser._id)
    }
  }, [currentUser])
  useEffect(()=>{
    async function fetchData(){
      if(currentUser){
        console.log(allMatchesRoute);
        try{
          const data = await axios.get(`${allMatchesRoute}${currentUser._id}`);
          setMatches(data.data);
        }
        catch(error){
          console.log(error);
        }
      }
      else{
        console.log('I think theres no user so im going back to login', currentUser)
        // navigate('/login')
      }
    }
    fetchData();
  }, [currentUser])
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    setCurrentMessages(chat.messages);
  };
  return (
    <div className="Messaging">
      <Header/>
      <div className="messages-display">
        <div className="message-container">
          <Matches matches={matches} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <ChatDefault />
          ) : (
            <ChatContainer matches={matches} currentChat={currentChat} currentMessages={currentMessages} setCurrentMessages={setCurrentMessages} socket={socket}/>
          )}
        </div>
      </div>
    </div>
  );
}
export default Messaging