import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    name: '',
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: '',
    age: '',
  });

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      console.log('chat user is already present going back to chat'); 
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email, name } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }else if (name === "") {
      toast.error("Name is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log(values);
      const { email, username, password, name, gender, age } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
        name,
        gender,
        age,
      });
      console.log(data)
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          'chat-app-user',
          JSON.stringify(data.user)
        );
        console.log('chat user has been created im going to messages', localStorage.getItem('chat-app-user'));
        navigate("/");
      }
    }
  };

  return (
    <div>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Spotifind</h1>
          </div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="age">Age : {values.age}</label>
          <input
            id='age'
            type="range"
            placeholder="18"
            min="18"
            max='70'
            name="age"
            onChange={(e) => handleChange(e)}/>
          <select name="gender"  onChange={(e) => handleChange(e)}>
            <option value="Man">Man</option>
            <option value="Woman">Woman</option>
            <option value="Transman">Transman</option>
            <option value="Transwoman">Transwoman</option>
            <option value="Non-binary">Non-binary</option>
          </select>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      <ToastContainer />
    </div>
  );
}

