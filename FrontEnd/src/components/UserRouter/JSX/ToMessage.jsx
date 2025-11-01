import React ,{useState,useEffect,useContext,useRef}from 'react';
import '../Css/ToMessage.css';
import useBackend from './FunctionToBackend'
import {noteContext} from './NoteState/NoteState'
const ToMessage = () => {
  const [insideMessage,setInsidMessage]=useState([]);
  const {TOSendToMEssage,PersonalFetchAllMEssage}=useBackend();
    const [message,setMessage]=useState({});
    const change=(e)=>{
        const {name,value}=e.target;
    setMessage((prev)=>{
        const updated={[name]:value}
        return updated;
    })
    }
    const [changed,setChanged]=useState(0);
    useEffect(()=>{
      const fetchBro=async ()=>{
      const useremail=localStorage.getItem('useremailToFetch');
      const Ownername=localStorage.getItem('OwnernameToShow');
      const OwnerEmailToFetch=localStorage.getItem('OwnerEmailToFetch');
      const role=localStorage.getItem('role');
      console.log("Tell me you are runnning",useremail,role,OwnerEmailToFetch,Ownername);
      const gotMsg=await PersonalFetchAllMEssage(Ownername,OwnerEmailToFetch,useremail,role);
      let Inside=[];
      console.log("This sii this ",gotMsg);
      if(typeof gotMsg == "object"){
      console.log("Type of the object ",Object.prototype.toString.call(gotMsg));
      Inside.push(gotMsg);
      setInsidMessage(Inside);
      }
      // setChanged(1);
      }
      fetchBro();
      // console.log("changed.current on UseEffect ",changed.current)
    },[changed])
    const onSubmit=async (e)=>{
      e.preventDefault();
      const OwnerDetails={
        name:localStorage.getItem('OwnernameToShow'),
        read:0,
        newRead:1,
        email:localStorage.getItem('OwnerEmailToFetch'),
      }
      const role=localStorage.getItem('role');
      const UserDetails={
        name:localStorage.getItem('Username'),
        read:0,
        newRead:1,
        email:localStorage.getItem('useremailToFetch'),
      }
      const reply=await TOSendToMEssage(OwnerDetails,UserDetails,message.message,role);
      setChanged(prev=>prev+1);
      // console.log("changed.current in OnSubmit ",changed.current);
      setMessage({message:''});
      console.log(reply);
    }
  return (
    <div className="chat-page">
      <div className="chat-window">
        <div className="chat-header">
          <div className="chat-user-info">
            <div className="chat-avatar">👤</div>
            <div className="chat-user-details">
              <h3 className="chat-user-name">Property Owner</h3>
              <span className="chat-status">Online</span>
            </div>
          </div>
        </div>
        <div className="chat-messages">
          <div className="message-container">
            {insideMessage.length>=1 && insideMessage[0]?.messages?.length > 0 ? insideMessage.map((item,index)=>{
              return(
                <React.Fragment key={index}>
                <div className="messages-thread">
                {item.messages.map((msg, i)=>{
                const isMine = msg.from === "user";
                return (
                  <div className={`msg-row ${isMine ? "mine" : "theirs"}`} key={i}>
                    <span className={`msg-tag ${isMine ? "you" : "landlord"}`}>
                      {isMine ? "You" : "LandLord"}
                    </span>
                    <div className={`msg-bubble ${isMine ? "mine" : "theirs"}`}>
                      <p className="msg-text">{msg.message}</p>
                    </div>
                  </div>
                )
                })}
                </div>
                </React.Fragment>
              )
            })
            :
            <div className="no-messages-chat">
              <div className="no-messages-icon-chat">💬</div>
              <h2 className="no-messages-title-chat">No Messages</h2>
              <p className="no-messages-text-chat">Write something to send messages!</p>
            </div>
            }
          </div>
        </div>
        <div className="chat-input-section">
          <textarea 
            className="chat-input" 
            placeholder="Type your message..."
            rows="1"
            value={message.message}
            name="message"
            onChange={(e)=>{change(e)}}
          ></textarea>
          <button type="button" className="chat-send-btn" onClick={onSubmit}>
            <span>➤</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToMessage;