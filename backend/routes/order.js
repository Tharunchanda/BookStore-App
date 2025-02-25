const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user")
 
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;
    for (const orderData of order) {
      const newOrder = new Order({
      user: id,
      book: orderData._id
      }); 
      const orderDataFromDb = await newOrder.save();
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }
    return res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An Error Occured" });
  }
});

router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });
    const orderData = userData.orders.reverse();
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      status: "success",
      data :orderData,
     });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An Error Occurred" });
  }
});

router.get("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({
        path: "book",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });
    return res.json({
      status: "success",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});
router.put("/update-status/:oid", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    console.log("User ID from headers:", id);

    if (!id) {
      return res.status(400).json({ message: "User ID missing in headers" });
    }

    const userData = await User.findById(id);
    console.log("User Data:", userData);

    if (!userData || userData.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized Access" });
    }

    const { oid } = req.params;
    console.log("Updating order status for Order ID:", oid, "New Status:", req.body.status);

    const updatedOrder = await Order.findByIdAndUpdate(
      oid,
      { status: req.body.status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json({
      status: "Success",
      message: "Status Updated Successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error("Error in /update-status/:oid:", error);
    return res.status(500).json({ message: "An Error Occurred" });
  }
});

module.exports = router;