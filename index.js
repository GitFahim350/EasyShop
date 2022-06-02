const express=require("express")
const app=express()
const dotenv=require('dotenv')
const cors=require('cors');
const paymentRoute=require('./routes/stripe.js')
const orderRoute=require('./routes/orders')
const mongoose=require('mongoose')

//config
dotenv.config();


// //Database Connection
mongoose.connect(process.env.MONGO_URL||'mongodb+srv://Fahim:Fahim123@cluster0.hqvqfh2.mongodb.net/amazondatabase?retryWrites=true&w=majority')
.then(()=>
{console.log("Database connection successful")})
.catch((err)=>
console.log(err));






// //midlewire
app.use(cors());
app.use(express.json());
app.use("/api",paymentRoute);
app.use("/api",orderRoute);


app.listen(process.env.PORT||5000,()=>{
    console.log("Exprees is connected at",process.env.PORT)
})