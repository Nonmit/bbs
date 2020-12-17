import React from 'react'
import { Link } from 'react-router-dom'

function Right(props){
    return(
        <div className='Right'>
            {
                props.loginState == false ?
                <div className='userPanel'>
                    <p>Kawa Kawa</p>
                    <p>Believe in yourself.</p>
                    <p><button className='buttonStyle'>现在注册</button></p>
                    <p>已注册用户请<Link to = '/login'>登陆</Link></p>
                    <div><Link to ='/login'></Link></div>
                </div>
                :
                <div className='loginPanel'>
                    <section>
                        <div><img src={props.userInfo && props.userInfo.avatar}></img></div>
                        <span>
                            { props.userInfo && props.userInfo.name}
                        </span>
                    </section>
                    <div className='createTheme'><Link to ='/newitem'>创作新主题</Link></div>
                    <section className='loginMin'>
                        <Link to='/newitem'><img src={ props.userInfo && props.userInfo.avatar}></img></Link>
                    </section>
                </div>
            }
            <div className='toTop'>
                <a href='#top'></a>
            </div>
            
        </div>
    )
}

export default Right