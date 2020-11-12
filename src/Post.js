import axios from './axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import './post.css';



function useFectch(url){
    let [data, setData] = useState(null);
    let [loading, setLoading] = useState(true);
    let history = useHistory();
    useEffect(() =>{
        (async () =>{
            setData(null);
            setLoading(true);
            let res = await axios.get(url);
        
            setData(res.data);
            setLoading(false);
        })();
    }, [url]);

    return [data, loading];
}

function Post(props){

    let { id } = useParams();
    let contentRef = useRef();
    let [data, loading] = useFectch('/post/' + id);
    let history = useHistory();
    
    async function setComment(e){
        e.preventDefault();
        let res = await axios.post('/comment', {
            postId: id.slice(1, id.length),
            content: contentRef.current.value
        });
        if(res.data.code == -1){
            alert(res.data.msg);
        }else{
            history.go('/post'+id);
        }
    }
    async function delComment(commentid){
        window.confirm('确认删除?');
        
        let res = await axios.delete(`/comment/${commentid}`);
        if(res.data.code == -1){
            alert(res.data.msg);

        }else{
            history.go('/post'+id);
        }
    }

    function calcDate(dateString){
        let timestamp = Date.parse(new Date(dateString)) / 1000;
        let nowstamp = Date.parse(new Date()) / 1000;
        let ans = '';
        let tmp = nowstamp - timestamp;
        let day = Math.floor(tmp / 3600 / 24);
        let hours = Math.floor((tmp - day * 3600 * 24) / 3600);
        let minute = Math.floor((tmp - day * 3600 * 24 - hours * 3600) / 60);
        if(day > 30) ans = dateString.split('T')[0];
        else {
            if(day != 0)
                ans = `${day}天${hours}小时${minute}分钟前`;
            else if(hours != 0) ans = `${hours}小时${minute}分钟前`;
            else ans = `${minute}分钟前`;
        }

        return ans;
    }
    if(loading){
        return null;
    }else{
        
        return(
            <div className='Post'>
                <section className='postDetail'>
                    <h2>{ data.post.title }</h2>
                    <div className='postUser'>
                        <span>{data.post.name} · { calcDate(data.post.createAt)}</span>
                    </div>
                    <div className='content'>
                        { data.post.content }
                    </div>

                </section>
                <section className='postComment'>
                    <div>{ data.comments.length}条回复</div>
                    <ul className='commentDetail'>
                    {
                        data.comments.map(it =>{
                            return <li key={it.id}>
                                <img src={it.avatar}/>
                                <div>
                                    <span>{it.name} · {calcDate(it.createAt)}</span>
                                    {
                                        props.onLogin && props.userInfo.rowid == it.userId &&
                                        <button onClick={() => { delComment(it.id) }}>删除</button>
                                    }
                                    <div>{it.content}</div>
                                </div>
                                
                            </li>;
                        })
                    }
                    </ul>
                </section>
                {
                    props.onLogin &&
                    <section className = 'newComment'>
                        <div>添加一条新回复</div>
                        <form onSubmit={setComment}>
                            <textarea ref={contentRef}></textarea>
                            <button>回复</button>
                        </form>
                    </section>
                }
               
                
            </div>
        )
    }

    
}

export default Post;