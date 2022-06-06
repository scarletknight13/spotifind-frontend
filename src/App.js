import Header from "./components/Header";
import Footer from './components/Footer';
import {Route, Routes} from "react-router-dom";

// Pages
import Messages from "./pages/Messages";
import Main from "./pages/Main";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";


import {useState} from "react";
// import UpdateProfile from "./pages/UpdateProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Messages/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
