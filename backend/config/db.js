const mongoose = require("mongoose");

function connectDB() {
    mongoose
      .connect("mongodb://127.0.0.1:27017/library_management")
      .then(function () {
        console.log("MongoDB connected");
      })
      .catch(function (error) {
        console.log("MongoDB connection error:", error.message);
      });
}

module.exports = connectDB;