const userModel = require("../model/userModel");
const path = require("path")

module.exports.getUser = async (req, res) => {
    try {

        let page = 0;
        if (req.query.page) {
            page = req.query.page
        }
        let perPage = 2;

        let search = '';
        if (req.query.search) {
            search = req.query.search
        }

        let getUserData = await userModel.find({
            status: true,
            $or: [
                { userName: { $regex: search, $options: "i" } },
                { userEmail: { $regex: search, $options: "i" } },
                { gender: { $regex: search, $options: "i" } },
            ]
        }).skip(page * perPage).limit(perPage);

        let totalUserData = await userModel.find({
            status: true,
            $or: [
                { userName: { $regex: search } },
                { userEmail: { $regex: search } },
                { gender: { $regex: search } },
            ]
        }).countDocuments();

        let totalPage = Math.ceil(totalUserData / perPage);

        if (getUserData) {
            return res.status(200).json({ msg: "User data get successfully", data: getUserData, totalPage, page });
        } else {
            return res.status(200).json({ msg: "Something went wrong while getting user data" });
        };
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", error: err });
    };
};

module.exports.addUser = async (req, res) => {
    try {
        let image = "";
        if (req.file) {
            image = await userModel.pathOfImage + "/" + req.file.filename;
        }
        req.body.image = image;
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
        let findUserData = await userModel.findById(req.params.id);
        console.log(findUserData);
        if (findUserData) {
            try {
                let deleteImgPath = path.join(__dirname, "..", findUserData.image);
                await fs.unlinkSync(deleteImgPath);
            }
            catch (err) {
                return res.status(400).json({ msg: "Something went wrong", error: err });
            }
        }

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

module.exports.statusChange = async (req, res) => {
    try {
        let userData = userModel.findById(req.query.userID);
        if (userData) {
            if (req.query.userStatus == "true") {
                let changeStatus = await userModel.findByIdAndUpdate(req.query.userID, { status: false });
                if (changeStatus) {
                    return res.status(200).json({ msg: "Status Deactivated" });
                } else {
                    return res.status(200).json({ msg: "Something went wrong!" });
                }
            } else {
                let changeStatus = await userModel.findByIdAndUpdate(req.query.userID, { status: true });
                if (changeStatus) {
                    return res.status(200).json({ msg: "Status Activated" });
                } else {
                    return res.status(200).json({ msg: "Something went wrong!" });
                }
            }
        } else {
            return res.status(200).json({ msg: "User not found" });
        }
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", error: err });
    }
}