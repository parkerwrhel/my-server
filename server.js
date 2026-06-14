const express = require("express");
const app = express();

app.use(express.json());

let events = [];

app.post("/event", (req, res) => {
    events.push(req.body);

    if (events.length > 100) events.shift();

    res.json({ ok: true });
});

app.get("/events", (req, res) => {
    res.json(events);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
