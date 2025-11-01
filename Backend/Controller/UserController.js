const Hotelnames=require('../Model/HotelList');
const User=require('../Model/UserList');
const MessageDb=require('../Model/Messages.js');
const bcrypt=require('bcrypt');
const { ObjectId }=require('mongodb');
const {body,validationResult}=require('express-validator');
const mongoose = require('mongoose');
//Filters To fetch Homes
exports.Filters=async (req,res,next)=>{
  //console.log("It is coming here only");
  const {comfort,Property,Price,cancellation,environment,searchFirst,searchSecond}=req.body;
  console.log("THis is req body that i got ",req.body);
  const query={}
  if(comfort) query.comfort={$all:comfort}
  if(Property) query.propertyType=Property;
  if(Price) query.price={$lt:Price}; 
  if(cancellation) query.cancellation=cancellation;
  if(environment) query.environment={$all:environment}
  if(searchSecond || searchFirst) query.location={$in:[searchSecond, searchFirst].filter(Boolean)}
  console.log("This is query ",query);

  const Hotels=await Hotelnames.find(query);
  // console.log("The hotels that matched are ",Hotels);
  const lengthOfHotels=Hotels.length;
  res.json({Hotels:Hotels,lengthOfHotels:lengthOfHotels});
}



exports.GetFreeHomesInner=(req,res,next)=>{
return async(req,res,next)=>{
  const specificDate=new Date(req.body.date);
  console.log(specificDate)
  const Hotels=await Hotelnames.aggregate([
    { $match:{SecondDate:{$ne:''}}},
      {$addFields:{
        convertedSecondDate:{$dateFromString:{dateString:"$SecondDate"}}
      } }, {
      $match:{
        convertedSecondDate:{$lte :specificDate}
      }} ,
        {
      $unset:"convertedSecondDate"
        }
  ])
  return res.json({Hotels:Hotels})
}
}



// To Get All Homes At Starting 
exports.AllHomes=async (req,res,next)=>{
try {
  const Hotels=await Hotelnames.find();
  
  // Only update booked status if user is logged in
  if(req.session && req.session.user && req.session.user.id) {
    const Updated=await User.findById(req.session.user.id);
    if(Updated && Updated.BookedFinal) {
      const fav=Updated.BookedFinal;
      console.log("The Homes which came in this are ",fav);
      const getUpdated=await Hotelnames.updateMany(
        {_id:{$in:fav},Booked:{$exists:false}},
        {$set:{Booked:"yes"}}
      )
      const getu=await Hotelnames.find({_id:{$in:fav}});
      console.log("The updated ones are ",getUpdated);
    }
  }
  
  res.send({Hotels:Hotels,lengthOfHotels:Hotels.length});
} catch(error) {
  console.error("Error in AllHomes:", error);
  res.status(500).json({error: "Failed to fetch homes", message: error.message});
}
}


exports.fetchAllBookedHomesReturn=(req,res,next)=>{
 return async (req,res,next)=>{
   console.log("It came Here For Fetching");
const homes=await Hotelnames.find(
  {Booked:{$ne:"no"}}
)
return res.json({hotels:homes});
 } 
}


//TOGEt Ttoal messages to show 
exports.getMessagesIntern= (req,res,next)=>{
return async (req,res,next)=>{
const useremail=req.session.user.email;
const list=await MessageDb.find({"User.email":useremail});
console.log("List is this ",list);
if(!list){
return res.send({list:"Sorry No Messages"});
}
else{
  var counting=0;
  list.forEach(item=>counting=counting+item.User.newRead-item.User.read);
  return res.send({list:list,counting:counting});
}
}
}

//To Fetch all Message details inside of a user
exports.PersonalFetchAllMEssageMessage=(req,res,next)=>{
  const Owneremail=req.body.Owneremail;
  const useremail=req.body.useremail;
  // console.log("Tell me you got this ",useremail,Owneremail);
  return async (req,res,next)=>{
    const AllMessage=await MessageDb.findOne(
      {"Owner.email":Owneremail,"User.email":useremail}
    )
    // console.log(AllMessage);
    if(AllMessage){
      AllMessage.User.read=0;
      AllMessage.User.newRead=0;
      await AllMessage.save();
      return res.send({chats:AllMessage});
    }
    else{
      return res.send({chats:" Nothing to show in messages "});
    }
  }
}



