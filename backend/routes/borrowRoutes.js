const express = require("express");
const router = express.Router();

const borrowController = require("../controllers/borrowController");

router.post("/", borrowController.borrowBook);
router.post("/return", borrowController.returnBook);
router.get("/user:userId", borrowController.getUserBorrowHistory);
router.get("/all", borrowController.getAllBorrowRecords);

module.exports = router;