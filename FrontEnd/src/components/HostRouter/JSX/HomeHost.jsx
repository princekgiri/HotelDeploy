import React, { useState,useEffect,useRef,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/HomeHost.css';
import useSend from './FunctionTOBackend'
import {noteContextSo} from './Notestate'
import { ClipLoader } from 'react-spinners';

const HomeHost = () => {
    const {logincheck,logincheckstate,setLogincheckstate}=useContext(noteContextSo);
    const Navigate=useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [details, setDetails] = useState({
        houseName: "",
        Location: "",
        photo: [
            {houseVideos:[],
            housePhotos:[],
            PhonePe:'',
            Paytm:'',
            GooglePay:''}
        ],
        price: 5000,
        comfort: [],
        environment: [],
        rules: [],
        cancellation: '',
        propertyType: '',
    });
    const VideoRef=useRef(null);
    
    
    useEffect(()=>{
        if(logincheck.current=="true"){
        }
        else{
            Navigate('/');
        }
    },[logincheckstate])
    const LogOut=()=>{
        localStorage.setItem('loginstate',false);
        logincheck.current=localStorage.getItem('loginstate');
        setLogincheckstate(false);
        if(localStorage.getItem('loginstate')!="true"){
            window.location.reload(true);
        }
    }
    const {save} =useSend();
    const [mediagroup,setMediagroup]=useState({
        video:[]
    })
    const [cities, setCities] = useState(
        [
            "mumbai", "delhi", "bengaluru", "hyderabad", "chennai", "kolkata", "pune",
            "ahmedabad", "surat", "jaipur", "lucknow", "kanpur", "nagpur", "indore",
            "bhopal", "patna", "vadodara", "ludhiana", "agra", "nashik", "rajkot",
            "varanasi", "meerut", "amritsar", "ranchi", "coimbatore", "vijayawada",
            "guwahati", "bhubaneswar", "chandigarh","phagwara"
        ]);
    const [min, setMin] = useState(5000);
    const [suggesstions, showSuggestions] = useState([
    ]);
    const onClick = (e) => {
        e.preventDefault();
        const { name, value } = e.currentTarget;
        console.log(name, value);
        const city = value.slice(0, 1).toUpperCase() + value.slice(1);
        console.log("City is this ",city)
        setDetails({ ...details, [name]: city });
        showSuggestions(null);
    }
    const onInput = (e) => {
        e.preventDefault();
        const { value, name } = e.currentTarget;
        console.log("The value that is obtained is ", value);
        setDetails(() => {
            const updated = { ...details, [name]: value };
            return updated;
        });
        setMin(value);
    }
    const onClickCheck = (e) => {
        const { name, value, checked } = e.target; // checked tells if it's checked or not
        setDetails(prev => {
            let updatedArray;
            if (checked) {
                updatedArray = [...prev[name], value]; // add
            } else {
                updatedArray = prev[name].filter(item => item !== value); // remove
            }
            const newArray = { ...prev, [name]: updatedArray };
            console.log(newArray);
            return newArray;
        });
    };
    const onChange = (e) => {
        const { name, value, checked } = e.currentTarget;
        setDetails({ ...details, [name]: value });
        showSuggestions(() => {
            const updated = cities.filter(city => city.toLowerCase().includes(value));
            return updated;
        })
        if (details.Location.length == 1) {
            showSuggestions(null);
        }
    }
    const media=(e)=>{
        const {name,files}=e.target;
        console.log("Files is like ",files);
        const FileArray=Array.from(files);
        const fileUrl=FileArray.map(item=>{
            return URL.createObjectURL(item) ;
        }
    );
        console.log("Url si like ",fileUrl);
        console.log("Real File URL ",fileUrl);
        setMediagroup((prev)=>{
            console.log("Prev is ",prev);
            const PrevVideos=prev.video;
            const updated={...prev,video:[...PrevVideos,...fileUrl]};
            console.log("Here Updated is like ",updated);
            return updated;
        })
    }
    const setMe=(e)=>{
        const{name,files}=e.target;
        console.log("The type is ",Object.prototype.toString.call(files));
        Array.from(files).forEach((item)=>{
            if(item.size>=5242880){
                alert('You Should upload a file less than 4 or 3 mb because it might take time')
            }
        })
        setDetails((prev)=>{
        const PrevFiles=prev.photo[0][name];
        const updated={...prev,photo:[{
         ...prev.photo[0],[name]:[...PrevFiles,...files]   
        }]
    };
        console.log("The type is ",Object.prototype.toString.call(updated[name]));
        console.log("Updated ",updated);
        return updated;
        })
    }
    const JustSee = (e) => {
        const { value, name, checked } = e.target;
        setDetails(() => {
            const updated = { ...details, [name]: value };
            console.log(updated);
            return updated;
        }
        )
    }
    useEffect(()=>{
        const handleLoadedMetadataVideo=()=>{
            console.log("it Just changed");
            console.log("so here it is Bro ",VideoRef.current.currentSrc);
        }
        VideoRef.current.load();
            if(VideoRef && logincheck.current=="true"){
                console.log("Yes it is planted");
                VideoRef.current.addEventListener('loadedmetadata',handleLoadedMetadataVideo);
            }
            
            return ()=>{
                if(VideoRef.current){
                    console.log("So It is also being removed");
                    VideoRef.current.removeEventListener('loadedmetadata',handleLoadedMetadataVideo);
                }
            }
    },[mediagroup.video])
    const uploadOnCloudinary=async (FilesDetails,FileArray)=>{
        const Url={
            assetFolder:[],
            array:[]
        };
        for (let i=0;i<FileArray.length;i++){
            const setFile=FileArray[i];
            const apikey=FilesDetails[i].apikey
            const timestamp=FilesDetails[i].timestamp
            const cloudName=FilesDetails[i].cloudName
            const signature=FilesDetails[i].signature
            const folder=FilesDetails[i].folder
            const public_id=FilesDetails[i].public_id
            const formData=new FormData();
            formData.append("file",setFile);
            formData.append("api_key",apikey);
            formData.append("timestamp",timestamp);
            formData.append("signature",signature);
            formData.append("folder",folder);
            formData.append("public_id",public_id);
            const url=`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
            const response=await fetch(url,{
            method:"POST",
              body:formData  
            })
            const res=await response.json();
            console.log("here si the Whole res ",res);
            Url.array.push(res.secure_url);
            Url.assetFolder.push(res.asset_folder);
        }
        console.log("asset folder and array is ",Url);
        return Url;
    }
    const onSubmit=async (e)=>{
        e.preventDefault();
        setIsLoading(true); // Start spinner
        const email=localStorage.getItem('UserEmail');
        const VideoList=[]
        const scanners=[]
        const ImagesList=[]
        for (const [index,item] of details.photo[0].houseVideos.entries()){
            VideoList.push(
            {folder:"videos",public_id:`${email}${item.name}`}
            )
            if(index>=2){
                break;
            }
        }
        console.log("Pushed VideosList are ",VideoList);
        for (const [index,item] of details.photo[0].housePhotos.entries()){
            ImagesList.push(
            {folder:"images",public_id:`${email}${item.name}`}
            )
            if(index>=3){
                break;
            }
        }
        console.log("Pushed ImagesList are ",ImagesList);
        if(details.photo[0].Paytm){
            console.log("Done from 1")
            scanners.push({folder:"Paytm",public_id:`${email}${details.photo[0].Paytm.name}`})
        }
        if(details.photo[0].PhonePe){
            console.log("Done from ")
            scanners.push({folder:"PhonePe",public_id:`${email}${details.photo[0].PhonePe.name}`})
        }
        if(details.photo[0].GooglePay){
            console.log("Done from 3")
            scanners.push({folder:"GooglePay",public_id:`${email}${details.photo[0].GooglePay.name}`})
        }
        const scannerArray=[];
        if(details.photo[0].Paytm){
            scannerArray.push(details.photo[0].Paytm)
        }
        if(details.photo[0].PhonePe){
            scannerArray.push(details.photo[0].PhonePe)
        }
        if(details.photo[0].GooglePay){
            scannerArray.push(details.photo[0].GooglePay)
        }
        console.log("Pushed scannerssList are ",scanners);
        const url="http://localhost:3000/host/get-Signature";
        const getSignature=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({VideoList:VideoList,ImagesList:ImagesList,scanners:scanners})});
        const res=await getSignature.json();
        
        const {VideossignaturesList,scannersList,ImagessignaturesList}=res;
        const Videos=await uploadOnCloudinary(VideossignaturesList,details.photo[0].houseVideos);
        const Images=await uploadOnCloudinary(ImagessignaturesList,details.photo[0].housePhotos);
        const scanner=await uploadOnCloudinary(scannersList,scannerArray);
        console.log("Videos are here ",Videos,"Images are here ",Images,"Scanners are here ",scanner);
    const PushUjrls=new Promise((resolve,reject)=>{
        const IndexedArray={
            GooglePay:0,
            Paytm:0,
            PhonePe:0
        }
        const Indexex=()=>{
            for (let i =0;i<=2;i++){
              if(scanner.assetFolder[i]=="GooglePay"){
                console.log("Index is this",i);
                IndexedArray.GooglePay=i
              } 
              else if(scanner.assetFolder[i]=="Paytm"){
                console.log("Index is this",i);
                IndexedArray.Paytm=i
              }
              else{
                console.log("Index is this",i);
                IndexedArray.PhonePe=i
              }
            }
        }
        Indexex();
        const updated={...details,photo:[{...details.photo[0],houseVideos:Videos.array,housePhotos:Images.array,GooglePay:scanner.array[IndexedArray.GooglePay],PhonePe:scanner.array[IndexedArray.PhonePe],Paytm:scanner.array[IndexedArray.Paytm]}]}
        setDetails(updated);
        resolve(updated);
    }).then(async (data)=>{
        console.log("the data avaiblabel is ",data);
        const dataGot=await save(data);
        console.log("All what save did is ",dataGot);
        setIsLoading(false); // Stop spinner after console.log
    }).catch((err)=>{
        console.log(err);
        setIsLoading(false); // Stop spinner on error
    })


        console.log("Love you world ");
        
        // setDetails(()=>{
        // const updated={
        // houseName: "",
        // Location: "",
        // photo: [],
        // price: 5000,
        // comfort: [],
        // environment: [],
        // rules: [],
        // cancellation: '',
        // propertyType: '',
        // music:[],
        // video:[]
        // }
        // console.log(updated);
        // return updated;
        // })
        // Navigate("/HostHome");
    }
    const setPhotoSpecific=(e)=>{
        const {name,files}=e.target;
        console.log("File is ",files);
        console.log("Name is ",name);
        setDetails((prev)=>{
            const prevFiles=prev.photo[0][name];
            const updated={...prev,photo:[{
                ...prev.photo[0],
                [name]:[...prevFiles,...files]
            }
            ]};
            console.log(updated);
            return updated;
        })
    }
    const setScannerPhoto=(e)=>{
        const {name,files}=e.target;
        setDetails((prev)=>{
            const updated={...prev,photo:[{...prev.photo[0],[name]:files[0]}]}
            console.log(updated);
            return updated;
        })
    }
    return (
        <>
            <div className="host-page">
                <div className="host-header">
                    <h1 className="host-title">List Your Property</h1>
                    <button className="logout-btn" onClick={LogOut}>
                        <span>🚪</span> Log Out
                    </button>
                </div>

                <form className="host-form" onSubmit={onSubmit} encType="multipart/form-data">
                    
                    {/* Property Name */}
                    <div className="form-section">
                        <label htmlFor="houseName" className="section-label">Property Name</label>
                        <input 
                            type="text" 
                            name="houseName" 
                            value={details.houseName} 
                            id="houseName" 
                            onChange={onChange}
                            placeholder="Enter your property name"
                            className="text-input"
                        />
                    </div>

                    {/* Location */}
                    <div className="form-section">
                        <label htmlFor="Location" className="section-label">Location</label>
                        <input 
                            type="text" 
                            name="Location" 
                            value={details.Location} 
                            onChange={onChange}
                            placeholder="Type city name"
                            className="text-input"
                        />
                        <div className="suggestions">
                            {suggesstions && suggesstions.map((suggestion, index) => (
                                <button 
                                    key={index}
                                    type="button" 
                                    onClick={(e)=>onClick(e)} 
                                    value={suggestion} 
                                    name="Location"
                                    className="suggestion-btn"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="form-section">
                        <label htmlFor="price" className="section-label">Price</label>
                        <div className="price-slider-container">
                            <span className="price-value">₹{min}</span>
                            <input 
                                type="range" 
                                min="5000" 
                                max="50000" 
                                step="300" 
                                name="price" 
                                value={details.price} 
                                onInput={onInput}
                                className="price-slider"
                            />
                            <span className="price-max">₹50000</span>
                        </div>
                    </div>

                    {/* Occupancy Type */}
                    <div className="form-section">
                        <p className="section-label">Occupancy Type</p>
                        <div className="radio-grid">
                            <div className="radio-option">
                                <input type="radio" name="occupancy" value="solo" id="solo" onChange={onChange}/>
                                <label htmlFor="solo" className="radio-label">
                                    <span className="radio-icon">👤</span>
                                    <span>Solo</span>
                                </label>
                            </div>
                            <div className="radio-option">
                                <input type="radio" name="occupancy" value="group" id="group" onChange={onChange}/>
                                <label htmlFor="group" className="radio-label">
                                    <span className="radio-icon">👥</span>
                                    <span>Group</span>
                                </label>
                            </div>
                            <div className="radio-option">
                                <input type="radio" name="occupancy" value="couples" id="couples" onChange={onChange}/>
                                <label htmlFor="couples" className="radio-label">
                                    <span className="radio-icon">💑</span>
                                    <span>Couples</span>
                                </label>
                            </div>
                            <div className="radio-option">
                                <input type="radio" name="occupancy" value="family" id="family" onChange={onChange}/>
                                <label htmlFor="family" className="radio-label">
                                    <span className="radio-icon">👨‍👩‍👧‍👦</span>
                                    <span>Family</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Comfort Amenities */}
                    <div className="form-section">
                        <p className="section-label">Choose the comfort from below</p>
                        <div className="checkbox-grid">
                            <div className="checkbox-option">
                                <input 
                                    type="checkbox" 
                                    id="AC" 
                                    name="comfort" 
                                    value="AC" 
                                    onChange={onClickCheck} 
                                    checked={details.comfort.includes("AC")} 
                                />
                                <label htmlFor="AC" className="checkbox-label">
                                    <span className="checkbox-icon">❄️</span>
                                    <span>AC</span>
                                </label>
                            </div>
                            <div className="checkbox-option">
                                <input 
                                    type="checkbox" 
                                    id="Wi-fi" 
                                    name="comfort" 
                                    value="Wi-fi" 
                                    onChange={onClickCheck} 
                                    checked={details.comfort.includes("Wi-fi")} 
                                />
                                <label htmlFor="Wi-fi" className="checkbox-label">
                                    <span className="checkbox-icon">📶</span>
                                    <span>Wi-fi</span>
                                </label>
                            </div>
                            <div className="checkbox-option">
                                <input 
                                    type="checkbox" 
                                    id="Geyser" 
                                    name="comfort" 
                                    value="Geyser" 
                                    onChange={onClickCheck} 
                                    checked={details.comfort.includes("Geyser")} 
                                />
                                <label htmlFor="Geyser" className="checkbox-label">
                                    <span className="checkbox-icon">🚿</span>
                                    <span>Geyser</span>
                                </label>
                            </div>
                            <div className="checkbox-option">
                                <input 
                                    type="checkbox" 
                                    id="Washing-machine" 
                                    name="comfort" 
                                    value="Washing-machine" 
                                    onChange={onClickCheck} 
                                    checked={details.comfort.includes("Washing-machine")} 
                                />
                                <label htmlFor="Washing-machine" className="checkbox-label">
                                    <span className="checkbox-icon">🧺</span>
                                    <span>Washing Machine</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Environment */}
                    <div className="form-section">
                        <p className="section-label">Choose Environment</p>
                        <div className="checkbox-grid">
                            <div className="checkbox-option">
                                <input 
                                    type="checkbox" 
                                    name="environment" 
                                    value="Social" 
                                    id="Social" 
                                    onChange={onClickCheck} 
                                    checked={details.environment.includes("Social")} 
                                />
                                <label htmlFor="Social" className="checkbox-label">
                                    <span className="checkbox-icon">🎉</span>
                                    <span>Social</span>
                                </label>
                            </div>
                            <div className="checkbox-option">
                                <input 
                                    type="checkbox" 
                                    name="environment" 
                                    value="Romantic" 
                                    id="Romantic" 
                                    onChange={onClickCheck} 
                                    checked={details.environment.includes("Romantic")} 
                                />
                                <label htmlFor="Romantic" className="checkbox-label">
                                    <span className="checkbox-icon">❤️</span>
                                    <span>Romantic</span>
                                </label>
                            </div>
                            <div className="checkbox-option">
                                <input 
                                    type="checkbox" 
                                    name="environment" 
                                    value="Modern" 
                                    id="Modern" 
                                    onChange={onClickCheck} 
                                    checked={details.environment.includes("Modern")} 
                                />
                                <label htmlFor="Modern" className="checkbox-label">
                                    <span className="checkbox-icon">🏙️</span>
                                    <span>Modern</span>
                                </label>
                            </div>
                            <div className="checkbox-option">
                                <input 
                                    type="checkbox" 
                                    name="environment" 
                                    value="Nature" 
                                    id="Nature" 
                                    onChange={onClickCheck} 
                                    checked={details.environment.includes("Nature")} 
                                />
                                <label htmlFor="Nature" className="checkbox-label">
                                    <span className="checkbox-icon">🌿</span>
                                    <span>Nature</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Rules */}
                    <div className="form-section">
                        <h3 className="section-title">Rules For Your Homes</h3>
                        <div className="checkbox-grid rules-grid">
                            <div className="checkbox-option">
                                <input 
                                    type="checkbox" 
                                    id="no-smoking" 
                                    name="rules" 
                                    value="no-smoking" 
                                    onChange={onClickCheck} 
                                    checked={details.rules.includes("no-smoking")} 
                                />
                                <label htmlFor="no-smoking" className="checkbox-label">
                                    <span className="checkbox-icon">🚭</span>
                                    <span>No-Smoking</span>
                                </label>
                            </div>
                            <div className="checkbox-option">
                                <input 
                                    type="checkbox" 
                                    id="no-parties" 
                                    name="rules" 
                                    value="no-parties" 
                                    onChange={onClickCheck} 
                                    checked={details.rules.includes("no-parties")} 
                                />
                                <label htmlFor="no-parties" className="checkbox-label">
                                    <span className="checkbox-icon">🎊</span>
                                    <span>No-Parties</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Cancellation */}
                    <div className="form-section">
                        <h3 className="section-title">Cancellation option</h3>
                        <div className="radio-grid cancellation-grid">
                            <div className="radio-option">
                                <input type="radio" name="cancellation" id="yes" value="yes" onChange={JustSee} />
                                <label htmlFor="yes" className="radio-label">
                                    <span className="radio-icon">✅</span>
                                    <span>Yes</span>
                                </label>
                            </div>
                            <div className="radio-option">
                                <input type="radio" name="cancellation" id="no" value="no" onChange={JustSee} />
                                <label htmlFor="no" className="radio-label">
                                    <span className="radio-icon">❌</span>
                                    <span>No</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Property Type */}
                    <div className="form-section">
                        <h3 className="section-title">Select Property Type</h3>
                        <div className="radio-grid">
                            <div className="radio-option">
                                <input type="radio" name="propertyType" value="apartment" id="apartment" onChange={JustSee} />
                                <label htmlFor="apartment" className="radio-label">
                                    <span className="radio-icon">🏢</span>
                                    <span>Apartment</span>
                                </label>
                            </div>
                            <div className="radio-option">
                                <input type="radio" value="house" name="propertyType" id="house" onChange={JustSee} />
                                <label htmlFor="house" className="radio-label">
                                    <span className="radio-icon">🏠</span>
                                    <span>House</span>
                                </label>
                            </div>
                            <div className="radio-option">
                                <input type="radio" value="bungalow" name="propertyType" id="bungalow" onChange={JustSee} />
                                <label htmlFor="bungalow" className="radio-label">
                                    <span className="radio-icon">🏡</span>
                                    <span>Bungalow</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Video Section */}
                    <div className="form-section media-section">
                        <h3 className="section-title">Property Video</h3>
                        <div className="video-container">
                            <video width="100%" height="300" controls ref={VideoRef} className="property-video">
                                <source src={mediagroup.video[0]} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <label htmlFor="video-upload" className="file-upload-label">
                            <span className="upload-icon">🎥</span>
                            <span>Upload Property Videos</span>
                        </label>
                        <input 
                            id="video-upload"
                            type="file" 
                            name="houseVideos" 
                            multiple 
                            onChange={(e)=>{
                                const files = e.target.files;
                                if (files.length > 2) {
                                    alert('You can only upload maximum 2 videos');
                                    e.target.value = '';
                                    return;
                                }
                                media(e);
                                setMe(e);
                            }}
                            className="file-input"
                            accept="video/mp4"
                        />
                    </div>

                    {/* Photo Section */}
                    <div className="form-section media-section">
                        <label htmlFor="photo-upload" className="file-upload-label">
                            <span className="upload-icon">📸</span>
                            <span>Upload Property Photos</span>
                        </label>
                        <input 
                            id="photo-upload"
                            type="file" 
                            name="housePhotos" 
                            multiple 
                            onChange={(e) => {
                                const files = e.target.files;
                                if (files.length > 3) {
                                    alert('You can only upload maximum 3 images');
                                    e.target.value = '';
                                    return;
                                }
                                setPhotoSpecific(e);
                            }}
                            className="file-input"
                            accept="image/jpeg"
                        />
                    </div>
                    {/* Payment Scanner Options */}
                    <div className="form-section">
                        <h3 className="section-title">💳 Upload Payment QR Codes</h3>
                        <div className="payment-scanners-row">
                            <div className="scanner-upload-option">
                                <label htmlFor="phonepe-upload" className="scanner-upload-label">
                                    <span className="scanner-icon">💜</span>
                                    <span className="scanner-name">PhonePe</span>
                                </label>
                                <input 
                                    id="phonepe-upload"
                                    type="file" 
                                    name="PhonePe" 
                                    onChange={setScannerPhoto}
                                    className="file-input"
                                    accept="image/jpeg"
                                />
                            </div>
                            
                            <div className="scanner-upload-option">
                                <label htmlFor="paytm-upload" className="scanner-upload-label">
                                    <span className="scanner-icon">💙</span>
                                    <span className="scanner-name">Paytm</span>
                                </label>
                                <input 
                                    id="paytm-upload"
                                    type="file" 
                                    name="Paytm" 
                                    onChange={setScannerPhoto}
                                    className="file-input"
                                    accept="image/jpeg"
                                />
                            </div>
                            
                            <div className="scanner-upload-option">
                                <label htmlFor="googlepay-upload" className="scanner-upload-label">
                                    <span className="scanner-icon">🔷</span>
                                    <span className="scanner-name">Google Pay</span>
                                </label>
                                <input 
                                    id="googlepay-upload"
                                    type="file" 
                                    name="GooglePay" 
                                    onChange={setScannerPhoto}
                                    className="file-input"
                                    accept="image/jpeg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        <span>🏠</span> List Property
                    </button>
                </form>
            </div>

            {/* Full Screen Spinner Overlay */}
            {isLoading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999
                }}>
                    <ClipLoader color="#ffffff" size={60} />
                    <span style={{ color: 'white', marginTop: '20px', fontSize: '1.2rem', fontWeight: '600' }}>
                        Uploading your property...
                    </span>
                </div>
            )}
        </>
    )
}

export default HomeHost;