import axios from './axios';
import React from 'react'
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './register.css'
import Axios from 'axios'
import { message } from 'antd';


function Register(props) {

    let usernameRef = useRef();
    let passwordRef = useRef();
    let comfirmRef = useRef();
    let avatarRef = useRef();
    let emailRef = useRef();
    let history = useHistory();

    async function registerUser(e) {
        e.preventDefault();
        //console.log(avatarRef.current.files[0]);
        if (!(usernameRef.current.value && passwordRef.current.value && comfirmRef.current.value && emailRef.current.value && avatarRef.current.value)) {
            message.error({
                content : '所有选项不能为空~',
                style:{
                    marginTop:'30vh',
                }
            })
            return;
        }

        if (passwordRef.current.value != comfirmRef.current.value) {
            message.error({
                content : '两次密码不相同~',
                style:{
                    marginTop:'30vh',
                }
            })
            passwordRef.current.value = '';
            comfirmRef.current.value = '';
            return;
        }
        if(avatarRef.current.files[0].size > 64 * 1024){
            message.error({
                content : '图片不可超过64k~',
                style:{
                    marginTop:'30vh',
                }
            })
            return;
        }
        let formAxios = Axios.create({
            withCredentials: true,
            baseURL: 'http://101.37.168.123:8013/api/',
            headers: { "Content-Type": "multipart/form-data" }
        })
        // let formAxios = Axios.create({
        //     withCredentials: true,
        //     baseURL: 'http://localhost:3002/',
        //     headers: { "Content-Type": "multipart/form-data" }
        // })
        let data = new FormData();
        data.append('avatar', avatarRef.current.files[0]);
        data.append('name', usernameRef.current.value);
        data.append('password', passwordRef.current.value);
        data.append('email', emailRef.current.value);
        let res = await formAxios.post('/register', data);
        if (res.data.code == -1) {
            message.info({
                content: '注册失败~' + res.data.msg,
                style: {
                    marginTop: '30vh',
                }

            });
        } else {
            history.push('/');
        }
    }
    function changeName(){
        let avatar = avatarRef.current;
        let node = avatarRef.current.nextSibling;
        let name = node.nextSibling
        if(avatar.value){
            if(avatar.files[0].size > 64 * 1024){
                message.error({
                    content : '图片不可超过64k~',
                    style:{
                        marginTop:'30vh',
                    }
                })
                avatarRef.current.value = null;
                return;
            }
            name.textContent = `${'...' + avatar.value.slice(-15)}`;
        }
        else name.textContent = '选择错误';
    }

    return (
        <div className='container'>
            <div className='loginPanel3'>
                <form onSubmit={registerUser} encType='multipart/form-data'>

                    <p>注册</p>
                    <div className='username'><span>用户名</span><input type='text' ref={usernameRef}  maxLength='20'/></div>
                    <div className='password'><span>密码</span><input type='password' ref={passwordRef} maxLength='20' minLength='6'/></div>
                    <div className='comfirm'><span>确认密码</span><input type='password' ref={comfirmRef} maxLength='20' minLength='6'/></div>
                    <div className='email'><span>邮箱</span><input type='email' ref={emailRef} /></div>
                    <div className='avatar'><span>头像</span><input type='file' name='avatar' ref={avatarRef} id='avatarFile' onChange={changeName}/><label htmlFor='avatarFile'>选择文件</label><span></span></div>
                    <div>
                        <button type='submit' className='buttonStyle'>注册</button>
                        <button type='reset' className='buttonStyle'>重置</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;