const BuyHome = require("../models/buyHomeModal");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorHandler");
const mediaBuyHomeModal = require("../models/mediaBuyHomeModal");



// add home 
exports.createBuyHome = catchAsyncErrors(async (req, res) => {
    try {
        console.log('req.body', req.body);
        console.log('req.files', req.files);
        if (req.files.length < 1) {
            return res.status(401).json({
                success: false,
                message: "Media is required"
            });
        }
        const medias = [];

        // Use await directly with BuyHome.create
        const buyHome = await BuyHome.create(req.body);

        for (let med = 0; med < req.files.length; med++) {
            const result = await mediaBuyHomeModal.create({
                url: req.files[med].originalname || "",
                product: buyHome._id,
                type: req.files[med].mimetype || "",
                path: req.files[med].path, // Store the file path
                filename: req.files[med].filename, // Store the file filename
            });
            medias.push(result);
        }

        // Update media field in BuyHome and save
        buyHome.media = medias;
        await buyHome.save();

        return res.status(201).json({
            success: true,
            buyHome,
            message: "Home is created successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


// list of all home 
exports.listHomes = catchAsyncErrors(async (req, res) => {
    try {

        const buyHome = await BuyHome.find().populate('media')

        return res.status(201).json({
            success: true,
            buyHome,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
});





// list of all delete home
// Corrected deleteBuyHome controller function
exports.deleteHome = catchAsyncErrors(async (req, res, next) => {
    try {
        const {
            id
        } = req.params;

        // Validate if id is a valid ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: "Invalid BuyHome ID",
            });
        }

        // Use findByIdAndDelete to find and delete the document
        const buyHome = await BuyHome.findByIdAndDelete(id);

        // Check if buyHome exists
        if (!buyHome) {
            return res.status(404).json({
                success: false,
                message: "BuyHome not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "BuyHome deleted successfully",
            buyHome
        });
    } catch (error) {
        console.error("Error in deleteHome handler:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});