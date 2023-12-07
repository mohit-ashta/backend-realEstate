const express = require("express");
const {
    createBuyHome, listHomes
} = require("../controllers/buyHomeContollers");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Define how uploaded files should be named
    },
});

const upload = multer({
    storage: storage
});

// const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/createhome").post(upload.array("images", 20), createBuyHome);
router.route("/home/list").get (listHomes);
// router.route("/home/list:id").delete(deleteBuyHome);

module.exports = router;