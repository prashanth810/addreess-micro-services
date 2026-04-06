import AddressModel from "../models/Addressmodel.js";

// create a new address
const Createaddress = async (req, res) => {
    const { full_name, phone, building_number, street, landmark, city, state, pincode, country, address_type, is_default } = req.body;
    try {
        const user = req?.user?.id;

        if (!user) {
            return res.status(401).json({ success: false, message: "User not authorized !!!" });
        }

        if (!full_name || full_name.trim() === "") {
            res.status(400).json({ success: false, message: "full name is required !!!" });
        }

        if (!phone || phone.trim() === "") {
            res.status(400).json({ success: false, message: "pnone number is required !!!" });
        }

        if (!building_number || building_number.trim() === "") {
            res.status(400).json({ success: false, message: "building number is required !!!" });
        }

        if (!street || street.trim() === "") {
            res.status(400).json({ success: false, message: "street is required !!!" });
        }

        if (!landmark || landmark.trim() === "") {
            res.status(400).json({ success: false, message: "land mark is required !!!" });
        }

        if (!pincode || pincode.trim() === "") {
            return res.status(400).json({ success: false, message: "Pincode is required" });
        }

        if (!address_type || address_type.trim() === "") {
            return res.status(400).json({ success: false, message: "address type is required !!!" });
        }

        if (address_type != "home" && address_type !== "work" && address_type !== "oher") {
            return res.status(400).json({ success: false, message: "Only address type must be home or work or other !!!" });
        }


        const defaultaddress = await AddressModel.countDocuments({ userId: user });

        let defaultvalues = is_default;

        if (defaultaddress === 0) {
            defaultvalues: true;
        }

        if (defaultvalues) {
            await AddressModel.updateMany(
                { userId: user },
                { $set: { is_default: false } },
            );
        }

        const newaddress = await AddressModel.create({
            userId: user,
            full_name, phone, building_number, street, landmark, city, state, pincode, country, address_type, is_default
        });

        return res.status(201).json({ success: true, message: "Address created successfully !!!", data: newaddress })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// update address 
const Updateaddress = async (req, res) => {
    const { full_name, phone, building_number, street, landmark, city, state, pincode, country, address_type, is_default } = req.body;
    const { id } = req?.params;
    try {
        const user = req?.user?.id;

        const address = await AddressModel.findById(id);

        if (!address) {
            return res.status(404).json({ success: false, message: "Address not avaibale !!!" });
        }

        if (!user) {
            return res.status(400).json({ success: false, message: "User not authorized !!!" });
        }

        let updatedata = {};


        if (full_name) updatedata.full_name = full_name;
        if (phone) updatedata.phone = phone;
        if (building_number) updatedata.building_number = building_number;
        if (street) updatedata.street = street;
        if (landmark) updatedata.landmark = landmark;
        if (city) updatedata.city = city;
        if (state) updatedata.state = state;
        if (pincode) updatedata.pincode = pincode;
        if (country) updatedata.country = country;
        if (address_type) updatedata.address_type = address_type;

        if (is_default === true) {
            await AddressModel.updateMany(
                { userId: user },
                { $set: { is_default: false } }
            )
            updatedata.is_default = true;
        }

        const updatedaddress = await AddressModel.findOneAndUpdate({ userId: user },
            updatedata,
            { new: true },
        )

        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            data: updatedaddress
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


// get list all address 
const getaddress = async (req, res) => {
    try {
        const user = req?.user?.id;

        console.log(user, 'uuuuu');

        if (!user) {
            return res.status(400).json({ success: false, message: "User not autorized !!!" });
        }

        const address = await AddressModel.find({ userId: user }).sort({ createdAt: -1 });

        if (!address) {
            return res.status(400).json({ success: false, message: "No address found !!!" });
        }

        return res.status(200).json({ success: true, total: address.length, data: address });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export { Createaddress, Updateaddress, getaddress };