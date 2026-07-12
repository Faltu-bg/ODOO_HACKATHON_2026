const mongoose =require('mongoose')
const {Schema}=mongoose

const userSchema=new Schema(
    {
        name: String,
      license: String,
      category: String,
      expiry: Number,
      contact: Number,
      score: Number,
      status:String
    }
);

const User=mongoose.model('User',userSchema)
module.exports=User