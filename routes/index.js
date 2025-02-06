const express = require("express");
const passport = require("passport");
const routes = express.Router();
const userCtl = require("../controller/userCtl");

routes.get("/", passport.authenticate("jwt", { failureRedirect: "/unAuth" }), userCtl.getUser);

routes.get("/unAuth", async (req, res) => {
    return res.status(400).json({ msg: "You are unauthorized" })
})

routes.post("/addUser", passport.authenticate("jwt", { failureRedirect: "/unAuth" }), userCtl.addUser);

routes.delete("/deleteUser/:id", passport.authenticate("jwt", { failureRedirect: "/unAuth" }), userCtl.deleteUser);

routes.get("/singleData", passport.authenticate("jwt", { failureRedirect: "/unAuth" }), userCtl.singleData);

routes.put("/updateUserData/:id", passport.authenticate("jwt", { failureRedirect: "/unAuth" }), userCtl.updateUserData);

routes.use("/auth", require("./authRoutes"));

module.exports = routes;