const express =require('express');
const router =require('./src/routes/api.js');

const app= new express();

const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');

const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');
const cookieParser = require('cookie-parser');
const mongoose =require('mongoose');

  let url = "mongodb+srv://akash:akash123@cluster0.epuw6z9.mongodb.net/TASK?retryWrites=true&w=majority"
  // let options = {
  //   user: "akash",
  //   pass: "akash123",
  // }
  mongoose.connect(url).then(()=>{
    console.log("DB Connected");
  }).catch((e)=>{
    console.log(e);
  })

app.use(cookieParser());
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

app.use("/api/v1",router)

// Front End Routes
app.use(express.static('./client-site/dist'));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client-side","dist","index.html"));
})

module.exports = app;