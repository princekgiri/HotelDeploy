const mongoose=require('mongoose');
const MessagesSchema=new mongoose.Schema({
Owner:{
    name:String,
    read:Number,
    newRead:Number,
    email:String
},
User:{
    name:String,
    read:Number,
    newRead:Number,
    email:String
},
messages:[
    {
        from:String,
        to:String,
        message:String
    }
]
})

const MessageDb=mongoose.model('messages',MessagesSchema);
module.exports=MessageDb