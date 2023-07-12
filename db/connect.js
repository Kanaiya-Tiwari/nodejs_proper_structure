require('dotenv').config()
const mongoose= require('mongoose');
const connectDB=()=>{
    return mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
}

module.exports=connectDB;