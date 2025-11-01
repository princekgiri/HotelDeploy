import React,{useState,useEffect,useRef,useContext} from 'react';
import '../Css/profile.css';
import useBackend from './FunctionToBackend'
import {noteContext} from './NoteState/NoteState'
import API_BASE_URL from '../../../config'

const Profile = () => {
    const {profileInfo}=useBackend();
    const {details,setDetails}=useContext(noteContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    console.log(details);
    useEffect(()=>{
        // const getData=async ()=>{
        //     const data=await profileInfo();
        // }
        // getData();
        const AllHomes=async ()=>{
          try {
            const url=`${API_BASE_URL}/user/ToPopuate`;
            const response=await fetch(url,{
              method:"GET",
              credentials:"include"
            })
            
            if (!response.ok) {
              console.log("Not authenticated, skipping profile load");
              return;
            }
            
            const res=await response.json();
            setDetails(()=>{
              const updated={favourites:res.favourites,BookedFinal:res.BookedFinal,user:res.user};
              console.log("User is ",updated.user);
              return updated;
            })
          } catch (error) {
            console.log("Error loading profile:", error);
          }
        }
        AllHomes();
    },[]);
    //logic goes from here
    const Delete=async (e)=>{
      e.preventDefault();
      const HomeId=localStorage.getItem('home');
      const url= `${API_BASE_URL}/user/TodeleteFav/${HomeId}`;
      const response =await fetch(url,{
        method:"POST",
        credentials:"include"
      })
      const res=await response.json();
      console.log(res.message);
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setFormData({
            username: '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    const handleUpdateClick = () => {
        setIsModalOpen(true);
    };
    const formSubmit=async ()=>{
      const url=`${API_BASE_URL}/user/Toupdate`;
      const response=await fetch(url,{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(formData),
        credentials:"include"
      })
      const res=await response.json();
      console.log(res.message);
    }
    console.log("Details are ",details);
   return (
    <>
    { details.user && (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-image">👤</div>
          <div className="avatar-badge">✓</div>
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{details.user.name}</h1>
          <p className="profile-email">{details.user.email}</p>
          <p className="profile-joined">Member since January 2024</p>
          <button className="update-btn" onClick={handleUpdateClick}>
            Update Password
          </button>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-number">{details.BookedFinal.length}</div>
          <div className="stat-label">Bookings</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{details.favourites.length}</div>
          <div className="stat-label">Favourites</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{details.user.reviewCount}</div>
          <div className="stat-label">Reviews</div>
        </div>
      </div>

      <div className="profile-sections">
        <div className="section personal-info">
          <h2 className="section-title">Personal Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Full Name</label>
              <input type="text" value={details.user.name} readOnly />
            </div>
            <div className="info-item">
              <label>Email</label>
              <input type="email" value={details.user.email} readOnly />
            </div>
            <div className="info-item">
              <label>Phone</label>
              <input type="tel" value={details.user.number} readOnly />
            </div>
          </div>
        </div>

        <div className="section preferences">
          <h2 className="section-title">Preferences</h2>
          <div className="preference-grid">
            <div className="preference-card">
              <div className="preference-icon">🏨</div>
              <h3>Accommodation Type</h3>
              <p>Hotels & Resorts</p>
            </div>
            <div className="preference-card">
              <div className="preference-icon">💰</div>
              <h3>Budget Range</h3>
              <p>$100 - $300 per night</p>
            </div>
            <div className="preference-card">
              <div className="preference-icon">🌟</div>
              <h3>Preferred Rating</h3>
              <p>4+ Stars</p>
            </div>
            <div className="preference-card">
              <div className="preference-icon">📍</div>
              <h3>Favorite Destinations</h3>
              <p>Beach & City</p>
            </div>
          </div>
        </div>

        <div className="section recent-activity">
          <h2 className="section-title">Favourites</h2>
          {details.favourites.map((item,index)=>{
            return(
              <React.Fragment key={index}>
                <div className="activity-list">
            <div className="activity-item">
              <div className="activity-image">🏔️</div>
              <div className="activity-details">
                <h4>{item.name}</h4>
                <p>{item.location}</p>
                <span className="activity-date">Jan 5-10, 2025</span>
              </div>
              <button className="delete-button" onClick={Delete}>Delete</button>
            </div>
          </div>
              </React.Fragment>
            )
          })}
        </div>
        <div className="section recent-activity">
          <h2 className="section-title">Recent Bookings</h2>
          {details.BookedFinal.map((item,index)=>{
            return(
              <React.Fragment key={index}>
               <div className="activity-list">
            <div className="activity-item">
              <div className="activity-image">🏔️</div>
              <div className="activity-details">
                <h4>{item.name}</h4>
                <p>{item.location}</p>
                <span className="activity-date">Jan 5-10, 2025</span>
              </div>
              
            </div>
          </div> 
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Update Account</h2>
              <button className="modal-close" onClick={handleModalClose}>×</button>
            </div>
            
            <div className="modal-body">
              <form onSubmit={formSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter new username"
                  />
                </div>

                <div className="form-divider">
                  <span>Password Update</span>
                </div>

                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Enter current password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={handleModalClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    Update Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>)
}
</>)
}

export default Profile