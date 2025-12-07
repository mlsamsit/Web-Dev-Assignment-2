import dotenv from 'dotenv';
import {PORT} from "./constants.js"
import  {app} from "./app.js"
import connectDB from "./db/dbConnect.js"

dotenv.config({
    path: "../.env"
});

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((err) => {
    console.error("Failed to connect to the database", err);
    process.exit(1);
});