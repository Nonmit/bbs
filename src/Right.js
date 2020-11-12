import React from 'react'
import { Link } from 'react-router-dom'

function Right(props){
    //console.log(props);
    return(
        
        <div className='Right'>
            {
                props.loginState == false ?
                <div className='userPanel'>
                    <p>V2EX = way to explore</p>
                    <p>V2EX 是一个关于分享和探索的地方</p>
                    <p><button>现在注册</button></p>
                    <p>已注册用户请<Link to = '/login'>登陆</Link></p>
                </div>
                :
                <div className='loginPanel'>
                    <section>
                        <div><img src={props.userInfo.avatar}></img></div>
                        <span>
                            {props.userInfo.name}
                        </span>
                    </section>
                    <div className='createTheme'><Link to ='/newitem'>创作新主题</Link></div>
                    <p>0条未读提示</p>
                </div>
            }
            
            
            <div className='hotTheme'>
                <p>今日热议主题</p>
            </div>
            <div className='hotNode'>
                <p>最热节点</p>
            </div>
            <div className='newNode'>
                <p>最近新增节点</p>
            </div>
            <div className='situation'>
                <p>社区运行状况</p>
            </div>
        </div>
    )
}

export default Right