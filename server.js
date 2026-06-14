const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Server is running 24/7!");
});

app.get("/api", (req, res) => {
    res.json({ status: "online", time: Date.now() });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});