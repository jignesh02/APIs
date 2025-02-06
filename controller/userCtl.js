const userModel = require("../model/userModel")

module.exports.getUser = async (req, res) => {
    try {
        let getUserData = await userModel.find();
        if (getUserData) {
            return res.status(200).json({ msg: "User data get successfully", data: getUserData });
        } else {
            return res.status(200).json({ msg: "Something went wrong while getting user data" });
        };
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", error: err });
    };
};

module.exports.addUser = async (req, res) => {
    try {
        let addUserData = await userModel.create(req.body);
        if (addUserData) {
            return res.status(200).json({ msg: "User data inserted successfully", data: addUserData });
        } else {
            return res.status(200).json({ msg: "Something went wrong while insert user data" });
        };
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", error: err });
    };
};

module.exports.deleteUser = async (req, res) => {
    try {
        let deleteUser = await userModel.findByIdAndDelete(req.params.id);
        if (deleteUser) {
            return res.status(200).json({ msg: "User data deleted successfully" });
        } else {
            return res.status(200).json({ msg: "Something went wrong while delete user data" });
        };
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", error: err });
    };
};

module.exports.singleData = async (req, res) => {
    // console.log(req.query.userID);
    try {
        let singleData = await userModel.findById(req.query.userID);
        if (singleData) {
            return res.status(200).json({ msg: "User data get successfully", data: singleData });
        } else {
            return res.status(200).json({ msg: "Something went wrong while fetching user data" });
        };
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", error: err });
    };
};

module.exports.updateUserData = async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    try {
        let updateData = await userModel.findById(req.params.id);
        if (updateData) {
            let checkData = await userModel.findByIdAndUpdate(updateData._id, req.body);
            if (checkData) {
                return res.status(200).json({ msg: "User data updated successfully", data: checkData });
            }
            else {
                return res.status(200).json({ msg: "Something went wrong while updateing user data" });
            };
        } else {
            return res.status(200).json({ msg: "Something went wrong while trying to update user data" });
        };
    } catch (error) {
        return res.status(400).json({ msg: "Something went wrong", error: err });
    };
};