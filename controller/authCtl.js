const signUpModel = require("../model/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signUp = async (req, res) => {
    try {
        let checkAuthData = await signUpModel.find({ email: req.body.email }).countDocuments();
        if (checkAuthData == 0) {
            if (req.body.password == req.body.confirmPassword) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
                let signUp = signUpModel.create(req.body);
                console.log(signUp);
                if (signUp) {
                    return res.status(200).json({ msg: "user signUp successfully", data: signUp });
                }
                else {
                    return res.status(200).json({ msg: "Something went wrong while signUp" });
                };
            }
            else {
                return res.status(200).json({ msg: "password & confirm password does not match" });
            };
        }
        else {
            return res.status(200).json({ msg: "Email is already register use another email" });
        };
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", error: err });
    };
};

module.exports.signIn = async (req, res) => {
    try {
        let checkEmail = await signUpModel.findOne({ email: req.body.email });
        if (checkEmail) {
            let checkPassword = await bcrypt.compare(req.body.password, checkEmail.password);
            if (checkPassword) {
                let token = jwt.sign({ userData: checkEmail }, "secrateKey");
                return res.status(200).json({ msg: "user login successfully", token });
            }
            else {
                return res.status(200).json({ msg: "Invalid pasword" });
            }
        }
        else {
            return res.status(200).json({ msg: "Email doesn't match" });
        }
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", error: err });
    }
}