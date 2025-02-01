const router = require("express").Router();
const User = require('../models/user');
const { authenticateToken } = require("./userAuth");

// PUT: Add book to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
   try {
       const { bookid, id } = req.headers;      
       if (!bookid || !id) {
           return res.status(400).json({
               status: "error",
               message: "Both book ID and user ID are required."
           });
       }

       // Check if the bookid format is valid (MongoDB ObjectId format)
       if (!/^[0-9a-fA-F]{24}$/.test(bookid)) {
           return res.status(400).json({
               status: "error",
               message: "Invalid Book ID format"
           });
       }

       // Fetch user data from database
       const userData = await User.findById(id);
       
       // If the user is not found, return a 404 error
       if (!userData) {
           return res.status(404).json({
               status: "error",
               message: "User not found"
           });
       }

       // Check if the book is already in the user's cart
       const isBookInCart = userData.cart.includes(bookid);
       if (isBookInCart) {
           return res.json({
               status: "success",
               message: "Book is already in Cart"
           });
       }

       // Add book to user's cart
       await User.findByIdAndUpdate(id, {
           $push: { cart: bookid }
       });

       // Return success message
       return res.json({
           status: "success",
           message: "Book added to Cart"
       });
   } catch (error) {
       console.error(error);  // Log the error for debugging purposes
       return res.status(500).json({
           status: "error",
           message: "An error occurred while processing your request"
       });
   }
});
//PUT : remove book from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
   try {
       const { bookid } = req.params;
       const { id } = req.headers;
       await User.findByIdAndUpdate(id, {
           $pull: { cart: bookid },
       });
       return res.json({
           status: "success",
           message: "Book removed from cart",
       });
   } catch (error) {
       console.log(error);
       return res.status(500).json({ message: "An error occurred" });
   } 
});
router.get("/get-user-cart", authenticateToken, async (req, res) => {
   try {
       const { id } = req.headers;
       const userData = await User.findById(id).populate("cart");
       const cart = userData.cart.reverse();
       return res.json({
           status: "success",
           data: cart
       });
   } catch (error) {
       console.log(error);
       return res.status(500).json({ message: "An Error Occurred" });
   } 
});

// Export the router for use in other files
module.exports = router;
