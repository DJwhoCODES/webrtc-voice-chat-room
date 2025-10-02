require("dotenv").config();
const express = require("express");
const router = require("./routes");
const DbConnect = require("./database");
const cors = require("cors");
const cookiesParser = require("cookie-parser");
const app = express();

const PORT = process.env.PORT || 5050;

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
};

app.use('/storage', express.static('storage'));

app.use(express.json({ limit: '8mb' }));
app.use(cors(corsOptions));
app.use(cookiesParser());

DbConnect();

app.get("/", (req, res) => {
    res.send("Hello from express server");
})

app.use(router);

app.listen(PORT, () => {
    console.log(`✅ Listening on port: ${PORT}`)
})