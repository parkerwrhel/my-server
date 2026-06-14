const express = require("express");
const app = express();

app.use(express.json());

// simple data storage (in memory)
let dataLines = [];

// health check
app.get("/", (req, res) => {
    res.send("Data server running 24/7");
});

//  post ANY data
app.post("/data", (req, res) => {
    const entry = {
        data: req.body,
        time: Date.now()
    };

    dataLines.push(entry);

    // keep last 200 entries
    if (dataLines.length > 200) {
        dataLines.shift();
    }

    res.json({
        success: true,
        stored: entry
    });
});

//  get all data
app.get("/data", (req, res) => {
    res.json(dataLines);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Data server running on port " + PORT);
});
