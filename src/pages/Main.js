import React from 'react'
import { useNavigate } from 'react-router-dom';
function Main() {
  const navigate = useNavigate();
  function handleSubmit(e){
    e.preventDefault();
    console.log('here to delete');
    navigate('/login')
    localStorage.removeItem('chat-app-user');
  }
  return (
    <div>
      <button type='submit' onClick={(e) => handleSubmit(e)}>Logout</button>
    </div>
  )
}

export default Main