import {useContext,useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'  
import {noteContext} from './NoteState/NoteState'
import '../Css/TotalMessage.css'
import useBackend from './FunctionToBackend'

const TotalMessage=()=>{
    const Navigate=useNavigate();
    const {totalmessages,fetchMessages}=useBackend();
// const {PersonalFetchAllMEssage}=useBackend();
useEffect(()=>{
fetchMessages();
},[])    
const OpenChat=async (e,Ownername,Owneremail,useremail,Username)=>{
localStorage.setItem('useremailToFetch',useremail);
localStorage.setItem('OwnernameToShow',Ownername);
localStorage.setItem('OwnerEmailToFetch',Owneremail);
localStorage.setItem('Username',Username);
Navigate("/PersonalMessage");
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
                            {item.Owner.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="chat-content">
                            <div className="chat-top">
                                <h3 className="chat-name">{item.Owner.name}</h3>
                            </div>
                            <div className="chat-bottom">
                                <p className="chat-last-message">Click to view messages</p>
                                <div className="chat-badge">{item.User.newRead-item.User.read}</div>
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
export default TotalMessage