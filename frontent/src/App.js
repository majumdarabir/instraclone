
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import { LoginContext } from "./context/LoginContext";
import Createpost from './components/Createpost';
import { useState } from 'react';
import Modal from "./components/Modal";
import Profie from './components/Profile';
import UserProfie from './components/userProfile';
import MyFolliwngPost from './components/MyFollowing';

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ setUserLogin, setModalOpen }}>
        <Navbar login={userLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/createpost" element={<Createpost />} />
          <Route exact path="/Profile" element={<Profie />} />
          <Route path="/profile/:userid" element={<UserProfie />}></Route>
          <Route  path="/followingpost" element={<MyFolliwngPost />} />
        </Routes>
        <ToastContainer />

        {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
      </LoginContext.Provider>


    </BrowserRouter>

  );
}

export default App;
