const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser")
const dotenv = require("dotenv");
const cors = require("cors")
const connectdb = require("./db/dbconnection")

// uncaught exception 
process.on("uncaughtException", (err) => {
  console.log(`error:${err.message}`);
  console.log(`shutting down your server due to uncaught Exception`);
  process.exit(1);
})


dotenv.config();
connectdb();


// all path routes
const FindErrorMiddleware = require("./middlewares/error");
const buyHomeRoutes = require("./routes/buyHomeRoutes");
const router = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//middleware routes import
app.use(FindErrorMiddleware);
app.use("/api/v1", buyHomeRoutes);
app.use("/api/v1", router);

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});


process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`shutting down server due to unhandled promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});


