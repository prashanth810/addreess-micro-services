import mongoose from "mongoose";
import Envs from "../utils/Envs.js";

const mongo_url = Envs.MONGO_URL;

const Databaseconnection = async () => {
    try {
        await mongoose.connect(mongo_url);
        console.log("ADDRESS DB CONNECTED successfully !!! 📍 📍 📍 📍 📍");
    }
    catch (error) {
        console.log(`failed to connect db ,${error.message} ❌ ❌ ❌ ❌ ❌ ❌`);
    }
}


export default Databaseconnection;