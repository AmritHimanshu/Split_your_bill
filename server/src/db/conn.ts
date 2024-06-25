import mongoose from "mongoose";

const DB = process.env.DATABASE;

if (!DB) {
    console.error("Database connection string is not defined in the .env file");
    process.exit(1); // Exit the process if there's an issue
}

mongoose.connect(DB).then(() => {
    console.log("Connection successful");
}).catch((err) => console.log('No connection ' + err));