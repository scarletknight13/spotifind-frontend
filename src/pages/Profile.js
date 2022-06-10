import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToPlaylistRoute, updateProfileRoute } from "../utils/APIRoutes";
import Header from "../components/Header";
import Logout from "../components/Logout";
import '../styles/profile.css';
function Profile() {
  const [playlistLink, setPlaylistLink] = useState('');
  const [tracks, setTracks] = useState(undefined);
  const [userSignedIn, setUserSignedIn] = useState(undefined);
  const [formValues, setFormValues] = useState({
    email : '',
    username: '',
    profilePic: '',
    bio: '',
    zipcode: '',
    gender: '',
    age: '',
  })
  const navigate = useNavigate();
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
    if(userSignedIn){
      setTracks(userSignedIn.playlist);
    }
  }, [userSignedIn])
  async function handleUpdateProfile(e){
    e.preventDefault();
    const tempValues = formValues;
    for(let i in tempValues){
      if(tempValues[i] === ''){
        delete tempValues[i]
      }
    }
    console.log(tempValues);
    await axios.put(updateProfileRoute, {...tempValues, id : userSignedIn._id});

  }
  function handleFormChange(event){
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
    console.log(formValues);
  };

  function handleSubmitPlaylist(e){
    e.preventDefault();
    const re = /\W/;
    const splitString = playlistLink.split(re);
    const id = splitString[7];
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/playlist_tracks/',
      params: {id: id, offset: '0', limit: '100'},
      headers: {
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
        'X-RapidAPI-Key': 'a452a2ceabmsh4d3450ee31997b6p1cc14ajsn9b6e93a618be'
      }
    };

    axios.request(options).then(function (response) {
      setTracks(response.data.items.map((item) => {
      return {
        artist: item.track.artists[0].name,
        name: item.track.name,
        song_uri: item.track.uri.split(':')[2],
      }
    })
    )
    sendPlaylistToDatabase();
    }).catch(function (error) {
      console.error(error);
    });
  }
  async function sendPlaylistToDatabase(){
    console.log('made it here');
    const data = await axios.put(`${addToPlaylistRoute}`, {
      playlist: tracks,
      _id: userSignedIn._id
    });
  }
  function handleLinkChange(e){
    setPlaylistLink(e.target.value);
  }
  function displayTracks(){
    const displayedTracks = tracks.map(track => {
      return (
        <div>
          <a target="_blank" href={`https://open.spotify.com/track/${track.song_uri}`}>{`${track.artist} - ${track.name}`}</a>
        </div>
      )
    })
    return displayedTracks;
  }
  return (
    <div className="Profile">
    <Header/>
    <div className="main">

      <form className="profile-form" onSubmit={(e) => handleUpdateProfile(e)}>
          <div className="form-field">
            <label htmlFor="username">Username: </label>
            <input id='username' name="username" placeholder="username" onChange={(e) => handleFormChange(e)}/>
            <br></br>
          </div>
          <div className="form-field">
            <label htmlFor="email">Email: </label>
            <input id="email" name="email" placeholder="email" onChange={(e) => handleFormChange(e)}/>
            <br></br>

          </div>
          <div className="form-field">
            <label htmlFor="age">Age: {formValues.age}</label>
            <input id="age" type='range' name="age" min='18' max='85' onChange={(e) => handleFormChange(e)}/>
            <br></br>

          </div>
          <div className="form-field">
            <label htmlFor="zipcode">Zipcode: </label>
            <input id="zipcode" name="zipcode" placeholder="zipcode" onChange={(e) => handleFormChange(e)}/>
            <br></br>
          </div>
          <div className="form-field">
            <label htmlFor="profilePic">Profile Pic: </label>
            <input id="profilePic" name="profilePic" placeholder="profilePic" onChange={(e) => handleFormChange(e)}/>
            <br></br>

          </div>
          <div className="form-field">
            <label htmlFor="bio">Bio: </label>
            <input id="bio" name="bio" placeholder="bio" onChange={(e) => handleFormChange(e)}/>
            <br/>

          </div>
          <div className="form-field">
            <label for="cars">Gender: </label>
            <select name="gender" onChange={(e) => handleFormChange(e)}>
              <option value="Man">Man</option>
              <option value="Woman">Woman</option>
              <option value="Transman">Transman</option>
              <option value="Transwoman">Transwoman</option>
              <option value="Non-binary">Non-binary</option>
            </select>

          </div>
          <input type="submit" placeholder="Submit"/>
        </form>
        <form onSubmit={(e) => handleSubmitPlaylist(e)}>
          <label>Enter Playlist</label>
          <input type="text" name='link' onChange={e => handleLinkChange(e)}/>
          <button type="submit">Enter</button>
        </form>
        <Logout/>
        <div className="playlist">
          {tracks === undefined ? (
              (<h2>No Tracks in Playlist</h2>)
            ) : ( displayTracks()
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile