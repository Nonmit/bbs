import React ,{ useEffect, useRef, useState }from 'react';
import axios from './axios';
import { useHistory } from 'react-router-dom';

import './newItem.css';

function NewItem(){
    let titleRef = useRef();
    let contentRef = useRef();
    let categoryRef = useRef();
    let history = useHistory();
    async function newPost(e){

        e.preventDefault();
        if(!titleRef.current.value || !contentRef.current.value || !categoryRef.current.value){
            alert('发帖失败');
            return;
        }
        let res = await axios.post('/post',{
            title:titleRef.current.value,
            content: contentRef.current.value,
            category:categoryRef.current.value
        });
        if(res.data.code == -1){
            alert(res.data.msg);
        }else{
            console.log('这里执行过了');
            history.push('/');
            history.go(0);
        }
    }

    return (
        <div className='NewItem'>
            <form onSubmit={newPost}>
                <div>
                    <p>主题标题</p>
                    <input type='text' ref={titleRef} placeholder='请输入主题标题'/>
                </div>
                <div>
                    <p>正文</p>
                    <textarea ref={contentRef}>

                    </textarea><br/>
                </div>
                <div>
                    <select type='text' ref={categoryRef}>
                        <option selected="selected" disabled="disabled" value=''>请选择一个节点</option>
                        <option value='技术'>技术</option>
                        <option value='创意'>创意</option>
                        <option value='好玩'>好玩</option>
                        <option value='Apple'>Apple</option>
                        <option value='酷工作'>酷工作</option>
                        <option value='交易'>交易</option>
                        <option value='城市'>城市</option>
                    </select>
                </div> 
                <button>发布主题</button>
            </form>
        </div>
    )
}


export default NewItem;