//To Message Personal 
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
    console.log("Ye chl rha ahi na isisliye save nhi ho pa rha ahi  2");
    await Newmessage.save();
  console.log("Here is New made Message ",Newmessage);
  }
  else{
    console.log("Ye chl rha ahi na isisliye save nhi ho pa rha ahi  ");
    // messageFind.Owner.read=messageFind.Owner.newRead;
    messageFind.Owner.newRead=messageFind.Owner.newRead+1;
    messageFind.messages.push(
       {from:role,to:secondrole,message:message}
    )
    await messageFind.save();
  }
  console.log("it cam here successfully woth ",messageFind,message,role);
  return res.send({msg:"Done Verything"});
}
}




//To Post Messages
exports.MessagesPostToPost=async (req,res)=>{
const email=req.body.email;
const msg=req.body.reply;
const HomeId=req.body.id;
const replyId=req.body.replyId;
console.log(email,msg,HomeId);
const user=await User.findOne(
  {email:email}
)
if(!user){
  return res.send({msg:"User not found "})
}
else{
  const HomeGot=await Hotelnames.findOne(
    {_id:HomeId}
  )
  const repliesFound=await HomeGot.review.find(item=>item._id==replyId);
  console.log(repliesFound.replies)
  await repliesFound.replies.push({email:email,reply:msg,likes:0})
  console.log("Updated HomeGot ",HomeGot);
  await HomeGot.save();
  return res.send({msg:HomeGot})
}
}



//To get the profiel details
exports.GetPro=async (id)=>{
const user=await User.findOne({_id:id});
return async (req,res,next)=>{
const user=await User.findById(id);
return res.send({message:user});
};
}


//To Get User Account Created
exports.SignUp=async (req,res,next)=>{
  const {name,email,password,number,role}=req.body;
  const salt=await bcrypt.genSalt(10);
  const SecurePass=await bcrypt.hash(password,salt);
  const user=new User({
    name:name,
    email:email,
    password:SecurePass,
    number:number,
    role:role
  }
  )
  user.save().then(()=>{
    console.log("Saved SuccessFully");
    res.send({Saved:"Saved SuccessFully"});
  })
  .catch((err)=>{
    //console.log("This is the error " ,err);
  })
}

//For setting review for each home
exports.setReviewHome=async (UserId,Homeid,req,res)=>{
  console.log("hey how are you");
  console.log(UserId);
  console.log(Homeid);
  console.log(req.body);
  console.log(req.body.review);
const user=await User.findById({_id:UserId});
const reviewCount=user.reviewCount
await user.updateOne(
  {reviewCount:reviewCount+1}
);
await user.save();
const home=await Hotelnames.findOne(
  {$expr:{$eq:[{$toString:"$_id"},Homeid]} }
);
if(!user || !home){
  console.log("Some Error Occured");
  return res.status(400).send({error:"Some error"});
}
const updated = await Hotelnames.findOneAndUpdate(
  { $expr: { $eq: [ { $toString: "$_id" }, Homeid ] } },
  {
    $set: {
      review: [
        ...home.review.filter(item => item.email != user.email),
        { name: user.name, email: user.email, review: req.body.review,likes:0 }
      ]
    }
  },
  { new: true }
);


console.log(updated);
return res.send({updated:updated});
}

exports.ToPopulateHome=async (req,res,next)=>{
const userTo=await User.findById({_id:req.session.user.id});
return async(req,res,next)=>{
  const favIds=userTo.favourites.map(item=>item.toString());
  const BookedFinal=userTo.BookedFinal.map(item=>item.toString());
  const TosendFav=await Hotelnames.aggregate([
    {
      $match:{
        $expr:{
          $in:[
            {$toString:"$_id"},
            favIds
          ]
        }
      }
    }
  ]);
  const TosendBookedFinal=await Hotelnames.aggregate([
    {
      $match:{
        $expr:{
          $in:[
            {$toString:"$_id"},
            BookedFinal
          ]
        }
      }
    }
  ])
  console.log(TosendFav);
  console.log(TosendBookedFinal);
  console.log(userTo);
  return await res.send({favourites:TosendFav,BookedFinal:TosendBookedFinal,user:userTo});
}
}
//TO GEt the home etails of a single home 
exports.getHomeDetail=async (req,res,next)=>{
  //console.log(req.body);
  // //console.log(req);
  const home=await Hotelnames.findOne(
    {$expr:{$eq:[{$toString:"$_id"},req.body.id ]}}
  )
return async (req,res,next)=>{
  if(home){
return res.send({home:home});
}
else{
  return res.send({home:"Home not available "});
}
}
}
//For adding BookedHome and adding id 
exports.homeAddBookedIn = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {SecondDate,FirstDate}=req.body;
    console.log(" SecondDate is ",SecondDate,"FirstDate is ",FirstDate);
    const HomeId = new ObjectId(String(id));


    const home = await Hotelnames.findOneAndUpdate(
      { $expr:{$eq:[{$toString:"$_id"},id]}},
      { $set: { Booked: true ,FirstDate:FirstDate,SecondDate:SecondDate} },
      { new: true }
    );

    if (!home) {
      return res.status(404).json({ message: "Home already booked or not found" });
    }

    await User.findOneAndUpdate(
      { _id: req.session.user.id, BookedFinal: { $nin: [HomeId] } },
      { $addToSet: { BookedFinal: HomeId } }
    );

    return res.json({ message: "Booking successful", home });
  } catch (err) {
    // console.error("Error booking home:", err);
    // return res.status(500).json({ error: "Server error" });
  }
};

