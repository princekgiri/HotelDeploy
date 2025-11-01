import {createContext,useState,useEffect,useRef} from 'react'
const noteContext=createContext();

function NoteState(props){

const [ArrayList,setArrayList]=useState([
  ]);
  const [startpage,setStartPage]=useState(0);
  const [Endpage,setEndPage]=useState(12);
  const loginstate=useRef(false);
  const [showPersonal,setShowpersonal]=useState({
    user:"",
    home:""
  });
  const [alert,setAlert]=useState({
    showAlert:"false",
    type:'error',
    message:'Please pick the second date after First date not Before it '
  });
  const showAlert=useRef("true");
  const [favourite,setFavourite]=useState();
  const [bookedhome,setBookedhome]=useState([]);
  const [totalmessages,setTotalmessages]=useState([]);
  const [details,setDetails]=useState({
    favourites:[],
    BookedFinal:[]
  });
  const [date,setDate]=useState({
    FirstDate:'',
    SecondDate:''
  });
  useEffect(()=>{
    console.log(loginstate.current);
    // loginstate.current=localStorage.getItem('loginstate');
    console.log("The value at local Storage is ",localStorage.getItem('loginstate'))
    console.log(loginstate.current);
  },[loginstate])
  return(
  <noteContext.Provider value={{ArrayList,setArrayList,setStartPage,startpage,Endpage,setEndPage,loginstate,favourite,setFavourite,setBookedhome,bookedhome,details,setDetails,showPersonal,setShowpersonal,totalmessages,setTotalmessages,alert,setAlert,showAlert,date,setDate}}>
  {props.children}
</noteContext.Provider>)
}

export default NoteState;
export { noteContext };