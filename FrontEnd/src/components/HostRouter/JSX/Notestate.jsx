import {createContext,useRef,useState,useEffect} from 'react'
const noteContextSo=createContext();

const NoteStateHost=(props)=>{
    const logincheck=useRef(localStorage.getItem('loginstate'));
    const [logincheckstate,setLogincheckstate]=useState(logincheck.current);
    const [totalmessages,setTotalmessages]=useState([]);
    const [selectedHome, setSelectedHome] = useState();
    const [profileHost,setProfileHost]=useState();
        const [back,setBack]=useState(true);
    
    // useEffect(()=>{
    //     logincheck.current=localStorage.getItem('loginstate');
    // },[logincheckstate])
    return(
<noteContextSo.Provider value={{logincheck,logincheckstate,totalmessages,setTotalmessages,setLogincheckstate,selectedHome, setSelectedHome,profileHost,setProfileHost,back,setBack}}>
{props.children}
</noteContextSo.Provider>)
}


export default NoteStateHost
export  {noteContextSo}