import React ,{ useEffect, useRef, useState }from 'react';
import axios from './axios';
import { useHistory } from 'react-router-dom';

import './newItem.css';
import { message } from 'antd';





function NewItem(){
    let titleRef = useRef();
    let contentRef = useRef();
    let categoryRef = useRef();
    let history = useHistory();
    async function newPost(e){

        e.preventDefault();
        if(!titleRef.current.value || !contentRef.current.value || !categoryRef.current.value){
            message.info({
                content:'所有字段不能为空~', 
                style:{
                    marginTop:'30vh',
                }
        
            });
            return;
        }
        let res = await axios.post('/post',{
            title:titleRef.current.value.toString(),
            content: contentRef.current.value.toString(),
            category:categoryRef.current.value.toString()
        });
        if(res.data.code == -1){
            alert(res.data.msg);
        }else{
            //console.log('这里执行过了');
            history.push('/');
            history.go(0);
        }
    }

    return (
        <div className='container2'>
            <div className='NewItem'>
                <form onSubmit={newPost}>
                    <div>
                        <p>主题标题</p>
                        <input type='text' ref={titleRef} placeholder='请输入主题标题' maxLength='25' minLength='5'/>
                    </div>
                    <div>
                        <p>正文</p>
                        <textarea ref={contentRef} maxLength='250'>

                        </textarea><br/>
                    </div>
                    <div>
                        <select type='text' ref={categoryRef}>
                            <option disabled="disabled" value='' defaultValue>请选择一个节点</option>
                            <option value='七嘴八舌'>七嘴八舌</option>
                            <option value='日常记录'>日常记录</option>
                            <option value='经验分享'>经验分享</option>
                            <option value='技术总结'>技术总结</option>
                        </select>
                    </div> 
                    <button className='buttonStyle'>发布主题</button>
                </form>
            </div>
        </div>
    )
}


export default NewItem;
