import mongoose from "mongoose";

const connectedToDb = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected To Database")
    })
    .catch(()=>{
        console.log("Not connected to Database")
    })
}

export default connectedToDb