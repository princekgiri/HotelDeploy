const express=require('express');
const dotenv=require('dotenv');
const HostRouter=express.Router();
const {save,LoginCheck,saveHomes,fetchHomes,editHostHome,HomeDelete,PersonalFetchAllMEssageMessage,getMessagesIntern,messageuserPersonal}=require('../Controller/HostController.js');
dotenv.config();
const crypto=require('crypto')
const {upload}=require('../components/upload.js');


const SaveInfo=async (req,res,next)=>{
    console.log("It is Operated till here");
    return await (await save(req.body.email,req.body.password))(req,res,next);
}
const Login =(req,res,next)=>{
    console.log("it is operating till here ",req.body);
    return LoginCheck(req.body.email,req.body.password)(req,res,next);
}
const saveHomesReq=async (req,res,next)=>{
    console.log("It went for saving too");
    return await saveHomes(req,res,next)(req);
}
const Homes=async (req,res,next)=>{
    return await (await fetchHomes(req,res,next))(req,res,next);
}
const editHomes= async (req,res,next)=>{
    return await editHostHome(req,res,next);
}
const deleteHome=(req,res)=>{
return HomeDelete(req,res);
}
const PersonalFetchAllMEssage=async (req,res,next)=>{
  return await PersonalFetchAllMEssageMessage(req,res,next)(req,res,next);
}
const getMessages=async (req,res,next)=>{
console.log("It got here for connection");
return await getMessagesIntern(req,res,next)(req,res,next);
}
const messageuser=async (req,res,next)=>{
  return await messageuserPersonal(req,res,next)(req,res,next);
}
const getSignature=async (req,res,next)=>{
const {VideoList,ImagesList,scanners}=req.body;
const apikey=process.env.API_KEY;
const cloudName=process.env.CLOUD_NAME;
const signaturesList=async ()=>{
    const VideossignaturesList=await VideoList.map(item=>{
        const timestamp=Math.floor(Date.now()/1000);
        const folder=item.folder;
        const public_id=item.public_id;
        const step=`folder=${folder}&public_id=${public_id}&timestamp=${timestamp}`
        const signature=crypto.createHash('sha1').update(step+process.env.API_SECRET).digest('hex');
        return {signature,timestamp,apikey,cloudName,folder,public_id}
    })
    const ImagessignaturesList=await ImagesList.map((item)=>{
        const timestamp=Math.floor(Date.now()/1000);
        const folder=item.folder;
        const public_id=item.public_id;
        const step=`folder=${folder}&public_id=${public_id}&timestamp=${timestamp}`
        const signature=crypto.createHash('sha1').update(step+process.env.API_SECRET).digest('hex');
        return {signature,timestamp,apikey,cloudName,folder,public_id}
    })
    const scannersList=await scanners.map((item)=>{
        const timestamp=Math.floor(Date.now()/1000);    
        const folder=item.folder;
        const public_id=item.public_id;
        const step=`folder=${folder}&public_id=${public_id}&timestamp=${timestamp}`
        const signature=crypto.createHash('sha1').update(step+process.env.API_SECRET).digest('hex');
        return {signature,timestamp,apikey,cloudName,folder,public_id}
    })
    console.log("scannersList is this ",scannersList);
    return {VideossignaturesList,scannersList,ImagessignaturesList};
}
const {VideossignaturesList,scannersList,ImagessignaturesList}=await signaturesList();
return res.json({
        VideossignaturesList:VideossignaturesList,
        scannersList:scannersList,
        ImagessignaturesList:ImagessignaturesList
    })}

const getSignatureForEdit=async(req,res,next)=>{
    const apikey=process.env.API_KEY;
    const cloudName=process.env.CLOUD_NAME;
    console.log("THe req and body is this in it ",req.body);
const {folder,public_id}=req.body;
const timestamp=Math.floor(Date.now()/1000);
const size=`folder=${folder}&public_id=${public_id}&timestamp=${timestamp}`;
const signature=crypto.createHash('sha1').update(size+process.env.API_SECRET).digest('hex');
console.log("ISgnature sent is ",signature);
console.log("and All above sent is ",apikey,cloudName,timestamp,signature,public_id,folder);
res.json({
    apikey:apikey,
    cloudName:cloudName,
    timestamp:timestamp,
    signature:signature,
    public_id:public_id,
    folder:folder
})
return {apikey,cloudName,timestamp,signature,public_id,folder};
}
HostRouter.post('/Login',Login);
HostRouter.post('/get-Signature',getSignature);
HostRouter.post('/SignUp',SaveInfo);
HostRouter.post('/save',saveHomesReq);
HostRouter.get('/fetchHomes',Homes);
HostRouter.post('/editHome/:id' ,editHomes);
HostRouter.get('/deleteHome/:id',deleteHome);
HostRouter.post("/PersonalFetchAllMEssage",PersonalFetchAllMEssage);
HostRouter.get("/getMessages",getMessages);
HostRouter.post("/messageuser",messageuser);
HostRouter.post("/getSignatureForEdit",getSignatureForEdit);



module.exports=HostRouter