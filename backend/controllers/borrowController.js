const Book = require("../models/Book");
const BorrowRecord = require("../models/BorrowRecord");

async function borrowBook(req, res) {
  try {
    const userId = req.body.userId;
    const bookId = req.body.bookId;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });  
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({
        message: "Book is not available"
      });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const borrowRecord = new BorrowRecord({
      userId: userId,
      bookId: bookId,
      dueDate: dueDate,
      status: "borrowed"  
    });

    const savedRecord = await borrowRecord.save();

    book.availableCopies = book.availableCopies - 1;
    await book.save();

    res.status(201).json({
      message: "Book borrowed successfully",
      borrowRecord: savedRecord
    });
  } catch (error) {
    res.status(500).json({
      message: "Borrow failed",
      error: error.message  
    });
  }
}

async function returnBook(req, res) {
    try {
      const recordId = req.body.recordId;

      const record = await BorrowRecord.findById(recordId);

      if (!record) {
        return res.status(404).json({
          message: "Borrow record not found"  
        });
      }

      if (record.status === "returned") {
        return res.status(400).json({
          message: "Book already returned"
        });
      }

      record.status = "returned";
      record.returnDate = new Date();

      await record.save();

      const book = await Book.findById(record.bookId);

      if (book) {
        book.availableCopies = book.availableCopies + 1;
        await book.save();
      }

      res.status(200).json({
        message: "Book returned successfully",
        borrowRecord: record
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to get user borrow history",
        error: error.message
      });  
    }
}
async function getUserBorrowHistory(req, res) {
  try {
    const records = await BorrowRecord.find({
      userId: req.params.userId
    })
     .populate("bookId")
     .populate("userId");
  res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get user borrow history",
      error: error.message
    });
  }
}
async function getAllBorrowRecords(req, res) {
  try {
    const records = await BorrowRecord.find()
     .populate("bookId")
     .populate("userId");
res.status(200).json(records);
 } catch (error) {
  res.status(500).json({
    message: "Failed to get borrow records",
    error: error.message
  });
 }
}

module.exports = {
  borrowBook,
  returnBook,
  getUserBorrowHistory,
  getAllBorrowRecords
};
  