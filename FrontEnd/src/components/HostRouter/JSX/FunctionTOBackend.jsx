import {useState,useContext} from 'react'
import {noteContextSo} from './Notestate'



const useSend=()=>{
const  {totalmessages,setTotalmessages,selectedHome, setSelectedHome}=useContext(noteContextSo);
const [messagesCount,setMessageCount]=useState(0);
    const save=async (body)=>{
        const url="http://localhost:3000/host/save";
        const response=await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body),
        credentials:"include"
        });
        const res=await response.json();
        return res.new;
    }



    //ToSend And Edit the Home
    var toReturn=selectedHome;
    const toSend = async (body, id) => {
  console.log("Body and id is this ", body, id);

  for (const [key, value] of Object.entries(body)) {
    if (key === "photo" && Array.isArray(value)) {
      const photoObj = value[0];

      for (const [innerKey, innerValue] of Object.entries(photoObj)) {
        if (Array.isArray(innerValue)) {
          // handle arrays like houseVideos, housePhotos
          const uploadedUrls = [];

          for (const item of innerValue) {
            if (typeof item !== "string") {
              const urlTSend = "http://localhost:3000/host/getSignatureForEdit";

              const got = await fetch(urlTSend, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  public_id: item.name,
                  folder: innerKey === "houseVideos" ? "videos" : "images",
                }),
              });

              const { apikey, cloudName, timestamp, signature, public_id, folder } = await got.json();
              console.log("THe value gtot from above ",apikey, cloudName, timestamp, signature, public_id, folder);
              const formData = new FormData();
              formData.append("file", item);
              formData.append("public_id", public_id);
              formData.append("folder", folder);
              formData.append("api_key", apikey);
              formData.append("signature", signature);
              formData.append("timestamp", timestamp);

              const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
              const response = await fetch(uploadUrl, {
                method: "POST",
                body: formData,
              });
              const res = await response.json();
              uploadedUrls.push(res.secure_url);
            } else {
              uploadedUrls.push(item);
            }
          }
          console.log("so teh array i got is ",uploadedUrls);
          // Update photo array field after all uploads complete
          const updatedYes = {
              ...selectedHome,
              photo: [{ ...toReturn.photo[0], [innerKey]: uploadedUrls }],
            };
            toReturn=updatedYes;
          setSelectedHome((prev)=>{
            const updated=updatedYes;
            console.log("updated inside updated is this updateed ",updated);
            return updated;
          });
        } else {
          // handle single file fields (not array)
          if (typeof innerValue !== "string") {
            const urlTSend = "http://localhost:3000/host/getSignatureForEdit";

            const got = await fetch(urlTSend, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                public_id: innerValue.name,
                folder: innerKey,
              }),
            });


            const { apikey, cloudName, timestamp, signature, public_id, folder } = await got.json();
            console.log("THe value gtot from above ",apikey, cloudName, timestamp, signature, public_id, folder);
            const formData = new FormData();
            formData.append("file", innerValue);
            formData.append("public_id", public_id);
            formData.append("folder", folder);
            formData.append("api_key", apikey);
            formData.append("signature", signature);
            formData.append("timestamp", timestamp);

            const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
            const response = await fetch(uploadUrl, {
              method: "POST",
              body: formData,
            });
            const res = await response.json();
            const secure_url = res.secure_url;
            console.log("for ",innerKey," is this ",secure_url);
            const updatedYNo = {
                ...selectedHome,
                photo: [{ ...toReturn.photo[0], [innerKey]: secure_url }],
              };
              toReturn=updatedYNo;
              console.log("secure_url got so far are ",secure_url);
            setSelectedHome((prev)=>{
            const updated=updatedYNo;
            console.log("updated inside updated is this updateed for single ",updated);
            return updated;
          });
          }
        }
      }
    }
  }

  console.log("✅ All uploads done for id:", id);
}
async function ToCall(body, id){
await toSend(body, id);
await new Promise((resolve,reset)=>setTimeout(resolve,50));
console.log("The nEw Home To Send is now ",toReturn);
const uploadUrl = `http://localhost:3000/host/editHome/${id}`;
            const response = await fetch(uploadUrl, {
              method: "POST",
              headers:{
                "Content-Type":"application/json"
              },
              body: JSON.stringify({newHome:toReturn,id:id}),
            });
            const res = await response.json();
            setSelectedHome(res.home);
};

    const PersonalFetchAllMEssage=async (Ownername,Owneremail,useremail,role)=>{
      const url=`http://localhost:3000/${role}/PersonalFetchAllMEssage`;
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
    const TOSendToMEssage=async (OwnerDetails,UserDetails,message,role)=>{
            const url=`http://localhost:3000/${role}/messageuser`;
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
    const fetchMessages=async ()=>{
    const role=localStorage.getItem('role');
    const url=`http://localhost:3000/${role}/getMessages`;
    const response=await fetch(url,{
        method:"GET",
        credentials:"include"
    });
    const res=await response.json();
    console.log("THe number si this ",res.counting);
    setTotalmessages(res.list);
    setMessageCount(res.counting);
}
    return {save,toSend,PersonalFetchAllMEssage,TOSendToMEssage,fetchMessages,messagesCount,setMessageCount,ToCall};
}
export default useSend