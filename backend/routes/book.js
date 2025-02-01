const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");

// Add book --admin
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);

        // Check if the user is an admin
        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        // Destructure book details and validate required fields
        const { url, title, author, price, desc, language } = req.body;
        if (!url || !title || !author || price == null || !desc || !language) {
            return res.status(400).json({ message: "All book details are required." });
        }

        // Create and save the new book
        const book = new Book({ url, title, author, price, desc, language });
        await book.save();

        res.status(200).json({ message: "Book added successfully." });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
//update book
router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid,{   
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language:req.body.language,
        });
        res.status(200).json({ message: "Book Updated successfully." });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
//delete book
router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        res.status(200).json({ message: "Book Deleted successfully." });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
//get all books
router.get("/get-all-books", async (req, res) => {
   try {
       const books = await Book.find().sort({ createdAt: -1 });
       return res.json({
           status: "Success",
           data: books,
       });
   } catch (error) {
       console.log(error);
       return res.status(500).json({ message: "An error occurred" });
   } 
});
//get recent books
router.get("/get-recent-books", async (req, res) => {
   try {
       const books = await Book.find().sort({ createdAt: -1 }).limit(4);
       return res.json({
           status: "Success",
           data: books,
       });
   } catch (error) {
       console.log(error);
       return res.status(500).json({ message: "An error occurred" });
   } 
});
//get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
   try {
       const { id } = req.params;
       const book = await Book.findById(id);
       return res.json({
           status: "Success",
           data: book,
       });
   } catch (error) {
       console.log(error);
       return res.status(500).json({ message: "An error occurred" });
   } 
});

module.exports = router;
