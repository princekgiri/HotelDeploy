const HostList=require('../Model/HostList.js');
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const MessageDb=require('../Model/Messages.js')
const Hotelnames=require('../Model/HotelList.js');
const path=require('path');
exports.save=async (email,password)=>{
const salt=await bcrypt.genSalt(10);
console.log("Salt",salt);
const secPass=await bcrypt.hash(password,salt);
return  async (req,res,next)=>{
    console.log("It reached here For saving",req.body);
const host=new HostList({
    name:req.body.name,
    password:secPass,
    email:email,
    role:req.body.role
});
await host.save();
return res.send({message:"Host created"});
}
}

exports.LoginCheck=(email,password)=>{
return async (req,res,next)=>{
const user=await HostList.findOne({email:email});
if(!user){
    console.log("No it did not came here");
    return res.status(400).send(false);
}
req.session.user={
    id:user._id,
    name:user.name,
    role:user.role,
    email:user.email
}
console.log("No it did not came here 2323");
const compare=await bcrypt.compare(password,user.password);
const ToComareHash=password===user.password;
if(compare || ToComareHash){
    console.log("It came here");
    return res.send({value:true});
}
}
}

exports.fetchHomes=async (req,res,next)=>{
    return async (req,res,next)=>{
        const idofUser=req.session.user.id;
        const homes=await HostList.findById(idofUser).populate("MyPostedHomes");
        console.log(homes);
        return res.send(homes);
    };
}


exports.getMessagesIntern= (req,res,next)=>{
return async (req,res,next)=>{
const useremail=req.session.user.email;
const list=await MessageDb.find({"Owner.email":useremail});
console.log("List is this ",list);
if(!list){
return res.send({list:"Sorry No Messages"});
}
else{
  var counting=0;
  list.forEach(item=>counting=counting+item.Owner.newRead-item.Owner.read);
  return res.send({list:list,counting:counting});
}
}
}



exports.messageuserPersonal=(req,res,next)=>{
return async (req,res,next)=>{
  // const email=req.body;
  const OwnerDetails=req.body.OwnerDetails;
  const message=req.body.message;
  const UserDetails=req.body.UserDetails;
  const role=req.body.role;
  let secondrole='';
  if(role=='user'){
    secondrole='host'
  }
  else{
    secondrole='user'
  }
  const messageFind=await MessageDb.findOne(
   {"User.email":UserDetails.email,"Owner.email":OwnerDetails.email}
  )
  if(!messageFind){
    const Newmessage=new MessageDb({
      Owner:OwnerDetails,
      User:UserDetails,
      messages:{from:role,to:secondrole,message:message}
    });
    await Newmessage.save();
  console.log("Here is New made Message ",Newmessage);
  }
  else{
    // messageFind.User.read=messageFind.User.newRead;
    messageFind.User.newRead=messageFind.User.newRead+1;
    messageFind.messages.push(
       {from:role,to:secondrole,message:message}
    )
    await messageFind.save();
  }
  return res.send({msg:"Done Verything"});
}
}


exports.PersonalFetchAllMEssageMessage=(req,res,next)=>{
  const Owneremail=req.body.Owneremail;
  const useremail=req.body.useremail;
  console.log("Tell me you got this ",useremail,Owneremail);
  return async (req,res,next)=>{
    const AllMessage=await MessageDb.findOne(
      {"Owner.email":Owneremail,"User.email":useremail}
    )
    console.log(AllMessage);
    if(AllMessage){
      AllMessage.Owner.read=0;
      AllMessage.Owner.newRead=0;
      await AllMessage.save();
      console.log("All Message is this ",AllMessage);
      return res.send({chats:AllMessage});
    }
    else{
      return res.send({chats:" Nothing to show in messages "});
    }
  }
}


exports.editHostHome=async (req,res,next)=>{
const id=req.params.id;
console.log("Id got is this ",id);
console.log("New Home is here ",req.body);
const newHome=req.body.newHome;

const returnedHome=await Hotelnames.findByIdAndUpdate(
  new mongoose.Types.ObjectId(id),  
  newHome,
    {new:true,overwrite:true}
)
console.log(returnedHome);
res.send({msg:"Updated",home:returnedHome});
}


//HomeDelete
exports.HomeDelete=async (req,res)=>{
    const id=req.params.id;
    console.log("Id is here ",id);
const home=await Hotelnames.findOneAndDelete(
    {$expr:{$eq:[{$toString:"$_id"},id]}}
)
if(!home){
    console.log("Failed")
return res.send({msg:"Home Not Found"});
}
else{
    console.log("Success")
    return res.send({msg:"Home Deleted Succesfully"})
}
}


exports.saveHomes=(req,res,next)=>{
return async (req)=>{
    const email=req.session.user.email;
    const OwnerName=req.session.user.name;
    console.log("req body is this ",req.body );
    const home=new Hotelnames({
  name:req.body.houseName,
  location:req.body.Location,
  price:req.body.price,
  occupancy:req.body.occupancy,
  propertyType:req.body.propertyType,
  comfort:req.body.comfort,
  environment:req.body.environment,
  rules:req.body.rules,
  cancellation:req.body.cancellation,
  Owner:email,
  Ownername:OwnerName,
  photo:req.body.photo
})
const idofuser=req.session.user.id;
console.log("id of user",idofuser);
const id=home._id.toString();
const updatedUser=await HostList.findByIdAndUpdate(
    {_id:idofuser},
    {$addToSet:{MyPostedHomes:id}},
    {new:true}
)
await home.save();
return res.send({new:updatedUser});
}
}