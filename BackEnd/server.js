import "dotenv/config";
import app from "./src/app.js";
import connectedToDb from "./src/config/database.js";
import test from "./src/Services/ai.service.js";

// test()

connectedToDb()
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});