import React, { useState, useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import GenerateCard from './components/GenerateCard';
import UserContext from './context/UserContext';
import Axios from 'axios';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenRes = await Axios.post(
        'http://localhost:5000/users/tokenIsValid',
        null,
        {
          headers: { 'x-auth-token': token },
        }
      );

      if (tokenRes.data) {
        const userRes = await Axios.get('http://localhost:5000/users/', {
          headers: { 'x-auth-token': token },
        });
      }

      setUserData({
        token,
        user: userRes.data,
      });
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/generate' component={GenerateCard} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
