import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import '../styles/matches.scss'
import logo from '../assets/LT.png'
export default function Matches({ matches, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem('chat-app-user')){
      console.log('chat user is not available im going to login page', localStorage.getItem('chat-app-user'))
      navigate('/login')
    }
    const fetchData = async () => {
      const data = await JSON.parse(
        localStorage.getItem('chat-app-user')
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.profilePic);
    }
    fetchData()
  }, []);
  const changeCurrentChat = (index, match) => {
    setCurrentSelected(index);
    console.log(match);
    changeChat(match);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <div className="Matches">
          <div className="brand">
            <img src={logo} alt="logo" />
            <h3>Spotifind</h3>
          </div>
          <div className="matched-users">
            {matches.map((match, index) => {
              return (
                <div
                  key={match._id}
                  className={`match ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, match)}
                >
                  <div className="avatar">
                    <img
                      src={match.user1.username === currentUserName ? match.user2.profilePic : match.user1.profilePic}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{match.user1.username === currentUserName ? match.user2.username : match.user1.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={currentUserImage}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
