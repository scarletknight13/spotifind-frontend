import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import { deleteMatchRoute } from "../utils/APIRoutes";
import axios from "axios";
export default function Unmatch({currentUsername, currentChat}) {
  // console.log('logging out');
  const navigate = useNavigate();
  const handleClick = async () => {
      console.log(currentChat);
      await axios.put(`${deleteMatchRoute}/${currentChat.id}`, {user1: currentChat.user1, user2: currentChat.user2});

  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #2D12ED;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
