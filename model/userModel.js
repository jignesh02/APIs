const mongoose = require("mongoose");

const path = require("path")
const multer = require("multer");
const imgPath = '/upload'

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true},
    hobby: { type: Array, required: true},
    city: { type: String, required: true},
    image: { type: String, required: true },
    status: { type: String, default: true },
}, { timestamps: true });

const storeImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", imgPath))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
});

userSchema.statics.uploadUserImage = multer({ storage: storeImage }).single("image");
userSchema.statics.pathOfImage = imgPath;

const user = mongoose.model("user", userSchema);

module.exports = user