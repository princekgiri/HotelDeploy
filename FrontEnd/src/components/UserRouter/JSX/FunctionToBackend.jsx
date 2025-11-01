import {useContext,useState} from 'react'
import {noteContext} from './NoteState/NoteState'
import API_BASE_URL from '../../../config'

export let lengtho;

const useBackend = () => {
  const {loginstate,setLoginstate,details,setDetails,insideMessage,setInsidMessage} = useContext(noteContext);
  
  const send = async (data) => {
    if(loginstate){
      const url = `${API_BASE_URL}/user/filters`;
      const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      const res = await response.json();
      const Allusers = res;
      return Allusers;
    }
  };

  const SignUpUsers = async (data,role) => {
    const url = `${API_BASE_URL}/${role}/SignUp`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const res = await response.json();
    console.log(res.message||res.Saved);
    if(res.errors) {
      res.errors.forEach(res => {
      });
    }
  };

  const LoginCheck = async (data,role) => {
    console.log("The Sent data is here ", data);
    const url = `${API_BASE_URL}/${role}/Login`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
      body: JSON.stringify(data)
    });
    const res = await response.json();
    console.log("Here is the Result ", res.value);
    //console.log("The cookie that we got is ",document.cookie);
    if(res.value){
      return true;
    }
    else{
      return false;
    }
    
  };

  const RemoveHome=async (id)=>{
    const url=`${API_BASE_URL}/user/removeFav/${id}`;
    console.log(id);
    const response=await fetch(url,{
      method:"GET",
      header:{
        "Content-Type":"application/json"
      },
      credentials:"include"
    })
    const res=await response.json();
    console.log("Result Array is ",res.result);
    return res;
  }
  const profileInfo=async ()=>{
    const url=`${API_BASE_URL}/user/profile`;
    console.log("Its is coming here");
    const response=await fetch(url,{
      method:"GET",
      credentials:"include"
    })
    const res=await response.json();
    console.log(res.message);
    setDetails(()=>{
      const updated=res.message;
      return updated;
    })
  }
  const TOSendToMEssage=async (OwnerDetails,UserDetails,message,role)=>{
    // console.log("Now ab bhene wala chalega ");
            const url=`${API_BASE_URL}/${role}/messageuser`;
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({OwnerDetails,UserDetails,message:message,role:role}),
                credentials:"include"
            });
            const res=await response.json();
            console.log(res.msg);
            return res.msg;
    }
    const PersonalFetchAllMEssage=async (Ownername,Owneremail,useremail,role)=>{
      console.log("Abhi fetch wala chal rha ahi without something ");
      const url=`${API_BASE_URL}/${role}/PersonalFetchAllMEssage`;
      const response=await fetch(url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({Ownername:Ownername,Owneremail:Owneremail,useremail:useremail})
      });
      const res=await response.json();
      console.log("Rhis is the whole chat between them ",res.chats);
      
      return res.chats;
    }
const  {totalmessages,setTotalmessages}=useContext(noteContext);
  const [messages, setMessages] = useState(0);

    const fetchMessages=async ()=>{
    try {
      const role=localStorage.getItem('role');
      console.log("Kyu nhi chalega ");
      const url=`${API_BASE_URL}/${role}/getMessages`;
      const response=await fetch(url,{
          method:"GET",
          credentials:"include"
      });
      
      if (!response.ok) {
        console.log("Not authenticated, skipping messages fetch");
        return;
      }
      
      const res=await response.json();
      console.log(res.list);
      console.log("Counting is ",res.counting);
      setTotalmessages(res.list);
      setMessages(res.counting);
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
}


  return {send, SignUpUsers, LoginCheck,RemoveHome,profileInfo,TOSendToMEssage,PersonalFetchAllMEssage,fetchMessages,totalmessages,messages, setMessages};

};


export default useBackend;