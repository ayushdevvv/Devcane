import app from "./src/app/app.js";
import dotenv from "dotenv"
import connectDB from "./src/config/db.js";

dotenv.config()





app.listen(process.env.PORT,()=>{

    console.log("Server is running");
    
    connectDB()
    
})