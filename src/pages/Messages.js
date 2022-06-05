import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { allMatchesRoute } from '../utils/APIRoutes';
import Contacts from './Contacts';
function Messages() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(async()=>{
    if (!localStorage.getItem('chat-app-user')){
      navigate("/login");
    } 
    else{
      setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
    }
  }, [])
  useEffect(async ()=>{
    if(currentUser){
      const data = await axios.get(`${allMatchesRoute}/${currentUser._id}`);
      setContacts(data.data);
    }
    else{
      navigate('/login')
    }
  })
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}
import { allMatchesRoute } from '../utils/APIRoutes';
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Messages