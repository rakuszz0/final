import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { UserContext } from './contexts/userContext';
import { API, setAuthToken } from './config/api';

import Navbar from './components/navbar';
import AddTicket from './pages/addTicket';
import HomeTicket from './pages/homeTicket';
import ListTransaction from './pages/indexAdmin';
import MyTicket from './pages/myTiket';
import Payment from './pages/payment';

function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.role === 'admin') {
        navigate('/index-admin');
        console.log(state.user.role)
      } else if (state.user.role === 'user') {
        navigate('/')
        console.log(state.user.role)
      }
    }
  }, [state]);

  const checkUserAuth = async () => {
    try {
      if (localStorage.token) { 
        setAuthToken(localStorage.token); 
        const response = await API.get("/check-auth"); 

        let payload = response.data.data; 
        payload.token = localStorage.token;
        console.log(localStorage.token);
   
        dispatch({ 
           type: "USER_SUCCESS", 
           payload, 
        }); 
     } 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUserAuth();
  }, [])
  
  return (
    <>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<HomeTicket/>} />
        <Route exact path='/my-ticket' element={<MyTicket/>} />
        <Route exact path='/payment' element={<Payment/>}/>
        <Route exact path='/add-ticket' element={<AddTicket/>} />
        <Route exact path='/index-admin' element={<ListTransaction/>} />
      </Routes>
    </>
  );
}

export default App;
