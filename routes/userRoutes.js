const express = require("express");
const {registerUser, loginUser, logoutUser, forgetPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUsers, updateUserRole, deleteUserRole } = require("../controllers/userControllers");
const { isAuthenticatedUser} = require("../middlewares/auth");
const router = express.Router();
router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/register").post(registerUser);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);
router.route("/admin/users").get(getAllUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser,getSingleUsers);
router.route("/admin/user/:id").put(isAuthenticatedUser,updateUserRole);
router.route("/admin/user/:id").delete(isAuthenticatedUser,deleteUserRole);

module.exports = router;