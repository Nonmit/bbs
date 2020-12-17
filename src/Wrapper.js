import axios from './axios';
import React, { useRef } from 'react';
import Left from './Left'
import Right from './Right'
import './wrapper.css'
import { useHistory } from 'react-router-dom';


function Wrapper(props){
    
    
    return(
        <div>
            <div className='Wrapper'>
                <Left data = {props.indexData}/>
                {/* <Right loginState = {props.loginState} onLogin = {props.onLogin} userInfo = {props.userInfo}/>             */}
            </div>
            
            
        </div>
    )
}

export default Wrapper