import '../Css/FavouriteHomesCss.css';
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import useSend from './FunctionToBackend'
import API_BASE_URL from '../../../config'

function FavouriteHomes(){
  const Navigate=useNavigate();
  const [favourite,setFavourite]=useState([]);
  const {RemoveHome} =useSend();
  useEffect(()=>{
    const doAll= async()=>{
    const url=`${API_BASE_URL}/user/personalfavourite`;
    const response=await fetch(url,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include"
    })
    const res=await response.json();
    console.log("Res that  got is ",res);
    console.log("Array that  got is ");
    setFavourite(res.array);
  };
  doAll();
  },[]);
  const onClickGo=()=>{
    Navigate("/home");
  }
  const BookForFinalize=async (e,ida)=>{
    const url=`${API_BASE_URL}/user/AddToBooked`;
    console.log("The sent id is ",ida);
    const response=await fetch(url,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({ida}),
      credentials:"include"
    })
    const res=await response.json();
    console.log(res);
  }
  const Remove=async (e,id)=>{
    console.log(id);
    const RemoveDec=await RemoveHome(id);
    setFavourite((prev)=>{
      const updated=prev.filter((prev)=>prev.id!=id);
      return updated;
    })
    console.log(RemoveDec);
  }
  return(
    <>
    <div className="favourites-page">
      <div className="page-header">
        <h1 className="page-title">My Favourite Homes</h1>
        <button className="go-home-btn" onClick={onClickGo}>
          <span>🏠</span> Back to Home
        </button>
      </div>

      <div className="favourites-grid">
        {favourite.length > 0 ? (
          favourite.map((home, index) => {
            return (
              <div className="fav-card" key={index}>
                <div className="card-image-container">
                  <img src={home.image} alt={home.name} className="card-image"/>
                </div>
                
                <div className="card-content">
                  <h3 className="home-name">{home.name}</h3>
                  
                  <div className="price-rating-row">
                    <div className="home-price">₹{home.price}</div>
                    <div className="home-rating">⭐ 5.5</div>
                  </div>
                  
                  <div className="card-actions">
                    <button className="book-btn" onClick={(e) => BookForFinalize(e, home._id)}>
                      <span>📅</span> Book Now
                    </button>
                    <button className="remove-btn" onClick={(e) => Remove(e, home)}>
                      <span>❌</span> Remove
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="empty-state">
            <div className="empty-icon">💔</div>
            <h2>No Favourites Yet</h2>
            <p>Start adding homes to your favourites!</p>
            <button className="go-home-btn" onClick={onClickGo}>
              Browse Homes
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default FavouriteHomes
