require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const  router=require("./Router/router");
const connectDB = require('./db/connect');
app.use(cors());
app.use(bodyParser.json());

app.use("/",router);

app.options("/",(req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', "content-type");
    res.send("okay");

})
try{
     await connectDB();
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
      });
} catch(err)
{
    console.log(err);
}

