const mongoose = require('mongoose');

const HotelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: [String],       // array of 2 elements
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  occupancy: {
    type: String
  },
  pets: {
    type: String         // "yes" / "no
  },
  propertyType: {
    type: String,         // example: "apartment", "villa"
    required: true
  },
  comfort: {
    type: [String],       // array of comfort features
    default: []
  },
  environment: {
    type: [String],       // array of environment features
    default: []
  },
  rules: {
    type: [String],       // array of rules
    default: []
  },
  cancellation: {
    type: String,         // "yes" / "no"
    required: true
  },
  booking: {
    type: String
  },
  photo:[
    {houseVideos:[String],
    housePhotos:[String],
    PhonePe:{type:String},
    Paytm:{type:String},
    GooglePay:{type:String}}
  ],
  Booked:{
    type:String,
    default:"no"
  },
  review:[
    {
      name:String,
      review:String,
      email:String,
      likes:Number,
      replies:[
        {
          email:String,
          reply:String,
          likes:Number
        }
      ]
    }
  ],
  Owner:{
    type:String
  },
  Ownername:{
    type:String
  },
  FirstDate:{
    type:String
  },
  SecondDate:{
    type:String
  }
});

const Hotelnames = mongoose.model("hotelnames", HotelSchema);
module.exports = Hotelnames;
