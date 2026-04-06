import express from "express";
import Authmiddleware from "../middlewares/Authmiddleware.js";
import { Createaddress, getaddress, Updateaddress } from "../controllers/Addresscontroller.js";

const Addressroute = express.Router();

// create & update address
Addressroute.post("/address/add", Authmiddleware, Createaddress);
Addressroute.put("/address/:id", Authmiddleware, Updateaddress);


// // get address
Addressroute.get("/address/addres", Authmiddleware, getaddress);
// Addressroute.get("/address/:id");

// // delete address
// Addressroute.delete("/address/:id");


export default Addressroute;