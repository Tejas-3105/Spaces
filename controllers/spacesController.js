const Space = require("../models/space");

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

const spaces_details = (req, res) => {
  const id = req.params.id;
  Space.findById(id)
    .then((result) => {
      res.render("spaces/details", { spaces: result, title: "Space Details" });
    })
    .catch((err) => {
      res.status(404).render('404', { title: 'Space not found' });
    });
};

const spaces_create_get = (req, res) => {
  res.render("spaces/create", { title: "Create a new space" });
};

const spaces_create_post = (req, res) => {
  const space = new Space(req.body);

  space
    .save()
    .then((result) => {
      res.redirect("/spaces");
    })
    .catch((err) => {
      console.log(err);
    });
};

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
  spaces_delete,
};