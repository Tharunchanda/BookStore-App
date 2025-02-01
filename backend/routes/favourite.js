const router = require("express").Router();
const User = require('../models/user');
const { authenticateToken } = require("./userAuth");

//add book to favourites
router.put("/add-book-to-favourites", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            return res.status(200).json({ message: "Book is Already in Favourites" });
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
        return res.status(200).json({ message: "Book Added to Favourites" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
//delete book from favourites
router.put("/remove-book-from-favourites", authenticateToken, async (req, res) => {
     try {
         const { bookid, id } = req.headers;
         const userData = await User.findById(id);
         const isBookFavourite = userData.favourites.includes(bookid);
         if (isBookFavourite) {
            await User.findByIdAndDelete(id, { $pull: { favourites: bookid } });
         }
         return res.status(200).json({ message: "Book removed from Favourites" });
     } catch (error) {
         res.status(500).json({ message: "Internal Server Error" });
     }
});
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
   try {
       const { id } = req.headers;
       if (!id) {
           return res.status(400).json({ message: "User ID is required" });
       }

       const userData = await User.findById(id).populate("favourites");
       if (!userData) {
           return res.status(404).json({ message: "User not found" });
       }

       const favouriteBooks = userData.favourites;
       return res.json({ status: "success", data: favouriteBooks });

   } catch (error) {
       console.error(error);
       return res.status(500).json({ message: "An error occurred while fetching favourite books", error: error.message });
   } 
});

module.exports = router;