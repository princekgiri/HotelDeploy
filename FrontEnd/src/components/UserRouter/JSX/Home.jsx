import React, { useEffect, useState ,useContext,useRef} from 'react';
import '../Css/Home.css';
import {noteContext} from './NoteState/NoteState'
import {HomeArrayList} from './HomeArrayList'
import useSend from './FunctionToBackend'
import Alert from './Alert'
import {useNavigate} from 'react-router-dom'
import API_BASE_URL from '../../../config'

function Home() {
  const Navigate=useNavigate();
  const {send,profileInfo,fetchMessages,messages, setMessages}=useSend();
  const {ArrayList,setArrayList,Endpage,setEndPage,setStartPage,startpage,loginstate,alert,setAlert}=useContext(noteContext);
  const [load,setLoad]=useState(localStorage.getItem('loginstate'));
  const [pages,setPages]=useState(0);
  useEffect(()=>{
    //Login Should be Done or not
    loginstate.current=localStorage.getItem('loginstate');
    // console.log("It ran for ",localStorage.getItem('loginstate'));
    // console.log("It ran for ",loginstate);
    if(loginstate){
      console.log("It's ok ",loginstate);
    }
    else{
      console.log("No it is not ok ");
      Navigate("/");
    }
  },[loginstate]);

  const ChangeLogin=async ()=>{
    const url=`${API_BASE_URL}/user/Logout`
    const response=await fetch(url,{
      method:'GET',
      credentials:"include"
    })
    const res=response.json();
    localStorage.setItem('loginstate',false);
    localStorage.removeItem('email');
    localStorage.removeItem('email');
    localStorage.removeItem('OwnerEmailToFetch');
    localStorage.removeItem('Owneremail');
    localStorage.removeItem('Ownername');
    localStorage.removeItem('OwnernameToShow');
    localStorage.removeItem('Username');
    localStorage.removeItem('home');
    localStorage.removeItem('UserEmail');
    localStorage.removeItem('useremailToFetch');
    localStorage.removeItem('sentData');
    Navigate("/");
  }

  const [price, setPrice] = useState(1000);
  const [Filters, setFilter] = useState({
    location:"",
    comfort: [],
    Price: 0,
    Property: "",
    cancellation:"",
    environment:[],
    search:'',
    FirstDate:'',
    SecondDate:''
  })
  const [checked,setChecked]=useState(false);
  const [button,setButton]=useState([])
  const totalPages=[]
  useEffect(()=>{
    for (let i=0;i<pages;i++){
  totalPages.push(<button key={`${i}`} className="Pagi-buttons ToChange" checked name="firstButton" id={`buttonToChnage${i}`} value={i}  onClick={ChangePage} >{i+1}</button>)
}
  console.log("the nummber of buttons i got is here ",totalPages);
setButton(()=>{
  const updated=totalPages;
  console.log("the nummber of buttons in setButton is here ",updated);
  return updated;
})
},[pages])
  const Cancellation=(e)=>{ 
    e.preventDefault();
    const {value,name}=e.currentTarget;
    // Always use setFilter and never mutate Filters directly
    setFilter(prev => {
      if (prev[name] === value) {
        return { ...prev, [name]: '' };
      }
      return { ...prev, [name]: value };
    });
  }
  useEffect(() => {
    ////console.log("Use Effect For Button Runs Here");
    const button = document.getElementById("span-Filter");
    const form = document.querySelector(".hidden");
    button.addEventListener("click", () => {
      // show modal and reset its scroll so it opens centered and at top
      form.classList.remove("hidden");
      try{ form.scrollTop = 0; const content = form.querySelector('.content-area'); if(content) content.scrollTop = 0; }catch(e){}
    });
    const cross = document.getElementById("cross");
    cross.addEventListener("click", () => {
      form.classList.add("hidden");
    })
    fetchMessages();
  }, [])
  const count=useRef(0);


  
  useEffect(() => {
    const toRun=async ()=>{
    console.log("Filters changed naale chal pena ehne");
    let sentData={};
    //////console.log("Filter is THis ", Filters);
    if (Filters.comfort.length > 0) sentData.comfort = Filters.comfort;
    if (Filters.environment.length > 0) sentData.environment = Filters.environment;
    if (Filters.Property) sentData.Property = Filters.Property;
    if (Filters.Price > 0) sentData.Price = Filters.Price;
    if (Filters.cancellation) {
      sentData.cancellation = Filters.cancellation;}
    if(Filters.search) sentData.searchFirst=Filters.search?sentData.searchFirst=Filters.search.split(" ")[0]:''
    if(Filters.search) sentData.searchSecond=Filters.search?sentData.searchSecond=Filters.search.split(" ")[1]:''
      if(sentData.Price||sentData.Property||sentData.environment||sentData.comfort||sentData.cancellation || sentData.searchFirst || sentData.searchSecond){
        console.log("Heloo it is making it empty");
    localStorage.setItem('sentData',JSON.stringify(sentData));}
    const ParsedData=localStorage.getItem('sentData');
    const setData=JSON.parse(ParsedData);
    console.log("setData is being set like this",setData);
    let dataGot;
    let ToRUn=true;
    if(setData){
      console.log("Inside running and want to see setData see then ",setData);
    dataGot=await send(setData);  
    console.log("what is got in hotels ",dataGot.Hotels);
    setArrayList(dataGot.Hotels);
    ToRUn=false
    }
    else{
      dataGot=await send(sentData);
      console.log("what is got in hotels but it is outside ",dataGot.Hotels)
    }
    console.log("setData is here ",setData);
    if(count.current>=1 && ToRUn){
      ToRUn=true
      console.log("It is running everytime does not matter to it ");
      setPages(Math.ceil(dataGot.lengthOfHotels/12))
    setArrayList(dataGot.Hotels);
  }
    count.current++;
    ////console.log("Sent to Backend");
  }
toRun();
}, [Filters])
useEffect(()=>{
console.log("Hello");
},[checked])


  const Change = (e) => {
    const { name, value } = e.currentTarget;
    ////console.log("Chnage Function Runs Here");
    setPrice(e.currentTarget.value);
    setFilter((prev) => {
      const updated = { ...prev, [name]: value };
      ////console.log("Here is the upadted Array of the Price", updated);
      return updated;
    })
  };


  const previousVa=useRef(1);
 const ChangePage=(e)=>{
  e.preventDefault();
  const {value}=e.currentTarget;
  const btn=document.getElementById(`buttonToChnage${value}`);
  btn.setAttribute('checked',true);
  console.log("the value to change page is ",value);
  const Toincrease=value*12;
  const Toadd=Toincrease+1*12;
  setStartPage(()=>{
    const updated=Toincrease;
    console.log("The to Update in start is ",updated);
    return updated;
  })
  setEndPage(()=>{
    const updated=Toadd;
    console.log("The to Update in end is ",updated);
    return updated;
  });
  previousVa.current=value;
 }


  //Function to add in arrays of something
  const add = (e) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    console.log("What i got from values is ",value);
    if (!name) {console.log("i am returning from here ");return};
    setFilter((prev) => {
      // Ensure we always work with an array for this key and return the full state object.
      const current = Array.isArray(prev[name]) ? prev[name] : [];
      if (current.includes(value)) {
        return { ...prev, [name]: current.filter(item => item !== value) };
      }
      return { ...prev, [name]: [...current, value] };
    })
  }
  const [states, setStates] = useState(["mumbai,maharashtra",
  "pune,maharashtra",
  "nagpur,maharashtra",
  "nashik,maharashtra",
  "new delhi,delhi",
  "dwarka,delhi",
  "rohini,delhi",
  "bangalore,karnataka",
  "mysore,karnataka",
  "mangalore,karnataka",
  "chennai,tamil nadu",
  "coimbatore,tamil nadu",
  "madurai,tamil nadu",
  "lucknow,uttar pradesh",
  "kanpur,uttar pradesh",
  "noida,uttar pradesh",
  "agra,uttar pradesh",
  "ahmedabad,gujarat",
  "surat,gujarat",
  "vadodara,gujarat",
  "rajkot,gujarat",
  "jaipur,rajasthan",
  "udaipur,rajasthan",
  "jodhpur,rajasthan",
  "kota,rajasthan",
  "patna,bihar",
  "gaya,bihar",
  "bhagalpur,bihar",
  "ranchi,jharkhand",
  "jamshedpur,jharkhand",
  "dhanbad,jharkhand",
  "bhopal,madhya pradesh",
  "indore,madhya pradesh",
  "gwalior,madhya pradesh",
  "jabalpur,madhya pradesh",
  "chandigarh,chandigarh",
  "amritsar,punjab",
  "ludhiana,punjab",
  "jalandhar,punjab",
  "patiala,punjab",
  "dehradun,uttarakhand",
  "haridwar,uttarakhand",
  "nainital,uttarakhand",
  "guwahati,assam",
  "silchar,assam",
  "dibrugarh,assam",
  "bhubaneswar,odisha",
  "cuttack,odisha",
  "rourkela,odisha",
  "kolkata,west bengal",
  "howrah,west bengal",
  "durgapur,west bengal",
  "siliguri,west bengal",
  "hyderabad,telangana",
  "warangal,telangana",
  "karimnagar,telangana",
  "vijayawada,andhra pradesh",
  "visakhapatnam,andhra pradesh",
  "tirupati,andhra pradesh",
  "panaji,goa",
  "margao,goa",
  "shimla,himachal pradesh",
  "manali,himachal pradesh",
  "kangra,himachal pradesh",
  "srinagar,jammu and kashmir",
  "jammu,jammu and kashmir",
  "leh,ladakh",
  "imphal,manipur",
  "aizawl,mizoram",
  "kohima,nagaland",
  "itanagar,arunachal pradesh",
  "agartala,tripura",
  "gangtok,sikkim",
  "shillong,meghalaya",
  "port blair,andaman and nicobar islands",
  "karaikal,puducherry",
  "puducherry,puducherry",
  "kavaratti,lakshadweep",
  "dadra,dadra and nagar haveli and daman and diu",
  "daman,dadra and nagar haveli and daman and diu"
]);
const [list,setList]=useState([""]);
  const [search,setSearch]=useState("");

  //Use Effect for hiding the suggesstion
  const hide=useRef(0);
  useEffect(()=>{
    const buttonTo=document.querySelector(".Suggestion");
    const ListButtonsDiv=document.querySelector(".ListButtonsDiv");
    if(buttonTo  && search!='' && hide.current==0){
      buttonTo.classList.remove("hiddenAt");
      ////console.log("UseEffect 1");
    }
    if(ListButtonsDiv  && search!='' && hide.current==0){
      buttonTo.classList.remove("hiddenAt");
      ////console.log("UseEffect 2");
    } 
    if(hide.current>0 || search==''){
      buttonTo.classList.add("hiddenAt");
      ////console.log("UseEffect Last");
      hide.current=0;
    }
  },[search]);
  const OnChangeSearch=(e)=>{
    e.preventDefault();
    const {value,name}=e.currentTarget;
    ////console.log("value is this ",value);
    setFilter((prev)=>{
      const updated={...prev,[name]:value}
      return updated;
    })
    setList(()=>{
      const updated=states.filter(state=>state.includes(value.toLowerCase())).map(state=>{
        const word=state.split(",");
        const toReturn = word
  .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
  .join(" ");
return toReturn;
      })
      return updated;
      })
    setSearch(()=>{
      ////console.log("The Value Till here is in Upper ",value);
      const updated=value;
      return(updated);
    });
    
  }
  const Property = (e) => {
    const { name, value } = e.currentTarget;
    setFilter((prev) => {
      const updated = { ...prev, [name]: value };
      ////console.log(updated);
      return updated;
    })


  }
  const Tosee = (e) => {
    e.preventDefault();
  const { value } = e.currentTarget; // yaha save kar liya
  setSearch(() => {
    ////console.log("The Value Till here is in Tosee", value);
    const updated = value; 
    const buttonTo=document.querySelector(".Suggestion");
    buttonTo.addEventListener("click",()=>{
       buttonTo.classList.add("hiddenAt");
     })
    return updated;
  });
  setFilter((prev)=>{
    const updated={...prev,search:value};
    return updated;
  })
  hide.current++;
};
  

  const getDateSearch=(e)=>{
    e.preventDefault();
  }
  
  const RemoveFil=()=>{
    localStorage.removeItem('sentData');
    setFilter({
      location:"",
    comfort: [],
    Price: 0,
    Property: "",
    cancellation:"",
    environment:[]
    });
    ////console.log("Filters is here ",Filters);
  }
  const profile=()=>{
    Navigate("/Profile");
  }
  return (
    <>
    {alert.showAlert && <Alert/>}
      <div className="Home">
        <div className="Heading">Home</div>
        <div className="notification-bell">
          <span className="bell-icon" onClick={(e)=>{Navigate("/AllMessages");console.log("s Navigating")}}>🔔</span>
          {messages > 0 && <span className="message-count">{messages}</span>}
        </div>
        <button className="profile-btn" onClick={profile}>
          <span className="profile-icon-span">👤</span>
          <span className="profile-text">Profile</span>
        </button>
        <button className="favourites-btn" onClick={() => Navigate('/Favourites')}>
          <span className="fav-icon">❤️</span>
          <span className="fav-text">Favourites</span>
        </button>
        <button className="booked-homes-btn" onClick={() => Navigate('/ViewHomesBooked')}>
          <span className="booked-icon">🏡</span>
          <span className="booked-text">Available Soon</span>
        </button>
        <button id="Log-Out" onClick={ChangeLogin}>Log Out</button>
        <div className="Navbar">
          
            {/* From Here I Will Write Search */}
            <form>
              <input
              list="suggestions"
              type="search"
              id="site-search"
              name="search"
              placeholder="Type Any Place You want"
              className="search-Input"
              onChange={OnChangeSearch}
              value={Filters.search}
              />
              <div className="Suggestion hiddenAt">
                <ul >
              {list.map((lists,index)=>(
                  <div key={index} className="ListButtonsDiv" ><button className="ListButtons" key={index} onClick={Tosee} value={lists}>{index}&nbsp;.{
                    lists}</button></div>
              ))}
              </ul>
              </div>
              
            </form>
            


            

            {/*From Here I will Write Filter Code*/}
            <i className="fas fa-filter"></i>
            <button type="button" id="span-Filter">Filter</button>
            <button className="Clear-All-Filters" onClick={RemoveFil}>Clear All Filters</button>
        </div>
        <form action="#" method="GET" id="form-1" className="hidden">
          <div className="container-1 ">
            <div className="filters">
              Filters
              <button type="button" id="cross">&times;</button>
            </div>
            <div className="content-area">
              <h1 id="h01">Recommended for you</h1>
              <div className="container">
                <button 
                  type="button"
                  className={`ImageDiv ${Filters.comfort.includes("Geyser")?"checked":''}`}
                  onClick={(e)=>{add(e)}}
                  name="comfort"
                  value="Geyser"
                >
                  <img src="images-LoginPage\Geyser.jpeg" className="ImageID" />
                  <p>Geyser</p>
                </button>

                <button
                  type="button"
                  className={`ImageDiv ${Filters.comfort.includes("Wi-fi")?"checked":''}`}
                  onClick={(e)=>{add(e)}}
                  name="comfort"
                  value="Wi-fi"
                >
                  <img src="/images-LoginPage/wifi.jpg" className="ImageID" />
                  <p>Free Wifi</p>
                </button>

                <button
                  type="button"
                  className={`ImageDiv ${Filters.comfort.includes("Washing-Machine")?"checked":''}`}
                  onClick={(e)=>{add(e)}}
                  name="comfort"
                  value="Washing-Machine"
                >
                  <img src="/images-LoginPage/washing.jpg" className="ImageID" />
                  <p>Washing Machine</p>
                </button>
                <button
                  type="button"
                  className={`ImageDiv ${Filters.comfort.includes("AC")?"checked":''}`}
                  onClick={(e)=>{add(e)}}
                  name="comfort"
                  value="AC"
                >
                  <img src="/images-LoginPage/Ac.jpeg" className="ImageID" />
                  <p>Ac</p>
                </button>

              </div>


                <h1 id="h01">Free Cancellation</h1>
              <div className="Cancellation">
                <div className="conatiner-of-buttons">
                  <button className="Type-buttons" name="cancellation" value="yes" onClick={Cancellation} type="submit">Yes</button>
                  <button className="Type-buttons" name="cancellation" value="no" onClick={Cancellation}
                    type="button" >No</button>
                </div>
              </div>

              

              <div className="PriceSlider">
                <h1 id="h01">Price Range</h1>
                <span className="starting starting-first">{price}</span>
                <input
                  type="range"
                  id="priceRange"
                  min="7800"
                  max="50000"
                  step="100"
                  value={price}
                  onInput={Change}
                  name="Price"
                />
                <span className="starting">10000</span>
                <p id="pricePara">Price: <span id="price">{price}</span> ₹</p>
              </div>

              <h1 id="h01">Property Type</h1>
              <div className="Property-Type">
                <button className="Property-buttons" name="Property" value="house" onClick={Property} type="button">house</button>
                <button className="Property-buttons" name="Property" value="apartment" onClick={Property} type="button">apartment</button>
                <button className="Property-buttons" name="Property" value="bungalow" onClick={Property} type="button">bungalow</button>
                <button className="Property-buttons" name="Property" value="apartment" onClick={Property} type="button">apartment</button>

              </div>
              
              <h1 id="h01">Environment</h1>
              <div className="EnvironmentOptions">
                <label className="env-checkbox">
                  <input type="checkbox" name="environment" value="Social" onClick={add}/>
                  <span>Social</span>
                </label>
                <label className="env-checkbox">
                  <input type="checkbox" name="environment" value="Romantic" onClick={add}/>
                  <span>Romantic</span>
                </label>
                <label className="env-checkbox">
                  <input type="checkbox" name="environment" value="Modern" onClick={add}/>
                  <span>Modern</span>
                </label>
                <label className="env-checkbox">
                  <input type="checkbox" name="environment" value="Nature" onClick={add}/>
                  <span>Nature</span>
                </label>
              </div>
            </div>
          </div>
        </form>
        <div className="HomeArrayListSoo">
          {/* {console.log("loginstate is", typeof(loginstate),loginstate.current)} */}
          {localStorage.getItem('loginstate') && <HomeArrayList className="Component-HomeArrayList" pages={pages} setPages={setPages}/>}
        </div>
        <h1 id="extra">Pages</h1>
        {/* {console.log("THe number of Pages i got here in Home is",pages)} */}
        <div className="Pagination">
        {button.map(item=> item )}
        </div>
      </div>
    </>
  );
}

export default Home;