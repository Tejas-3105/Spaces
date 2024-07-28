const Space = require("../models/space");

// Display all spaces
const spaces_index = (req, res) => {
  Space.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("spaces/index", { spaces: result, title: "All Spaces" });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Display details of a single space
const spaces_details = (req, res) => {
  const id = req.params.id;
  Space.findById(id)
    .then((result) => {
      res.render("spaces/details", { spaces: result, title: "Space Details" });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "Space not found" });
    });
};

// Render the form to create a new space
const spaces_create_get = (req, res) => {
  res.render("spaces/create", { title: "Create a new space" });
};

// Handle form submission for creating a new space
const spaces_create_post = (req, res) => {
  const {
    title,
    category,
    description,
    nearestBuilding,
    type,
    outlets,
    capacity,
    peak,
    time1,
    time2,
    img,
  } = req.body;

  const space = new Space({
    title,
    category,
    description,
    nearestBuilding,
    type,
    outlets,
    capacity,
    peak,
    time1,
    time2,
    img: {
      data: Buffer.from(img, 'base64'),
      contentType: img ? img.split(";")[0].split(":")[1] : "image/png",
    },
  });

  space
    .save()
    .then((result) => {
      res.json({ redirect: '/spaces' });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete a space
const spaces_delete = (req, res) => {
  const id = req.params.id;

  Space.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/spaces" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  spaces_index,
  spaces_details,
  spaces_create_get,
  spaces_create_post,
  spaces_delete
};