//To fetch some personal home and details
exports.soGoAndGet=async (id,res)=>{
const home=await Hotelnames.findOne(
  {$expr:{$eq:[{$toString:"$_id"},id]}}
)
if(!home){
  return res.send({msg:"Sorry no home"})
}
else{
  console.log(home);
  return res.send({mesg:home})
}
}



//To delete Fav
exports.TodeleteFav=async (req,res,next)=>{
  try{
const UserId=req.session.user.id;
  const HomeId=req.params.id.toStirng();
  const home=await Hotelnames.findOne({
    $expr:{$eq:[{$toString:"$_id"},HomeId ]}
  })
  console.log(home || "Home Not available");
  await User.findOneAndUpdate(
    {_id:UserId},
    {$pull:{BookedFinal:HomeId}}
  )
  console.log("Deleted Successfully");
  return res.send({message:"Deleted successfully"});
  }catch(error){
 return res.send({message:"Some Error"});
  }
  
}

//Login Request And Verification Goes here
exports.Login=(email,password,role)=>{
  return async (req,res,next)=>{
    //console.log("The User Credentials are ",req.body);
    const user=await User.findOne({email:email});
    console.log(user);
    const usserId=user._id.toString();
    ////console.log("The Id that i got here  ",user._id.toString());
    if(!user){
      return res.status(400).json("There is No registered user with specific name");
    }
    const compare=await bcrypt.compare(password,user.password);
    const ToComareHash=password===user.password;
    //console.log("Comapre is ",compare);
    if(compare || ToComareHash){
      //console.log("Till Here its ok");
      //console.log(user);
      req.session.user={
        id:usserId,
        name:user.name,
        role:role,
        email:user.email
      };
      if(req.session.user){
        //console.log("This is what we wanted ",req.session.user);
      }
      return res.json({value:true});
    }
    else{
      return res.json({value:false});
    }
  }
}


//Add To Booked Homes
exports.AddToBookedInside=(id)=>{
  return async (req,res)=>{
    console.log("req is ",req);
    console.log("req body ",req.body);
    console.log("req body is ida ",req.body.ida);
    const {ida}=req.body;
    console.log("Atleast it cam till here",ida);
    const Updated=await User.updateMany(
      {_id:id},
      {$addToSet:{BookedFinal:ida}},
      {new:true}
    )
    return res.json({Updated:Updated});
  }
}
//Update Usr paasword and username
exports.ToupdateUser=(req,res,next)=>{
return async (req,res,next)=>{
const user=await User.findOne({_id:req.session.user.id});
const {username,currentPassword,newPassword,confirmPassword}=req.body;
try{
const password=await bcrypt.compare(currentPassword,user.password);
console.log("Password is ",password);
if(!password){
  console.log("Error Occured at password matching");
  return res.status(401).send({message:"Wrong Password"});
}
const salt=await bcrypt.genSalt(10);
const Secpass=await bcrypt.hash(newPassword,salt);
if(username!=""){
await User.findOneAndUpdate(
  {_id:req.session.user.id},
  {$set:{password:Secpass,name:username}}
)}
else{
await User.findOneAndUpdate(
  {_id:req.session.user.id},
  {$set:{password:Secpass}}
)}
console.log("You got it bro go and check teh db in your gui ");
return res.send({message:"You got it"});
}catch(error){
  console.log("Error Occured")
  return res.send({message:error});
}
}
}

//Booked Homes to Give
exports.BookedTobeFinal=(id)=>{
  console.log("Id is Coming till here ",id);
  return async (res)=>{
    try{
      const user=await User.findById(id).populate('BookedFinal');
      const arr=user.BookedFinal;
      console.log("BookedHomes are here ",arr);
      return res.status(200).json({arr:arr});
    }
    catch{
      return res.status(201).json({arr:[]});
    }
  }
}


