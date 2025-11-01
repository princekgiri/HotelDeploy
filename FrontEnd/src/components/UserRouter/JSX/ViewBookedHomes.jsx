import React from 'react';
import { useState, useEffect ,useContext} from "react";
import '../Css/ViewBookedHomes.css';
import {useNavigate} from 'react-router-dom'
import API_BASE_URL from '../../../config'

const ViewBookedHomes = () => {
  const Navigate=useNavigate();
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const url = `${API_BASE_URL}/user/fetchAllBookedHomes`;
        const response = await fetch(url, {
          method: "GET"
        });
        const res = await response.json();
        console.log(res.hotels);
        setArray(res.hotels);
      } catch (error) {
        console.error("Error fetching booked homes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHomes();
  }, [])
  const [Filter,setFilter]=useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDate=(e)=>{
    const {name,value}=e.target;
    setFilter({...Filter,[name]:value})
  }

  // Generate calendar days
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add all days in month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const handleDateSelect = (date) => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      const GetFreeHomes=new Promise((resolve,reject)=>{
        setFilter((prev)=>{
        const updated=formattedDate;
        console.log("Here is date changed ",Object.prototype.toString.call(updated));
        resolve(updated);
        return updated;
      });
      });
      GetFreeHomes.then(async (data)=>{
        const url=`${API_BASE_URL}/user/GetFreeHomes`
        const response=await fetch(url,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({date:data})
        })
        const res=await response.json();
        console.log(res);
        setArray(res.Hotels);
      })
      setShowCalendar(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Format date to beautiful display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not Set';
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

 

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your booked homes...</p>
      </div>
    );
  }
const homeDetails = (e, home) => {
console.log(home);      
}
  return (
    <div className="view-booked-homes-wrapper">
      <div className="booked-homes-header">
        <h1 className="booked-homes-title">
          <span className="title-icon">🏡</span>
          Your Booked Homes
        </h1>
        <p className="booked-homes-subtitle">
          {array.length} {array.length === 1 ? 'Property' : 'Properties'} Reserved
        </p>
      </div>

      {/* Stylish Date Filter Section */}
      <div className="date-filter-section">
        <div className="date-filter-container">
          <label htmlFor="dobSecondDate" className="date-filter-label">
            <svg className="calendar-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
              <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
              <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
              <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
            </svg>
            <span>Filter by Availability Date</span>
          </label>
          <div className="custom-date-wrapper">
            <div 
              className="date-display-field"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <span className="selected-date">
                {console.log("Here is the value of filter ",Filter)}
                {Filter!=null ? formatDate(Filter) : 'Select a date'}
              </span>
              <svg className="calendar-icon-btn" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
              </svg>
            </div>

            {/* Beautiful Custom Calendar Popup */}
            {showCalendar && (
              <div className="custom-calendar-popup">
                <div className="calendar-header">
                  <button className="calendar-nav-btn" onClick={handlePrevMonth}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <div className="calendar-month-year">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </div>
                  <button className="calendar-nav-btn" onClick={handleNextMonth}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
                
                <div className="calendar-weekdays">
                  {dayNames.map(day => (
                    <div key={day} className="calendar-weekday">{day}</div>
                  ))}
                </div>

                <div className="calendar-days-grid">
                  {getDaysInMonth(currentMonth).map((date, index) => (
                    <div
                      key={index}
                      className={`calendar-day ${!date ? 'empty' : ''} ${
                        date && Filter === date.toISOString().split('T')[0] ? 'selected' : ''
                      }`}
                      onClick={() => handleDateSelect(date)}
                    >
                      {date ? date.getDate() : ''}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {array.length === 0 ? (
        <div className={`empty-state ${showCalendar ? 'calendar-open' : ''}`}>
          <div className="empty-icon">🏠</div>
          <h2>No Booked Homes Yet</h2>
          <p>Start exploring amazing properties and book your dream home!</p>
          <button className="explore-btn">Explore Properties</button>
        </div>
      ) : (
        <div className={`booked-homes-grid ${showCalendar ? 'calendar-open' : ''}`}>
          {array.map((item, index) => (
            <div className="booked-home-card" key={index} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="card-image-wrapper">
                <img
                  src={item.photo[0].housePhotos[0]}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/src/images/picture6.jpg'
                  }}
                  alt={item.name}
                  className="card-image"
                />
                <div className="card-badge">Booked</div>
                <div className="card-overlay">
                  <button 
                    className="view-details-btn" 
                    onClick={(e) => homeDetails(e, item)}
                  >
                    View Details
                  </button>
                </div>
              </div>

              <div className="card-content">
                <h3 className="home-name">{item.name}</h3>
                
                <div className="home-location">
                  <svg className="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{item.location?.[0] || ""} {item.location?.[1] || ""}</span>
                </div>

                <div className="card-footer">
                  <div className="price-section">
                    <span className="price-amount">${item.price}</span>
                    <span className="price-period">/ month</span>
                  </div>
                  <button 
                    className="details-btn" 
                    onClick={(e) => homeDetails(e, item)}
                  >
                    <span>Details</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="available-date-badge">
                  <span className="calendar-icon">📅</span>
                  <span className="date-label">Available After :</span>
                  <span className="date-value">{formatDate(item.SecondDate)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewBookedHomes;
