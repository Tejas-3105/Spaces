const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const spaceRoutes = require("./routes/spaceRoutes");
const bodyParser = require("body-parser");
const multer = require("multer");
const Space = require("./models/space");

// express app
const app = express();

// connect to MongoDB & listen for requests
const dbURI =
  "mongodb+srv://tejasst0544:spaces2024@spaces.x7z5doi.mongodb.net/?retryWrites=true&w=majority&appName=Spaces";

mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
    console.log("Connected to DB");
      console.log(JSON.stringify(result, null, 2));
      console.log(JSON.stringify(result, null, 2));
    Space.find({}, { img: 0 }).lean()
    .then(result => {
      console.log(JSON.stringify(result, null, 2));
    })
    .catch(err => {
      console.log(err);
    })
  })
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan("dev"));

// Configure multer for file uploads
const upload = multer({ 
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Routes
app.get("/", (req, res) => {
  res.redirect("/spaces");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// spaces routes
app.use("/spaces", upload.single('img'), spaceRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

module.exports = app;