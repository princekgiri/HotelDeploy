import React,{useContext,useState,useEffect,useRef} from 'react';
import {useNavigate} from 'react-router-dom'
import '../Css/HomePersonal.css';
import {noteContext} from './NoteState/NoteState'
import Alert from './Alert'
// import {go} from './HomeArrayList'
const HomePersonal = () => {
  const Navigate=useNavigate();

  const {showPersonal,setShowpersonal,showAlert,setAlert,alert,date,setDate}=useContext(noteContext);
  const [review,setReview]=useState("");
  const [showReplyBox, setShowReplyBox] = useState({});
  const [showReplies, setShowReplies] = useState({});
  
  if (showPersonal.home===""){
  console.log("Show persoanl is ",showPersonal.home);
}

  const toggleReply = (index) => {
    console.log("Index is ",index);
    setShowReplyBox(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
    console.log("showReplyBox is this ",showReplyBox);
  }
  
  const toggleShowReplies = (index) => {
    setShowReplies(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  }
  
const [reply,setReply]=useState({reply:''});
  const reviewChange=(e)=>{
    e.preventDefault();
    const {value,name}=e.target;
    console.log(name,value);
    setReview(()=>{
      const updated={...review,[name]:value};
      console.log(updated);  
      return updated;
    })
  }
useEffect(() => {
  // go.current=false;
  console.log("useEffect running...", showPersonal.home);
  const HomeId=localStorage.getItem('home');
  const fetchHome = async () => {
    if(!showPersonal.home || Object.keys(showPersonal.home).length===0){
      const url = "http://localhost:3000/user/GetHome";
      const response = await fetch(url, {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({id:HomeId}),
        credentials: "include"
      });
      const res = await response.json({id:HomeId});
      setShowpersonal((prev)=>{
        const updated={...prev,home:res.home}
        return updated
      })
    }
  };
  fetchHome();
}, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(showPersonal._id);
    console.log(review);
    const url = `http://localhost:3000/user/home/${showPersonal.home._id}`; 
    console.log(url);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(review)
      });
      const res = await response.json();
      if(res.updated){
      console.log(res);
    }
    else{
      console.log(res);
    }
      
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
    window.location.reload(true);
  }
  const [priceTotal,setPriceTotal]=useState(0);
  const Reserve=async ()=>{
    if((new Date(date.SecondDate).getTime()-new Date(date.FirstDate).getTime())>0){
      localStorage.setItem('FirstDate',date.FirstDate);
      localStorage.setItem('SecondDate',date.SecondDate);
      localStorage.setItem('priceTotal',priceTotal);
      Navigate("/payment");
    }
    else{
      setAlert((prev)=>{
        const updated={
        showAlert:"true",
        type:'error',
        message:'Please Select Both Options or Select Date 2 Ahead than Day 1'}
        return updated;
      })
    }
  }
  const ToChange=(e)=>{
    console.log(e.target.src);
    document.getElementById('ToChnage').src=e.target.src;
    document.getElementById('ToChnage').style.display = 'block';
    document.getElementById('VideoToChange').style.display = 'none';
  }
  
  const ToChangeVideo=(e)=>{
    console.log(e.target.src);
    document.getElementById('VideoToChange').src=e.target.src;
    document.getElementById('VideoToChange').style.display = 'block';
    document.getElementById('ToChnage').style.display = 'none';
  }
  const Addcomment=(email,id,replyId)=>{
    console.log("Reply is being added ",email);
    console.log("Show is tthis now ",id);
    const url = "http://localhost:3000/user/MessagesPost";
    const localEmail=localStorage.getItem('email');
    const MessagePo=async (localEmail,id,replyId)=>{
      try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({email:localEmail,reply:reply.reply,id:id,replyId:replyId})
      });
      const res = await response.json();
      window.location.reload(true);
      console.log(res.msg);
    }
    catch(err){
      console.log(err);
    }
  }
  MessagePo(email,id,replyId);
}

  const chnageComment=(e)=>{
  const {name,value}=e.target;
  setReply((prev)=>{
    const updated={...prev[name],[name]:value};
    return updated;
  }
  )
  }
  const ToMessage=()=>{
    Navigate("/PersonalMessage");
  }
  const PrintDateFirst=(e)=>{
    const {name,value}=e.target;
    setAlert((prev)=>{
        const updated={
        showAlert:"false",
        type:'Success',
        message:'Now check The Second Date '}
        return updated;
      })
    setDate((prev)=>{
      const updated={...prev,[name]:value};
      return updated;
    })
  }
  
  const PrintDateSecond=(e)=>{
    if(date.FirstDate==''){
      setAlert((prev)=>{
        const updated={
        showAlert:"true",
        type:'error',
        message:'Please pick the second date after First date not Before it '}
        return updated;
      })
    }
    else{
      const {name,value}=e.target;
    setDate((prev)=>{
      console.log("So Here is first date ",date.FirstDate);
      const updated={...prev,[name]:value};
      if(localStorage.getItem('priceTotal')) localStorage.removeItem('priceTotal');
      setPriceTotal((new Date(updated.SecondDate).getTime()-new Date(updated.FirstDate).getTime())/(1000 * 60 * 60 * 24))
      return updated;
    })
    }
    
  }
  return (
    (showPersonal.home && <div className="home-detail-page">
      {alert.showAlert=="true" && <Alert/>}
      {console.log(alert.showAlert)}
      <header className="hero">
        <div className="hero-media">
          <img src={showPersonal.home.photo[0].housePhotos[0]} id="ToChnage"/>
          <video controls id="VideoToChange" style={{display: 'none'}}></video>
          <div className="hero-gallery">
            <img src= {showPersonal.home.photo[0].housePhotos[1]} alt="thumb1" onClick={ToChange}/>
            <img src={showPersonal.home.photo[0].housePhotos[2]} alt="thumb2" onClick={ToChange}/>
            <img src={showPersonal.home.photo[0].housePhotos[0]} alt="thumb3" onClick={ToChange}/>
            <video src={showPersonal.home.photo[0].houseVideos[0]} className="video-thumbnail" onClick={ToChangeVideo}></video>
            <video src={showPersonal.home.photo[0].houseVideos[1]} className="video-thumbnail" onClick={ToChangeVideo}></video>
          </div>
        </div>

        <div className="hero-info">
          <h1 className="home-title">{showPersonal.home.name}</h1>

          <div className="home-meta">
            <div className="price">$249 <span className="per-night">/ night</span></div>
            <div className="rating">4.8 <span>★</span> <span className="reviews">(256)</span></div>
          </div>

          <div className="hero-actions">
            <button type="button" className="btn primary" onClick={Reserve}>Book Now</button>
            <button type="button" className="btn outline">Save</button>
          </div>
        </div>
      </header>

      <main className="content">
        <section className="overview">
          <h2>Overview</h2>
          <p>
            Nestled on the riverbank, Grand Riverside Hotel offers a luxurious stay with panoramic views,
            finely appointed rooms, and exceptional service. Enjoy on-site dining, spa facilities, and
            an outdoor pool with lounge area.
          </p>

          <div className="amenities">
            {showPersonal.home.comfort.map((item,index)=>{
              return(
                <div className="amenity" key={index}>{item}</div>
              )
            })}
          </div>
        </section>

        <aside className="booking-card">
          <div className="card-price">
            <div className="amount">$249</div>
            <div className="label">per night</div>
          </div>
          <div className="card-details">
            <p className="small">Check-in</p>
            <input type="date" onChange={PrintDateFirst} name="FirstDate" style={{"color":"White"}} value={date.FirstDate || localStorage.getItem('FirstDate')}/>
            <p className="small">Check-out</p>
            <input type="date" onChange={PrintDateSecond} name="SecondDate" style={{"color":"White"}} value={date.SecondDate || localStorage.getItem('SecondDate')}/>
            {(priceTotal!=0 || localStorage.getItem('priceTotal')) && <p style={{"color":"White"}}>So Your Total Days Is {priceTotal || localStorage.getItem('priceTotal')} and total Bill is {(priceTotal || localStorage.getItem('priceTotal')) *249}</p>}
          </div>
        </aside>

        <section className="reviews">
          <h2>What guests say</h2>
          <div className="review-list">
            {showPersonal.home.review.map((item, index) => {
              // Get initials from name
              {console.log(item)}
              const initials = item.name
                .split(" ")
                .map(word => word.charAt(0).toUpperCase())
                .join("");
              
              return (
                (item.name && <div className="review" key={index}>
                  <div className="review-header">
                    <div className="review-avatar">{initials}</div>
                    <div className="review-meta">
                      <strong className="review-name">
                        {item.name.split(" ").map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(" ")}
                      </strong>
                      <span className="review-date">2 days ago</span>
                    </div>
                    <div className="review-score">
                      <span className="star">★</span>
                      <span className="score-value">4.8</span>
                    </div>
                  </div>
                  <div className="review-content">
                    <p>{item.review}</p>
                  </div>
                  <div className="review-footer">
                    <button type="button" className="review-action">👍 Helpful</button>
                    <button type="button" className="review-action" onClick={()=>toggleReply(index)}>💬 Reply</button>
                  </div>
                  
                  {item.replies && item.replies.length > 0 && (
                    <div className="show-replies-container">
                      <button type="button" className="show-replies-btn" onClick={() => toggleShowReplies(index)}>
                        {showReplies[index] ? '▼' : '▶'} Show Replies ({item.replies.length})
                      </button>
                    </div>
                  )}
                  
                  {showReplies[index] && (
                    <div className="replies-list">
                      {item.replies.map((replyItem, replyIndex) => (
                        <div className="reply-item" key={replyIndex}>
                          <div className="reply-avatar">
                            {replyItem.email.charAt(0).toUpperCase()}
                          </div>
                          <div className="reply-content-wrapper">
                            <div className="reply-header">
                              <span className="reply-email">{replyItem.email}</span>
                              <span className="reply-time">Just now</span>
                            </div>
                            <div className="reply-text">
                              {replyItem.reply}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {showReplyBox[index] && (
                    <div className="reply-section">
                      <textarea className="reply-input" placeholder="Write a reply..." value={reply.reply} name="reply" onChange={chnageComment} rows="2"></textarea>
                      <button type="button" className="reply-submit-btn" onClick={()=>{Addcomment(showPersonal.user.email,showPersonal.home._id,item._id)}} >Send</button>
                    </div>
                  )}
                </div>)
              );
            })}
          </div>
        </section>
        
        <section className="leave-review-section">
          <h2>Leave a review</h2>
          <div className="leave-review">
            <textarea placeholder="Share your experience..." rows="5" name="review" value={review.review} onChange={reviewChange}></textarea>
            <div className="leave-actions">
              <button type="button" className="btn outline">Cancel</button>
              <button type="submit" className="btn primary" onClick={onSubmit}>Post review</button>
            </div>
          </div>

        </section>
        
        <section className="message-owner-section">
          <div className="message-owner-card">
            <div className="message-owner-icon">💬</div>
            <div className="message-owner-content">
              <h3 className="message-owner-title">Contact Property Owner</h3>
              <p className="message-owner-name">{showPersonal.home.Ownername}</p>
            </div>
            <button type="button" className="message-owner-btn" onClick={ToMessage}>Send Message</button>
          </div>
        </section>
      </main>
    </div>)
  );
}

export default HomePersonal;