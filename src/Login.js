import axios from './axios';
import React from 'react'
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './login.css'
import { Form, Input, Button, Checkbox } from 'antd';



function Login(props) {

    let usernameRef = useRef();
    let passwordRef = useRef();
    let history = useHistory();

    //登陆操作
    async function submit(e) {
        e.preventDefault();
        let res = await axios.post('/login', {
            name: usernameRef.current.value,
            password: passwordRef.current.value
        })
        //console.log(res.data);
        if (res.data.code == 0) {
            props.onLogin && props.onLogin(true, usernameRef.current.value, res.data.user);
            history.push('/');
        } else {
            alert(res.data.msg);
        }
    }
    return (
        <div className='loginPanel2'>
            <form onSubmit={submit}>
                
                <p>登陆</p>
                <div className='username'><span>用户名</span><input type='text' ref={usernameRef} placeholder='用户名或电子邮箱'/></div>
                <div className='password'><span>密码</span><input type='text' ref={passwordRef} /></div>
                <div>
                    <span></span>
                    <button type='submit'>登录</button>
                    <button type='reset'>重置</button>
                </div>
            </form>
            <div className='otherLogin'>
                <p>其他登陆方式</p>
            </div>
        </div>
    )
}

export default Login;