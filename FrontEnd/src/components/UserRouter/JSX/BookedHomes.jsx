import { useState ,useEffect,useContext} from 'react' 
import '../Css/BookedHomes.css' 
import {noteContext} from './NoteState/NoteState'
function BookedHomes(){
  const {bookedhome,setBookedhome}=useContext(noteContext);
  useEffect( ()=>{
    const Retur=async ()=>{
    const url="http://localhost:3000/user/BookedHomes";
    const response=await fetch(url,{
      method:"GET",
      headers:{
        "Content-type":"application/json"
      },
      credentials:"include"
    })
    const doAll=async (response)=>{
      const res=await response.json();
      setBookedhome((prev)=>{
        const updated=res.arr;
        console.log(updated);
        return updated;
      })
    }
    await doAll(response);
  }
  Retur();
  }
,[])
   return (
   <> <div className="BookedHomes-Big"> 
   <h1>Your Booked homes</h1> 
   <div className="Large-div">
     {bookedhome.map((home, index) => { 
      {console.log("Here is home you got ",home)}
      return (
      <div className="BookedHomes-container" key={index}> 
      <div className="Image-BookedHomes"><img src={home.photo[0].housePhotos[1]} alt="" className="Image-div" /></div>
      {console.log(home)}
      <div className="Name-BookedHomes">{home.name}</div> 
      <div className="Price-BookedHomes">{home.price}
        </div> 
        </div>) 
        })} </div>
         </div> </>) }
         
         
         export default BookedHomes