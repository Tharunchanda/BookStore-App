const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const user = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");

const cors = require("cors");

app.use(express.json());
app.use(cors());  

// Routes
app.use("/api/v1", user);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
// Root route
app.get("/", (req, res) => {
    res.send("Hello from backend...");
});


const PORT = process.env.PORT || 3000; 
app.listen(PORT, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    } else {
        console.log(`Server started on port ${PORT}`);
    }
});
