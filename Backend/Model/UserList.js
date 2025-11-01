const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
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
  },
  role:{
    type:String
  },
  number:{
    type:String
  },
  favourites:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"hotelnames"
    }
  ],
  BookedFinal:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"hotelnames"
    }
  ],
  reviewCount:{
    type:Number
  },
  messages:[
    {
      email:String,
      reply:String
    }
  ]
})


const User=mongoose.model('user',UserSchema);
module.exports=User