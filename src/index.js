import dotenv from "dotenv";

import mongoose from "mongoose";
import {DB_NAME} from "./constants.js";
import connectDb from "./db/index.js";

dotenv.config({
    path: './.env'
})

connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port ${process.env.PORT}`);
    });
})
.catch((err)=>{
    console.log("MongoDB connection failed !",err);
});








// import express from "express";
// const app = express();


// ;(async ()=>{
//     try{
//       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//       app.on("error", (err) => {
//         console.error("ERROR: ",err);
//         throw err
//       });
//       app.listen(process.env.PORT, ()=>{
//         console.log(`Server is running on port ${process.env.PORT}`);
//       })
//     }catch (error){
//         console.error("ERROR: ",error);
//         throw err
//     }
// })