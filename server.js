const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const pinRoute = require("./routes/pins");

const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const cookieSession = require("cookie-session");

const session = require("express-session");
const bodyParser = require("body-parser");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const CLIENT_URL = "http://localhost:3000";

dotenv.config();
connectDB();
const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["lama"],
    maxAge: 30 * 24 * 60 * 60 * 100,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json()); // to accept json data

app.get("/", (req, res) => {
  res.send("API Running!");
});

app.use("/api/user", userRoutes);
app.use("/api/todo", pinRoute);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on PORT ${PORT}...`.yellow.bold));
