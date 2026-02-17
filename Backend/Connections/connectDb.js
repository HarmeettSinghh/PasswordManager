import { connect } from "mongoose";
import 'dotenv/config';
const connectDB = async() =>{
    try{
        await connect(process.env.MONGO_URL)
        console.log("MongoDB connection established ")
    }catch(error){
        console.log("MongoDB connection failed")
    }

}
export default connectDB