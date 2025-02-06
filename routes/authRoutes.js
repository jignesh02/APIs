const express = require("express");
const routes = express.Router();
const authCtl = require("../controller/authCtl");

routes.post("/signUp", authCtl.signUp);

routes.get("/signIn", authCtl.signIn);

module.exports = routes;