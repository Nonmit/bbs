import axios from './axios';
import React from 'react'
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './register.css'
import { Form, Input, Button, Checkbox } from 'antd';
import Axios from 'axios'


function Register(props) {

    let usernameRef = useRef();
    let passwordRef = useRef();
    let comfirmRef = useRef();
    let avatarRef = useRef();
    let emailRef = useRef();
    let history = useHistory();
    
    
    
    async function registerUser(e) {
        e.preventDefault();
        console.log(avatarRef.current.files[0]);
        if(!(usernameRef.current.value && passwordRef.current.value && comfirmRef.current.value && emailRef.current.value && avatarRef.current.value)){
            alert('选项不能为空');
            return;
        }

        if(passwordRef.current.value != comfirmRef.current.value){
            alert('两次输入密码不相同');
            passwordRef.current.value = '';
            comfirmRef.current.value = '';
            return;
        }
        let formAxios = Axios.create({
            withCredentials: true,
            baseURL: 'http://localhost:3001/',
            headers:{"Content-Type":"multipart/form-data"}
        })
        let data = new FormData();
        data.append('avatar', avatarRef.current.files[0]);
        data.append('name', usernameRef.current.value);
        data.append('password', passwordRef.current.value);
        data.append('email', emailRef.current.value);
        let res = await formAxios.post('/register', data);
        if(res.data.code == -1){
            alert('注册失败');
        }else{
            history.push('/');
        }
    }
    return (
        <div className='loginPanel3'>
            <form onSubmit={registerUser} encType='multipart/form-data'>
                
                <p>登陆</p>
                <div className='username'><span>用户名</span><input type='text' ref={usernameRef} placeholder='用户名或电子邮箱'/></div>
                <div className='password'><span>密码</span><input type='text' ref={passwordRef} /></div>
                <div className='comfirm'><span>确认密码</span><input type='text' ref={comfirmRef} /></div>
                <div className='email'><span>邮箱</span><input type='text' ref={emailRef} /></div>
                <div className='avatar'><span>头像</span><input type='file' name='avatar' ref={avatarRef}/></div>
                <div>
                    <span></span>
                    <button type='submit'>注册</button>
                    <button type='reset'>重置</button>
                </div>
            </form>
        </div>
    )
}

export default Register;