exports.Logout=(id)=>{
  return (req,res)=>{
    //console.log("This //console func ran");
    if(req.session.user.id==id){
      req.session.destroy();
      res.send({result:"Deleted session"})
    }
    else{
      res.send({result:"Failed to logout"});
    }
  }
}

//Personal Favourite
exports.favouritePersonal=(id)=>{
  return async (req,res)=>{
    console.log("ID of the Home ",id);
    console.log("ID of the User ",req.session.user.id);
    
    // Trim and validate the ID
    const homeId = id.trim();
    console.log("Home id is ",homeId);
    
    // Check if homeId is a valid ObjectId format
    if (!homeId || !mongoose.Types.ObjectId.isValid(homeId)) {
      console.log("Invalid ObjectId format:", homeId);
      return res.status(400).json({home:"Invalid Home ID format"});
    }
    
    // Add to user's favourites if user is logged in
    if(req.session.user.id){
     try {
       const user = await User.updateOne(
         {$expr: { $eq: [{ $toString: "$_id" }, req.session.user.id] }},
         {$addToSet:{favourites:homeId}}
        );
        console.log("User favourites updated:", user.modifiedCount > 0 ? "SUCCESS" : "NO CHANGE");
      } catch(userError) {
        console.log("Error updating user favourites:", userError.message);
      }
    }
    
    console.log("Type of homeId:", Object.prototype.toString.call(homeId));
    
    try{
      console.log("Searching for home with ID:", homeId);
      
      // Use string comparison method that works with this database setup
      const home = await Hotelnames.findOne({
        $expr: { $eq: [{ $toString: "$_id" }, homeId] }
      });
      
      console.log("Query result - home found:", home ? "YES" : "NO");
      
      if (!home) {
        console.log("No home found with ID:", homeId);
        return res.status(404).json({home:"No Home Found with this ID"});
      }
      
      console.log("Successfully found home:", home.name || "Unnamed home");
      return res.json({home:home}); 
    }
    catch(error){
      console.log("Database error while finding home:", error.message);
      return res.status(500).json({home:"Database error occurred", error: error.message}); 
    }
  }
}






//Give All Favourites to the user on demand
exports.GiveAFavourite=(id)=>{
  return async (req,res)=>{
    try{  
      const user=await User.findById(id);
      console.log(user.favourites);
      const homes=await Hotelnames.find(
        {$expr:{
          $eq:[{$toString:"$_id"},user.favourites.toString()]
        }}
      )
      if(!homes){
        return res.send({message:"home not avaiblle "});
      }
      console.log("The array that i got is ",homes);
      return res.json({array:homes});
    }
    catch{
      return res.status(400).json({array:"Sorry nothing found"});
    }
    
  }
}


exports.RemoveFavList=(sessionId,id)=>{
  return async (req,res)=>{
    try{
      const user=await User.findByIdAndUpdate(
        sessionId,
        {$pull:{favourites:id}},
        {new:true}
      )
      console.log("user is this ",user);
      return res.json({result:user.favourites});
    }
    catch{
      return res.json({result:"Sorry Error found"});
    }
  }
}
//  For passing name to homes
exports.Passname=async (req,res,next)=>{
const {user}=req.session;
const userdel=await User.findOne({_id:user.id});
const Tosend=userdel;
return res.send({user:Tosend});
}

//Express-Validator and checker Goes Here
exports.Check=[
  body('name')
  .isLength({min:5}).withMessage("Please Enter a Little Longer Name"),
  body('email')
  .isEmail()
  .withMessage("Please Enter a valid Email"),
  body('password')
  .isLength({min:6})
  .withMessage("Please enter a long password"),
  body('cpassword')
  .custom((value,{req})=>{
    if(value!=req.body.password){
      throw new Error("Passwords Do not Match");
    }
    return true;
  }), async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).send({errors:errors.array()});
    }
    next();
  }]
    // const updated=await Hotelnames.findByIdAndUpdate(
    //   {_id:Homeid},
    //   {$set:{review:{$concatArrays:[
    //     {
    //       $filter:{
    //         $input:"$review",
    //         $as:"r",
    //         $cond:{$ne:["$$r.email",user.email]}
    //       }
    //     },
    //       [
    //         {
    //           name:user.name,
    //           email:user.email,
    //           review:user.review
    //         }
    //       ]
    //   ]
    // }
    // }
    // },
    // {new:true}
    // )