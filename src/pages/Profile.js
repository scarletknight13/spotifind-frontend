import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import Header from "../components/Header";
function Profile() {
  const [playlistLink, setPlaylistLink] = useState('');
  const [tracks, setTracks] = useState(undefined);
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
    }).catch(function (error) {
      console.error(error);
    });
  }
  function handleChange(e){
    setPlaylistLink(e.target.value);
  }
  function displayTracks(){
    console.log(tracks);
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
    <div className="profile">
      <Header/>
      <form onSubmit={(e) => handleSubmitPlaylist(e)}>
        <label>Enter Playlist</label>
        <input type="text" name='link' onChange={e => handleChange(e)}/>
        <button type="submit">Enter</button>
      </form>
      <div>
        {tracks === undefined ? (
            (<h2>No Tracks in Playlist</h2>)
          ) : ( displayTracks()
        )}
      </div>
    </div>
  )
}

export default Profile