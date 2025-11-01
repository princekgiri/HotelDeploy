const mongoose=require('mongoose');
const path=require('path');
const HostSchema=mongoose.Schema({
    name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  role:{
    type:String
  },
  MyPostedHomes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'hotelnames'
  }]
})
const toSee=path.join(__dirname,'../components/uploads/images/homePhotos/valentin-vEqnu8hJkPM-unsplash.jpg');
console.log("to see in model ",toSee);
const HostList=mongoose.model('hostlist',HostSchema);
module.exports=HostList