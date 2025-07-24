// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
// import { DB_NAME } from './constants.js'
import connectDB from './db/index.js'
import app from "./app.js"

dotenv.config()

connectDB()
.then(()=>{
    app.on("error",()=>{
        console.log("ERROR:",error);
        throw error
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed!!!!",err);
})