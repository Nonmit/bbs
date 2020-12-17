import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Top from './Top';
import Wrapper from './Wrapper';
import Bottom from './Bottom';
import axios from './axios';
import Login from './Login';
import Post from './Post';
import {
  Route,
  Switch,
  useHistory,
  Redirect
} from 'react-router-dom';
import NewItem from './newItem';
import Register from './register';
import Right from './Right';





function App() {

  let [data, getData] = useState(false);
  let [login, setLogin] = useState(false);
  let [userInfo, setUserInfo] = useState({});
  let [name, setName] = useState(null);

  useEffect(() => {
    axios.get('/post')
      .then(value => {
        getData(Object.values(value.data));
      });
    axios.get('/user').then(value => {
      setUserInfo(value.data);
      setName(value.data.name);
      if (value.data.name) {
        setLogin(true);
      }
    });
  }, []);

  function loginSuccess(value, username, info) {
    setLogin(value);
    setName(username);
    setUserInfo(info);
  }

  return (
    <div className="App">
      <Top loginState={login} onLogin={loginSuccess} username={name} />
      <Right loginState={login} onLogin ={loginSuccess} userInfo = {userInfo}/>
      <Switch>
        <Route path='/' exact>
          <Wrapper indexData={data} loginState={login} onLogin={loginSuccess} userInfo={userInfo} />
        </Route>
        <Route path='/login' >
          <Login onLogin={loginSuccess} />
        </Route>
        <Route path='/register' >
          <Register/>
        </Route>
        <Route path='/post:id'>
          <Post onLogin = {login} userInfo = {userInfo}/>
        </Route>
        <Route path='/newitem'>
          <NewItem onLogin = {login}/>
        </Route>
      </Switch>
      <Bottom />
      
    </div>
  );
}

export default App;
