const express=require('express');
const User=require('../Model/UserList')
const UserRouter=express.Router();
const HostList=require('../Model/HostList.js')
const {Filters,AllHomes,SignUp,Check,Login,Logout,favouritePersonal,GiveAFavourite,RemoveFavList,BookedTobeFinal,AddToBookedInside,GetPro,setReviewHome,Passname,getHomeDetail,ToPopulateHome,ToupdateUser,homeAddBookedIn,TodeleteFav,soGoAndGet,MessagesPostToPost,getMessagesIntern,messageuserPersonal,PersonalFetchAllMEssageMessage,fetchAllBookedHomesReturn,GetFreeHomesInner}=require('../Controller/UserController');
const Hotelnames=require('../Model/HotelList');

const middleWare=(req,res,next)=>{
  //console.log("Here i can print every");
  //console.log("So here is what should be Renter req url ",req.url);
return Login(req.body.email,req.body.password,req.body.role)(req,res,next);
}

// Authentication middleware - check if user is logged in
const requireAuth=(req,res,next)=>{
  if(!req.session || !req.session.user || !req.session.user.id){
    return res.status(401).json({error: "Unauthorized", message: "Please login to access this resource"});
  }
  next();
}

const LogoutCall=(req,res,next)=>{
  ////console.log("Till Logout middleware ran");
return Logout(req.session.user.id)(req,res);
}
const CallFavourite=(req,res,next)=>{
return favouritePersonal(req.params.id)(req,res);
}
const GiveAllFavourite=(req,res,next)=>{
return GiveAFavourite(req.session.user.id)(req,res);
}
const Remove=(req,res,next)=>{
  //console.log(req.params.id);
  return RemoveFavList(req.session.user.id,req.params.id)(req,res);
}
const BookedFav=(req,res,next)=>{
return BookedTobeFinal(req.session.user.id)(res);
}
const AddToBooked=(req,res,next)=>{
return AddToBookedInside(req.session.user.id)(req,res); 
}
const getprofile=async (req,res,next)=>{
  //console.log("it is not even coming here");
  return await (await GetPro(req.session.user.id))(req,res,next);
}
const setReview=(req,res,next)=>{
  console.log(req.session.user.id,req.params.id);
  return setReviewHome(req.session.user.id,req.params.id,req,res);
}
const getHomeDetails=async (req,res,next)=>{
  return await (await getHomeDetail(req,res,next))(req,res,next);
}
const ToPopulate=async (req,res,next)=>{
  console.log("It is here");
  return await (await ToPopulateHome(req,res,next))(req,res,next);
}
const Toupdate=(req,res,next)=>{
  return ToupdateUser(req,res,next)(req,res,next);
}
const homeAddBooked=(req,res,next)=>{
  return homeAddBookedIn(req,res,next);
}
const Todelete=(req,res,next)=>{
  return TodeleteFav(req,res,next);
}

const SoGetIt=(req,res,next)=>{
  return soGoAndGet(req.body.id,res);
}
const MessagesPost=(req,res)=>{
return MessagesPostToPost(req,res);
}

const getMessages=async (req,res,next)=>{
  console.log("It got here for connection");
return await getMessagesIntern(req,res,next)(req,res,next);
}

const messageuser=async (req,res,next)=>{
  console.log("This is requrst bbody ",req.body);
  return await messageuserPersonal(req,res,next)(req,res,next);
}

const PersonalFetchAllMEssage=async (req,res,next)=>{
  return await PersonalFetchAllMEssageMessage(req,res,next)(req,res,next);
}
const fetchAllBookedHomes=async (req,res,next)=>{
  return await fetchAllBookedHomesReturn(req,res,next)(req,res,next);
}

const GetFreeHomes=async (req,res,next)=>{
return await GetFreeHomesInner(req,res,next)(req,res,next);
}
const testGoogleLogin=async (req,res,next)=>{
const {email,name,role}=req.body;
const user=await User.findOne({email:email});
const host=await HostList.findOne({email:email});
let current=null;
if(user||host){
current=user?user:host;}
if(current){
  const notMatch=current.role===role;
  console.log("It is avaible at check option like ",user?user:host);
  return res.json({
    success:true,
    user:user?user:host,
    existed:notMatch,
    duplicate:true
  })
}
  return res.json({existed:false})

}
UserRouter.post('/Login',middleWare);
UserRouter.post('/api-google',testGoogleLogin);
UserRouter.get('/AllHomes',requireAuth,AllHomes);
UserRouter.post('/SignUp',Check,SignUp);
UserRouter.post('/filters',Filters);
UserRouter.get('/Logout',requireAuth,LogoutCall);
UserRouter.get('/FavouriteHome/:id',requireAuth,CallFavourite);
UserRouter.get('/personalfavourite',requireAuth,GiveAllFavourite);
UserRouter.get("/removeFav/:id",requireAuth,Remove);
UserRouter.get("/BookedHomes",requireAuth,BookedFav);
UserRouter.post("/AddToBooked",requireAuth,AddToBooked);
UserRouter.get("/profile",requireAuth,getprofile);
UserRouter.post("/home/:id",requireAuth,setReview);
UserRouter.get("/Passname",requireAuth,Passname);
UserRouter.post("/GetHome",getHomeDetails);
UserRouter.get("/ToPopuate",requireAuth,ToPopulate);
UserRouter.get("/fetchAllBookedHomes",fetchAllBookedHomes);
UserRouter.post("/Toupdate",requireAuth,Toupdate);
UserRouter.post("/homeAddBooked/:id",requireAuth,homeAddBooked);
UserRouter.post("/TodeleteFav/:id",requireAuth,Todelete);
UserRouter.post("/GetPersonal",requireAuth,SoGetIt);
UserRouter.post("/MessagesPost",requireAuth,MessagesPost);
UserRouter.get("/getMessages",requireAuth,getMessages);
UserRouter.post("/messageuser",requireAuth,messageuser);
UserRouter.post("/PersonalFetchAllMEssage",PersonalFetchAllMEssage);
UserRouter.post("/GetFreeHomes",GetFreeHomes);






module.exports=UserRouter