import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    full_name: {
        type: String,
        trim: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
        required: true,
    },
    building_number: {
        type: String,
        trmi: true,
        required: true,
    },
    street: {
        type: String,
        trim: true,
        required: true,
    },
    landmark: {
        type: String,
        trim: true,
        required: true,
    },
    city: {
        type: String,
        trim: true,
        required: true,
    },
    state: {
        type: String,
        trim: true,
        required: true,
    },
    pincode: {
        typr: String,
        trim: true,
        required: true,
    },
    country: {
        type: String,
        required: true,
        default: "India",
        trim: true,
    },
    address_type: {
        type: String,
        enum: ["home", "work", "other"],
        default: "home",
    },
    is_default: {
        type: Boolean,
        default: false,    // ✅ user can set one address as default
    },
}, { timestamps: true, minimize: false });

const AddressModel = mongoose.model("Addres", AddressSchema);

export default AddressModel;