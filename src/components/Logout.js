import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
export default function Logout() {
  // console.log('logging out');
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.removeItem('chat-app-user');
    console.log('im deleting chat user and going back to login', localStorage.getItem('chat-app-user'));
    navigate("/login");

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