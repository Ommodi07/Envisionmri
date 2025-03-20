require('dotenv').config()
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const cors = require("cors")


const {userRouter} = require("./routes/user");
const {patientRouter} = require('./routes/patient')
app.use(cors());
app.use(express.json());

app.use("/user",userRouter);
app.use("/patient",patientRouter);


async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    console.log(process.env.MONGO_URL)
    app.listen(port,()=>{console.log(`Listening to port ${port}`)});
}

main();