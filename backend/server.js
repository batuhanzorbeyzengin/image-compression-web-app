const express = require("express");
const app = express();
app.use(express.json({limit: '50mb'}));
const cors = require('cors');

app.use(cors());

const router = require("./routers/router.js");
app.use("/api/v1", router);

app.listen(3001, () => console.log("Server running on port " + 3001));