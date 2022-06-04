import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
function Register() {
  function handleSubmit(event){
    event.preventDefault();
    alert('form');
  }
  function handleChange(event){
     
  }
  return (
    <div>
      <FormContainer>
        <form onSubmit={(event)=> handleSubmit(event)}>
          <div className='brand'>
            <img src=""></img>
            <h1>Spotifind</h1>
          </div>
          <input 
            type="text" 
            placeholder='Username'
            name='username'
            onChange={(e) => handleChange(e)}
          />
          <input 
            type="email" 
            placeholder='Email'
            name='email'
            onChange={(e) => handleChange(e)}
          />
          <input 
            type="password" 
            placeholder='Password'
            name='password'
            onChange={(e) => handleChange(e)}
          />
          <input 
            type="password" 
            placeholder='Confirmed Password'
            name='confirmedPassword'
            onChange={(e) => handleChange(e)}
          />
          <button type='submit'>Create User</button>
          <span>Already have account? <Link to='/login'>Login</Link></span>
        </form>
      </FormContainer>
    </div>
  )
}
const FormContainer = styled.div``;

export default Register