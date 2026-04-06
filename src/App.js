import express from "express";
import cors from "cors";
import morgan from "morgan";
import Envs from "./utils/Envs.js";
import Databaseconnection from "./config/Databaseconnection.js";


const app = express();
const PORT = Envs.PORT || 2005;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors());
app.use(morgan("dev"));


Databaseconnection().then((result) => {
    app.listen(PORT, () => {
        console.log(`Address service is running on port ${PORT} 📍 📍 📍 📍 📍`);
    })

}).catch((err) => {
    console.log("failed to start server !!! ❌ ❌ ❌ ❌ ❌ ❌");
});
