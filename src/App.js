import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route exact path="/" element={<Main/>}/>
        <Route path="IM/" element={<Messages/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/updateprofile' element={<UpdateProfile URL={URL} setCurrentUser={setCurrentUser} currentUser={currentUser}/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
