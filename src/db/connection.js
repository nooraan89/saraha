import Mongoose from "mongoose";

const connectDb=async()=>{
    try{
await Mongoose.connect(process.env.DB_URL); console.log('Connected!');
    }
    catch(error)
    {
console.log("cannot connection in database")

    }
}
export default connectDb;