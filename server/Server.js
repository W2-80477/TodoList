require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const routes = require("./router/Router");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use(routes);


mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("SuccessFully Database connected");
}).catch((error)=>{
    console.log("Databse not connected" ,  error);
})

app.listen(PORT,()=>{
    console.log("Server SuccessFully Connected")
})
