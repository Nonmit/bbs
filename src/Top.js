import React from 'react';
import { Link } from 'react-router-dom';
import './Top.css'
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

function Top(props){

    let history = useHistory();
    async function exit(){
        let res = await Axios.get('/logout');
        props.onLogin(false, null);
        history.push('/')
    }
    return(
        <div className='Top' id='top'>
            <div className='content'>
                <div className='Logo'></div>
                <div className='search'>
                    <svg t="1602661817312" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1171" width="200" height="200"><path d="M1008.583267 1008.625931a51.879748 51.879748 0 0 1-73.766517 0l-151.458147-151.500811a52.135734 52.135734 0 1 1 73.723853-73.723853l151.500811 151.458147a51.922413 51.922413 0 0 1 0 73.766517z m-562.016386-115.49217c-123.299731 0-234.909453-49.959856-315.715575-130.765978l10.836724 21.076148C54.140955 697.603426 0 569.909276 0 446.566881 0 199.924754 199.924754 0 446.566881 0c246.642126 0 446.609545 199.924754 446.609544 446.566881 0 123.342395-50.002521 234.994782-130.851306 315.800902a445.15896 445.15896 0 0 1-315.758238 130.765978zM447.974801 85.328534a362.646268 362.646268 0 1 0 0.042665 725.335199A362.646268 362.646268 0 0 0 447.974801 85.328534z" p-id="1172" fill="#cdcdcd"></path></svg>
                    <input type='text'></input>
                </div>
                <div className='tools'>               
                    { 
                        props.loginState == false ?     
                        <ul>
                            <li>< Link to='/login'>登陆</Link></li>
                            <li>< Link to='/register'>注册</Link></li>
                            <li>< Link to='/'>首页</Link></li>
                        </ul>
                        :
                        <ul>
                            <li><button onClick={exit}> 登出</button></li>
                            <li>设置</li>
                            <li>{props.username}</li>
                            <li>< Link to='/'>首页</Link></li>
                        </ul>

                    }
                </div>
            </div>
        </div>
    )
}

export default Top