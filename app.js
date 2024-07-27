const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const spaceRoutes = require('./routes/spaceRoutes');

// express app
const app = express();

// connect to MongoDB & listen for requests
const dbURI =
  "mongodb+srv://tejasst0544:spaces2024@spaces.x7z5doi.mongodb.net/?retryWrites=true&w=majority&appName=Spaces";

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// Routes
app.get("/", (req, res) => {
  console.log('Connected to DB');
  res.redirect("/spaces");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use('/spaces', spaceRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});