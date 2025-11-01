import React,{useState,useContext,useEffect} from 'react';
import '../Css/profileHost.css';
import {noteContextSo} from './Notestate'

const ProfileHost = () => {
  const {profileHost,setProfileHost}=useContext(noteContextSo);
  const [toshowinMe,setToShowInMe]=useState();
  useEffect(()=>{
  setToShowInMe(profileHost);
  setProfileHost(null);
  console.log("removed");
  },[])
  
  return (toshowinMe &&
    <div className="host-profile-wrapper">
      {/* Left Side - Header Section */}
      <div className="host-profile-header">
        <div className="profile-background-gradient"></div>
        <div className="profile-content">
          <div>
            <div className="profile-avatar-section">
              <div className="avatar-circle">
                <span className="avatar-icon">👤</span>
              </div>
              <div className="verified-badge">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
            </div>
            <div className="profile-details">
              <h1 className="host-name">{toshowinMe.name} </h1>
              <p className="host-email">{toshowinMe.email}</p>
              <div className="member-since">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Member since January 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Stats and Account Info */}
      <div className="host-right-side">
        {/* Stats Section */}
        <div className="host-stats-section">
          <h2 className="section-title">Your Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card posted-homes">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
              </div>
              <div className="stat-info">
                <div className="stat-number">0</div>
                <div className="stat-label">Posted Homes</div>
              </div>
            </div>

            <div className="stat-card sold-homes">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div className="stat-info">
                <div className="stat-number">{toshowinMe.MyPostedHomes.length}</div>
                <div className="stat-label">Sold Homes</div>
              </div>
            </div>

            <div className="stat-card total-earnings">
              <div className="stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div className="stat-info">
                <div className="stat-number">$0</div>
                <div className="stat-label">Total Earnings</div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Info Section */}
        <div className="host-account-section">
          <h2 className="section-title">Account Information</h2>
          <div className="account-grid">
            <div className="info-card">
              <div className="info-label">Full Name</div>
              <div className="info-value">Host Name</div>
            </div>
            <div className="info-card">
              <div className="info-label">Email Address</div>
              <div className="info-value">host@email.com</div>
            </div>
            <div className="info-card">
              <div className="info-label">Phone Number</div>
              <div className="info-value">+1 234 567 8900</div>
            </div>
            <div className="info-card">
              <div className="info-label">Account Status</div>
              <div className="info-value status-active">
                <span className="status-dot"></span>
                Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHost;