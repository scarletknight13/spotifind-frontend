import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "./Logout";
export default function ChatDefault() {
  const [userName, setUserName] = useState(undefined);
  console.log('im in chatDefault')
  useEffect(() => {
    const fetchData = async () =>{
        const data = await JSON.parse(
            localStorage.getItem('chat-app-user')
          ).username
        setUserName(data);
    }
    fetchData()
  }, []);
  return (
    <Container>
      <img src="https://media4.giphy.com/media/5UA8yzZgQeq3C02eA2/200w.webp?cid=ecf05e47lulfysrl7cie9qh1t9nxbjcoyok1wqstbwk7u4co&rid=200w.webp&ct=g" alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;