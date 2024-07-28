const express = require("express");
const spacesController = require("../controllers/spacesController");

const router = express.Router();

router.get("/", spacesController.spaces_index);
router.post("/", spacesController.spaces_create_post);
router.get("/create", spacesController.spaces_create_get);
router.get("/:id", spacesController.spaces_details);
router.delete("/:id", spacesController.spaces_delete);

module.exports = router;