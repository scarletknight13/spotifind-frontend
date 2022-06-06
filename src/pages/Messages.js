import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { allMatchesRoute } from '../utils/APIRoutes';
import Matches from './Matches';
import ChatDefault from '../components/ChatDefault';
import ChatContainer from '../components/ChatContainer';
function Messages() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(localStorage.getItem('chat-app-user'));
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
  useEffect(()=>{
    async function fetchData(){
      if(currentUser){
        console.log(allMatchesRoute);
        const data = await axios.get(`${allMatchesRoute}${currentUser._id}`);
        setMatches(data.data);
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
  };
  return (
    <>
      <Container>
        <div className="container">
          <Matches matches={matches} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <ChatDefault />
          ) : (
            <ChatContainer currentChat={currentChat} />
          )}
        </div>
      </Container>
    </>
  );
}
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