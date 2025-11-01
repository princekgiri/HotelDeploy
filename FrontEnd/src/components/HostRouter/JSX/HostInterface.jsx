import React, { useState ,useEffect,useRef,useContext} from 'react';
import  {useNavigate } from 'react-router-dom';
import '../Css/HotelCards.css'; // Import the CSS file
import {noteContextSo} from '../JSX/Notestate.jsx'
import useSend from './FunctionTOBackend.jsx'
import '../Css/HostInterfaceBell.css'
const HoseInterface = () => {
    const {logincheck,logincheckstate,setLogincheckstate,selectedHome, setSelectedHome,profileHost,setProfileHost,back,setBack} =useContext(noteContextSo);
    const Navigate=useNavigate();

    const [uploadedhomes, setUploadedhomes] = useState([]);

    // Bell icon navigation handler
    const goToHostMessages = () => {
        Navigate('/HostMessages');
    }
    const [showModal, setShowModal] = useState(false);
    useEffect(()=>{
        console.log("No you cant navigate ");
        if(profileHost!=null && profileHost!=undefined && back){
        Navigate("/ProfileHost");
    }
    },[profileHost])
    const openEditModal = (e,item) => {
        e.preventDefault();
        console.log("This is item ",item);
        setSelectedHome(item);
        setShowModal(true);
    };
    const ToNavigate=(e)=>{
        console.log("To Input is this ",Toput);
        setProfileHost(Toput);
        }
    
    const {toSend,messagesCount,setMessageCount,fetchMessages,ToCall}=useSend();
    
    const closeModal = () => {
        setShowModal(false);
        setSelectedHome(null);
        localStorage.removeItem('image0');
        localStorage.removeItem('image1');
        localStorage.removeItem('image2');
        localStorage.removeItem('cand0');
        localStorage.removeItem('cand1');
        localStorage.removeItem('cand2');
        localStorage.removeItem('GooglePay');
        localStorage.removeItem('Paytm');
        localStorage.removeItem('PhonePe');
    };
    
    const edit=async (e,id)=>{
        const url=`http://localhost:3000/host/editHome/:${id}`;
        const response=await fetch(url,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(body),
            credentials:"include"
        });
        console.log(id);
    }
    const [Toput,setToput]=useState();
    useEffect(()=>{
        const goAndFetch=async ()=>{
            const url="http://localhost:3000/host/fetchHomes";
            const response=await fetch(url,{
                method:'GET',
                credentials:"include"
            })
            const res=await response.json();
            console.log("The Homes that Came are Hello ",res);
            setUploadedhomes(()=>{
                const updated=res.MyPostedHomes;
                setToput(res);
                console.log("The value of Toput came is ",Toput)
                // console.log("updated is ",updated[0].photo[0]);
                return updated;
            })
        }
        goAndFetch();
        fetchMessages();
    },[]);
    const getFacilityClass = (facility) => {
        return 'hotel-facility facility-' + facility.toLowerCase().replace(/\s+/g, '-');
    };
    useEffect(()=>{
        if(logincheck.current=="true"){
            console.log("Welcome BRo you are to be here");
            console.log(logincheck.current);
        }
        else{
        console.log("No it is false and will be false prince");
        console.log(logincheck.current);
        Navigate("/");
        }
    },[logincheckstate]);
    const onLogOut=(e)=>{
        localStorage.setItem('loginstate',false);
        localStorage.removeItem('UserEmail');
        if (localStorage.getItem('Username')){ localStorage.removeItem('Username')};
        if (localStorage.getItem('OwnerEmailToFetch')){ localStorage.removeItem('OwnerEmailToFetch')};
        if (localStorage.getItem('OwnernameToShow')){ localStorage.removeItem('OwnernameToShow')};
        if (localStorage.getItem('useremailToFetch')){ localStorage.removeItem('useremailToFetch')};
        if (localStorage.getItem('role')){ localStorage.removeItem('role')};
        logincheck.current=localStorage.getItem('loginstate');
        setLogincheckstate(false)
        
    }
    const AddMoreHomes=()=>{
        if(logincheck.current=="true"){
            Navigate("/Host");
    }
        else{
            console.log("false");
        }
    }
    const setModalText=(e)=>{
        const {name,value}=e.target;
        console.log(name,value);
        setSelectedHome((prev)=>{
            const updated={...prev,[name]:value};
            console.log("This is being printed ",updated);
            return updated;
        })
    }
    const setModalArray=(e)=>{
        const {name,value}=e.target;
        console.log(name,value);
        setSelectedHome((prev)=>{
            let updated='';
            if(selectedHome[name].includes(value)){
                updated={...prev,[name]:prev[name].filter(item=>item!=value)};
            }
            else{
                updated={...prev,[name]:[...prev[name],value]};
            }
            console.log("Hello This is updated ",updated);
            return updated;
        })
    }
    console.log("This is uploaded house",uploadedhomes);

    const selectImage=(e,idx)=>{
        const {name,files}=e.target;
        console.log(idx,name);
        const url=URL.createObjectURL(e.target.files[0]);
        console.log("Here are the files ",files);
        localStorage.setItem(`image${idx}`,url);
        console.log(url);
        setSelectedHome(prev => {
    console.log("Here is your Array too ",files[0]);
    
    const updated = {
        ...prev,
        photo: [
            {
                ...prev.photo[0],
                [name]: prev.photo[0][name].map((item,i)=>i==idx?files[0]:item)
            }
        ]
    };
    console.log("See what is all in updated ",updated);
    console.log("See what is all in selected home ",selectedHome);
    return updated;
});
    }
    const selecetVideos=(e,idx)=>{
        const {name,files}=e.target;
        console.log(idx,name);
        const url=URL.createObjectURL(e.target.files[0]);
        localStorage.setItem(`cand${idx}`,url);
        console.log(url);
        setSelectedHome(prev => {
    const updated = {
        ...prev,
        photo: [
            {
                ...prev.photo[0],
                [name]: prev.photo[0][name].map((item,i)=>i==idx?files[0]:item)
            }
        ]
    };
    console.log("See what is all in updated ",updated);
    console.log("See what is all in updated ",selectedHome);
    return updated;
});
}
const selectSingleScanner=(e,idx)=>{
    const {name,files}=e.target;
    console.log(name,files);
    console.log("This is e",e);
    const url=URL.createObjectURL(files[0]);
    console.log("Url is this ",url);
    localStorage.setItem(idx,url);
    setSelectedHome((prev)=>{
        const updated={...prev,
            photo:[{
                ...prev.photo[0],
                [name]:files[0]
            }]
        }
        console.log(updated);
        return updated;
    })
}
const onSubmit=async (e)=>{
e.preventDefault();
console.log(selectedHome);
const id=selectedHome._id;
console.log("This is id of the home ",id);
const reply=await ToCall(selectedHome,id);
console.log(reply);
}
const deleteHome=async (e,id)=>{
const url=`http://localhost:3000/host/deleteHome/${id}`;
const response=await fetch(url,{
method:"GET"
})
const res=await response.json();
console.log(res.msg);
}
    return (
            <>
                        <div className="host-bell-bar">
                            <button className="host-profile-btn" onClick={(e) => {ToNavigate(e)}}>
                                <span className="profile-icon">👤</span>
                                <span className="profile-label">Profile</span>
                            </button>
                            <span className="host-bell-icon" title="View All Messages" onClick={goToHostMessages}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <radialGradient id="bellGradient" cx="50%" cy="50%" r="80%">
                                            <stop offset="0%" stop-color="#e0c3fc"/>
                                            <stop offset="100%" stop-color="#764ba2"/>
                                        </radialGradient>
                                    </defs>
                                    <circle cx="12" cy="12" r="12" fill="url(#bellGradient)"/>
                                    <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 002 2zm6-6V11c0-3.07-1.63-5.64-5-6.32V4a1 1 0 10-2 0v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29A1 1 0 006 19h12a1 1 0 00.71-1.71L18 16z" fill="#fff"/>
                                </svg>
                                {messagesCount > 0 && (
                                    <span className="bell-notification-badge">{messagesCount}</span>
                                )}
                            </span>
                        </div>
            <div className="hotel-container">
                <div className="hotel-wrapper">
                    <div className="hotel-header">
                        <h1 className="hotel-title">Your Uploaded Homes</h1>
                        <p className="hotel-subtitle">Beautiful properties ready to welcome guests</p>
                    </div>
                    <div className="action-buttons">
                        <button type="button" className="logout-btn" onClick={onLogOut}>Log Out</button>
                        <button type="button" className="add-homes-btn" onClick={AddMoreHomes}>Add More Homes</button>
                    </div>
                    <div className="hotel-grid">
                        {uploadedhomes && uploadedhomes.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className="hotel-card">
                                        <button className="delete-btn" onClick={(e)=>{deleteHome(e,item._id)}}>
                                            🗑️
                                        </button>
                                        <div className="hotel-image">
                                            <img src={item.photo[0].housePhotos[0]} />
                                            <div className="hotel-badge">Featured</div>
                                        </div>
                                        
                                        <div className="hotel-content">
                                            <h3 className="hotel-name">
                                                <p>{item.name}</p>
                                            </h3>
                                            
                                            <div className="hotel-location">
                                                {item.location.map(loc => {
                                                  return(
                                                    <span key={loc}>{loc} &nbsp;</span>
                                                )})}
                                            </div>
                                            
                                            <div className="hotel-price-section">
                                                <div className="hotel-price">
                                                    <span className="hotel-price-amount">${item.price}</span>
                                                    <span className="hotel-price-period">/ night</span>
                                                </div>
                                                <div className="hotel-rating">
                                                    <span className="hotel-rating-text">4.8</span>
                                                </div>
                                            </div>
                                            
                                            <div className="hotel-facilities">
                                                <h4 className="hotel-facilities-title">Amenities</h4>
                                                <ul className="hotel-facilities-list">
                                                    {item.comfort.map((facility, idx) => (
                                                        <li key={idx} className={getFacilityClass(facility)}>
                                                            {facility}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            
                                            <div className="hotel-actions">
                                                <button className="hotel-book-btn" name="EditButton" onClick={(e) => openEditModal(e,item)}>Edit</button>
                                                <button className="hotel-fav-btn">❤️</button>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>
            </div>
            
            {/* Edit Modal */}
            {showModal && selectedHome && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>×</button>
                        <h2 className="modal-title">Edit Property</h2>
                        
                        <form className="modal-form" encType="multipart/form-data" onSubmit={onSubmit}>
                            {/* House Name */}
                            <div className="modal-field">
                                <label>House Name</label>
                                <input type="text" placeholder="Enter property name" className="modal-input" value={selectedHome.name} onChange={setModalText} name="name"/>
                            </div>
                            
                            {/* Location */}
                            <div className="modal-field">
                                <label>Location</label>
                                <input type="text" placeholder="Enter location" className="modal-input" value={Array.isArray(selectedHome.location) ? selectedHome.location.join(', ') : selectedHome.location} onChange={setModalText} name="location"/>
                            </div>
                            
                            {/* Price */}
                            <div className="modal-field">
                                <label>Price (₹)</label>
                                <input type="range" min="1000" max="50000" step="300" className="modal-input" value={selectedHome.price} onChange={setModalText} name="price"/>
                            </div>
                            
                            {/* Occupancy */}
                            <div className="modal-field">
                                <label>Occupancy Type</label>
                                <div className="modal-radio-grid">
                                    <div className="modal-radio-option">
                                        <input type="radio" name="occupancy" value="solo" id="modal-solo" checked={selectedHome.occupancy.includes("solo")} onChange={setModalText}/>
                                        <label htmlFor="modal-solo" className="modal-radio-label">
                                            <span>👤</span>
                                            <span>Solo</span>
                                        </label>
                                    </div>
                                    <div className="modal-radio-option">
                                        <input type="radio" name="occupancy" value="group" id="modal-group" checked={selectedHome.occupancy.includes("group")} onChange={setModalText}/>
                                        <label htmlFor="modal-group" className="modal-radio-label">
                                            <span>👥</span>
                                            <span>Group</span>
                                        </label>
                                    </div>
                                    <div className="modal-radio-option">
                                        <input type="radio" name="occupancy" value="couples" id="modal-couples" checked={selectedHome.occupancy.includes("couples")} onChange={setModalText}/>
                                        <label htmlFor="modal-couples" className="modal-radio-label">
                                            <span>💑</span>
                                            <span>Couples</span>
                                        </label>
                                    </div>
                                    <div className="modal-radio-option">
                                        <input type="radio" name="occupancy" value="family" id="modal-family" checked={selectedHome.occupancy.includes("family")} onChange={setModalText}/>
                                        <label htmlFor="modal-family" className="modal-radio-label">
                                            <span>👨‍👩‍👧‍👦</span>
                                            <span>Family</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Property Type */}
                            <div className="modal-field">
                                <label>Property Type</label>
                                <div className="modal-radio-grid">
                                    <div className="modal-radio-option">
                                        <input type="radio" name="propertyType" value="apartment" id="modal-apartment" checked={selectedHome.propertyType.includes("apartment")} onChange={setModalText}/>
                                        <label htmlFor="modal-apartment" className="modal-radio-label">
                                            <span>🏢</span>
                                            <span>Apartment</span>
                                        </label>
                                    </div>
                                    <div className="modal-radio-option">
                                        <input type="radio" name="propertyType" value="house" id="modal-house" checked={selectedHome.propertyType.includes("house")} onChange={setModalText}/>
                                        <label htmlFor="modal-house" className="modal-radio-label">
                                            <span>🏠</span>
                                            <span>House</span>
                                        </label>
                                    </div>
                                    <div className="modal-radio-option">
                                        <input type="radio" name="propertyType" value="bungalow" id="modal-bungalow" checked={selectedHome.propertyType.includes("bungalow")} onChange={setModalText}/>
                                        <label htmlFor="modal-bungalow" className="modal-radio-label">
                                            <span>🏡</span>
                                            <span>Bungalow</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Comfort */}
                            <div className="modal-field">
                                <label>Comfort Amenities</label>
                                <div className="modal-checkbox-grid">
                                    <div className="modal-checkbox-option">
                                        <input type="checkbox" name="comfort" value="AC" id="modal-ac" checked={selectedHome.comfort.includes("AC")} onChange={setModalArray}/>
                                        <label htmlFor="modal-ac" className="modal-checkbox-label">
                                            <span>❄️</span>
                                            <span>AC</span>
                                        </label>
                                    </div>
                                    <div className="modal-checkbox-option">
                                        <input type="checkbox" name="comfort" value="Wi-fi" id="modal-wifi" checked={selectedHome.comfort.includes("Wi-fi")} onChange={setModalArray}/>
                                        <label htmlFor="modal-wifi" className="modal-checkbox-label">
                                            <span>📶</span>
                                            <span>Wi-fi</span>
                                        </label>
                                    </div>
                                    <div className="modal-checkbox-option">
                                        <input type="checkbox" name="comfort" value="Geyser" id="modal-geyser" checked={selectedHome.comfort.includes("Geyser")} onChange={setModalArray}/>
                                        <label htmlFor="modal-geyser" className="modal-checkbox-label">
                                            <span>🚿</span>
                                            <span>Geyser</span>
                                        </label>
                                    </div>
                                    <div className="modal-checkbox-option">
                                        <input type="checkbox" name="comfort" value="Washing-machine" id="modal-washing" checked={selectedHome.comfort.includes("Washing-machine")} onChange={setModalArray} />
                                        <label htmlFor="modal-washing" className="modal-checkbox-label">
                                            <span>🧺</span>
                                            <span>Washing Machine</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Environment */}
                            <div className="modal-field">
                                <label>Environment</label>
                                <div className="modal-checkbox-grid">
                                    <div className="modal-checkbox-option">
                                        <input type="checkbox" name="environment" value="Social" id="modal-social" checked={selectedHome.environment.includes("Social")} onChange={setModalArray}/>
                                        <label htmlFor="modal-social" className="modal-checkbox-label">
                                            <span>🎉</span>
                                            <span>Social</span>
                                        </label>
                                    </div>
                                    <div className="modal-checkbox-option">
                                        <input type="checkbox" name="environment" value="Romantic" id="modal-romantic" checked={selectedHome.environment.includes("Romantic")} onChange={setModalArray} />
                                        <label htmlFor="modal-romantic" className="modal-checkbox-label">
                                            <span>❤️</span>
                                            <span>Romantic</span>
                                        </label>
                                    </div>
                                    <div className="modal-checkbox-option">
                                        <input type="checkbox" name="environment" value="Modern" id="modal-modern" checked={selectedHome.environment.includes("Modern")} onChange={setModalArray}/>
                                        <label htmlFor="modal-modern" className="modal-checkbox-label">
                                            <span>🏙️</span>
                                            <span>Modern</span>
                                        </label>
                                    </div>
                                    <div className="modal-checkbox-option">
                                        <input type="checkbox" name="environment" value="Nature" id="modal-nature" checked={selectedHome.environment.includes("Nature")} onChange={setModalArray}/>
                                        <label htmlFor="modal-nature" className="modal-checkbox-label">
                                            <span>🌿</span>
                                            <span>Nature</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Rules */}
                            <div className="modal-field">
                                <label>Rules</label>
                                <div className="modal-checkbox-grid">
                                    <div className="modal-checkbox-option">
                                        <input type="checkbox" name="rules" value="no-smoking" id="modal-nosmoking" checked={selectedHome.rules.includes("no-smoking")} onChange={setModalArray}/>
                                        <label htmlFor="modal-nosmoking" className="modal-checkbox-label">
                                            <span>🚭</span>
                                            <span>No-Smoking</span>
                                        </label>
                                    </div>
                                    <div className="modal-checkbox-option">
                                        <input type="checkbox" name="rules" value="no-parties" id="modal-noparties" checked={selectedHome.rules.includes("no-parties")} onChange={setModalArray}/>
                                        <label htmlFor="modal-noparties" className="modal-checkbox-label">
                                            <span>🎊</span>
                                            <span>No-Parties</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Cancellation */}
                            <div className="modal-field">
                                <label>Cancellation</label>
                                <div className="modal-radio-grid">
                                    <div className="modal-radio-option">
                                        <input type="radio" name="cancellation" value="yes" id="modal-cancel-yes" checked={selectedHome.cancellation === "yes"} onChange={setModalText}/>
                                        <label htmlFor="modal-cancel-yes" className="modal-radio-label">
                                            <span>✅</span>
                                            <span>Yes</span>
                                        </label>
                                    </div>
                                    <div className="modal-radio-option">
                                        <input type="radio" name="cancellation" value="no" id="modal-cancel-no" checked={selectedHome.cancellation === "no"} onChange={setModalText}/>
                                        <label htmlFor="modal-cancel-no" className="modal-radio-label">
                                            <span>❌</span>
                                            <span>No</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Home Photos */}
                            <div className="modal-field">
                                <label>Home Photos</label>
                                {selectedHome.photo && selectedHome.photo[0] && selectedHome.photo[0].housePhotos && selectedHome.photo[0].housePhotos.length > 0 && (
                                    <div className="modal-photos-preview">
                                        {selectedHome.photo[0].housePhotos.map((photo, idx) => (
                                            <div key={idx} className="modal-photo-item">
                                                <img 
                                                    src={photo } 
                                                    onError={(e)=>{
                                                        e.target.onerror=null;
                                                        e.target.src=localStorage.getItem(`image${idx}`);
                                                    }}
                                                    alt={`Photo ${idx + 1}`} 
                                                    className="modal-preview-img" 
                                                    onClick={() => document.getElementById(`photo-${idx}`).click()}
                                                />
                                                <input type="file" id={`photo-${idx}`} accept="image/*" style={{display: 'none'}} name="housePhotos" onChange={(e)=>{selectImage(e,idx)}}/>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {/* Home Videos */}
                            <div className="modal-field">
                                <label>Home Videos</label>
                                {selectedHome.photo && selectedHome.photo[0] && selectedHome.photo[0].houseVideos && selectedHome.photo[0].houseVideos.length > 0 && (
                                    <div className="modal-photos-preview">
                                        {selectedHome.photo[0].houseVideos.map((video, idx) => (
                                            <div key={idx} className="modal-photo-item">
                                                {console.log(`http://localhost:3000/uploads/${video}`)}
                                                <video 
                                                    src={video} 
                                                    onError={(e)=>{
                                                        e.target.onerror=null;
                                                        e.target.src=localStorage.getItem(`cand${idx}`);
                                                    }}
                                                    controls 
                                                    className="modal-preview-video" 
                                                    onClick={() => document.getElementById(`video-${idx}`).click()}
                                                />
                                                <input type="file" name="houseVideos" id={`video-${idx}`} accept="video/*" style={{display: 'none'}} onChange={(e)=>{selecetVideos(e,idx)}}/>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {/* Scanner Photos */}
                            <div className="modal-field">
                                <label>Scanner Photo - PhonePe</label>
                                {selectedHome.photo && selectedHome.photo[0] && selectedHome.photo[0].PhonePe && (
                                    <div className="modal-photos-preview">
                                        <img 
                                            src={selectedHome.photo[0].PhonePe}
                                            onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = localStorage.getItem('PhonePe');
                                            }} 
                                            alt="PhonePe Scanner" 
                                            className="modal-preview-img" 
                                            onClick={() => document.getElementById('scanner-phonepe').click()}
                                        />
                                        <input type="file" id="scanner-phonepe" accept="image/*" style={{display: 'none'}} name="PhonePe" onChange={(e)=>{selectSingleScanner(e,"PhonePe")}}/>
                                    </div>
                                )}
                            </div>
                            
                            <div className="modal-field">
                                <label>Scanner Photo - Paytm</label>
                                {selectedHome.photo && selectedHome.photo[0] && selectedHome.photo[0].Paytm && (
                                    <div className="modal-photos-preview">
                                        <img 
                                            src={selectedHome.photo[0].Paytm} 
                                            onError={(e)=>{
                                                e.target.onerror=null;
                                                e.target.src=localStorage.getItem('Paytm');
                                            }}
                                            alt="Paytm Scanner" 
                                            className="modal-preview-img" 
                                            onClick={() => document.getElementById('scanner-paytm').click()}
                                        />
                                        <input type="file" id="scanner-paytm" accept="image/*" style={{display: 'none'}} onChange={(e)=>{selectSingleScanner(e,"Paytm")}} name="Paytm"/>
                                    </div>
                                )}
                            </div>
                            
                            <div className="modal-field">
                                <label>Scanner Photo - Google Pay</label>
                                {selectedHome.photo && selectedHome.photo[0] && selectedHome.photo[0].GooglePay && (
                                    <div className="modal-photos-preview">
                                        <img 
                                            src={selectedHome.photo[0].GooglePay} 
                                            onError={(e)=>{
                                                e.target.onerror=null;
                                                e.target.src=localStorage.getItem('GooglePay');
                                            }}
                                            alt="Google Pay Scanner" 
                                            className="modal-preview-img" 
                                            onClick={() => document.getElementById('scanner-googlepay').click()}
                                        />
                                        <input type="file" name="GooglePay" id="scanner-googlepay" accept="image/*" style={{display: 'none'}} onChange={(e)=>{selectSingleScanner(e,"GooglePay")}}/>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="modal-submit-section">
                                <button type="submit" className="modal-submit-btn">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default HoseInterface;