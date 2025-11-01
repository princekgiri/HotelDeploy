import {useContext,useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'  
import {noteContextSo} from './Notestate'
import '../Css/TotalMessage.css'
import useSend from './FunctionTOBackend'

const TotalMessageHost=()=>{
    const {fetchMessages}=useSend();
    const Navigate=useNavigate();
const  {totalmessages,setTotalmessages}=useContext(noteContextSo);
// const {PersonalFetchAllMEssage}=useBackend();
useEffect(()=>{
fetchMessages();
},[])    
const OpenChat=async (e,Ownername,Owneremail,useremail,Username)=>{
    console.log("So Thsi you see ",Ownername,Owneremail,useremail,Username);
localStorage.setItem('useremailToFetch',useremail);
localStorage.setItem('OwnernameToShow',Ownername);
localStorage.setItem('OwnerEmailToFetch',Owneremail);
localStorage.setItem('Username',Username);
Navigate("/ToMessageHost");
}
return(
    <div className="messages-page">
        <div className="messages-header">
            <h1 className="messages-title">Messages</h1>
            <span className="messages-count">{totalmessages ? totalmessages.length : 0} chats</span>
        </div>
        <div className="messages-list">
            {totalmessages.length>=1?totalmessages.map((item,index)=>{
                return(
                    <button className="chat-card" key={index} onClick={(e)=>{OpenChat(e,item.Owner.name,item.Owner.email,item.User.email,item.User.name)}}>
                        <div className="chat-avatar-circle">
                            {item.User.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="chat-content">
                            <div className="chat-top">
                                <h3 className="chat-name">{item.User.name}</h3>
                                <span className="chat-time">2h ago</span>
                            </div>
                            <div className="chat-bottom">
                                <p className="chat-last-message">Click to view messages</p>
                                <div className="chat-badge">{item.Owner.newRead-item.Owner.read}</div>
                            </div>
                        </div>
                    </button>
                )
            }):<div className="no-messages-container">
                <div className="no-messages-icon">💬</div>
                <h2 className="no-messages-title">No Messages Yet</h2>
                <p className="no-messages-text">Your message inbox is empty. Start a conversation with property owners!</p>
            </div>}
        </div>
    </div>
)

}
export default TotalMessageHost