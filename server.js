const express = require("express");
const app = express();

app.use(express.json());

// store events in memory
let events = [];

app.get("/", (req, res) => {
    res.send("Server is running 24/7!");
});

// health check
app.get("/api", (req, res) => {
    res.json({ status: "online", time: Date.now() });
});

// 📥 POST event from Unity
app.post("/event", (req, res) => {
    const { message } = req.body;

    const event = {
        message: message,
        time: Date.now()
    };

    events.push(event);

    // keep only last 50 events
    if (events.length > 50) events.shift();

    res.json({ success: true });
});

// 📡 get all events (everyone can see)
app.get("/events", (req, res) => {
    res.json(events);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
