import app from "./src/app.js";
import connectedToDb from "./src/config/database.js";
connectedToDb()

app.listen(process.env.PORT,()=>{
    console.log("server is running on port 3000")
})