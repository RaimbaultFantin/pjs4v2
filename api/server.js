const express = require("express");
const app = express();

app.get("/test", (req, res) => {
    res.json("yo");
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);