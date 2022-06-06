import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    
    changeChat(match);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCBmnbqB2U3X8Md-RvAGMGtm9syclTVXqIRA&usqp=CAU" alt="logo" />
            <h3>Spotify</h3>
          </div>
          <div className="matches">
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
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .matches {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .match {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;