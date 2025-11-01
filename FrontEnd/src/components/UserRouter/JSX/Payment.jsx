import React ,{useEffect,useState,useContext}from 'react';
import {useNavigate} from 'react-router-dom';
import '../Css/Payment.css';
import {noteContext} from './NoteState/NoteState'
import API_BASE_URL from '../../../config'

const Payment = () => {
    const Navigate=useNavigate();
    const [home,setHome]=useState();
    const {date}=useContext(noteContext);
  useEffect(()=>{
    const goAndFetch=async ()=>{
    const url=`${API_BASE_URL}/user/GetPersonal`;
    const id=localStorage.getItem('home').toString();
    console.log("Id is this ",id)
    const reponse=await fetch(url,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({id:id}),
      credentials:"include"
    })
    const res=await reponse.json();
    setHome(()=>{
      const updated=res.mesg;
      return updated;
    })
    console.log(res.mesg);
      }
      goAndFetch();
  },[])


    const BookSure=async (e)=>{
        e.preventDefault();
    const BookFinal=localStorage.getItem('home');
    const url = `${API_BASE_URL}/user/homeAddBooked/${BookFinal}`; 
    console.log(url);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({FirstDate:date.FirstDate,SecondDate:date.SecondDate}),
        credentials: "include"});
      const res = await response.json();
      if(res.message){
      console.log(res.message);
    }
    else{
      console.log(res);
    }
      
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
    Navigate("/home");
    }
    const ToChnagePhoto=(e)=>{
      const {value}=e.currentTarget;
      document.getElementById('MainPhoto').src=value;
    }
  return (
    (home && <div className="payment-page">
      <div className="payment-container">
        <div className="payment-header">
          <div className="header-icon"></div>
          <h1 className="payment-title">Complete Your Payment</h1>
          <p className="payment-subtitle">Scan the QR code to pay securely via UPI</p>
        </div>

        <div className="scanner-section">
          <div className="scanner-card">
            <div className="scanner-glow"></div>
            <img 
              src={home.photo[0].GooglePay} 
              alt="Payment QR Code" 
              className="scanner-image"
              id="MainPhoto"
            />
            <div className="scanner-border"></div>
          </div>
          
          <div className="payment-info">
            <div className="info-item">
              <span className="info-icon"></span>
              <span className="info-text">Open any UPI app</span>
            </div>
            <div className="info-item">
              <span className="info-icon"></span>
              <span className="info-text">Scan the QR code</span>
            </div>
            <div className="info-item">
              <span className="info-icon"></span>
              <span className="info-text">Complete payment</span>
            </div>
          </div>
        </div>

        <div className="payment-options-section">
          <h3 className="payment-options-title">?? Choose Your Payment Method</h3>
          <div className="payment-options-row">
            <button className="payment-option-btn" value={home.photo[0].PhonePe}
            onClick={ToChnagePhoto}>
              <span className="payment-icon">??</span>
              <span className="payment-name">PhonePe</span>
            </button>
            <button className="payment-option-btn" value={home.photo[0].Paytm}
            onClick={ToChnagePhoto}>
              <span className="payment-icon">??</span>
              <span className="payment-name">Paytm</span>
            </button>
            <button className="payment-option-btn" value={home.photo[0].GooglePay}
            onClick={ToChnagePhoto}>
              <span className="payment-icon">??</span>
              <span className="payment-name">Google Pay</span>
            </button>
          </div>
        </div>

        <div className="security-info">
          <span className="security-icon">??</span>
          <span className="security-text">100% Secure Payment</span>
        </div>

        <div className="payment-confirmation">
          <p className="confirmation-label">Is your Payment done?</p>
          <div className="confirmation-buttons">
            <button className="btn-yes" onClick={BookSure}>Yes</button>
            <button className="btn-no" onClick={(e)=>{Navigate("/HomePersonal");console.log("Home Is Home")}}>No</button>
          </div>
        </div>
      </div>
    </div>)
  );
};

export default Payment;
