import React, { useEffect, useRef, useState } from 'react'
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
import{Link} from 'react-router-dom'

function Left(props){

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

    let [status, setStatus] = useState('技术');
    let choice = useRef();
    let [node, setNode] = useState(null);
    useEffect(()=>{
        setNode(choice.current);
    },[])
    
    function changeStatus(e){
        //console.log(choice.current);
        console.log(node);
        if(e.target.nodeName == 'LI'){
            
            node.classList = '';
            let a = e.target.getAttribute("data-status");
            if(a != '全部'){
                setStatus(a);
            }
            e.target.classList.add('active');
            setNode(e.target);
        }
    }
    console.log(props.data);

    return(
        <div className='Left'>
            <div className='leftNav'>
                <ul onClick={changeStatus}>
                    <li data-status = '技术' className = 'active' ref={choice}>技术</li>
                    <li data-status = '创意'>创意</li>
                    <li data-status = '好玩'>好玩</li>
                    <li data-status = 'Apple'>Apple</li>
                    <li data-status = '酷工作'>酷工作</li>
                    <li data-status = '交易'>交易</li>
                    <li data-status = '城市'>城市</li>
                    <li data-status = '问与答'>问与答</li>
                    <li data-status = '最热'>最热</li>
                    <li data-status = '全部'>全部</li>
                    <li data-status = 'R2'>R2</li>
                </ul>
            </div>

            <ul className='detialPost'>
            {
                props.data &&
                props.data.filter(it => it.category == status).map(it=>{
                    return(
                        <li key={it.id}>
                            <img src= {it.avatar}/>
                            <div>
                                <h3><Link to={'/post:' + it.id }>{it.title}</Link></h3>
                                <span className='classification'><Link to=''>{it.category}</Link></span>
                                <span className='person'>{it.name}</span>
                                <span>{ calcDate(it.createAt)}</span>
                            </div>
                        </li>

                    )
                })
            }
            </ul>

        </div>
    )
}




export default Left