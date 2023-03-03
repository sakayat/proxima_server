const express = require("express");
const { createPost, getAllProjects, singleProject, deleteProject, updateProject } = require("../controller/projectController");


// router
const router = express.Router();

// get allP projects
router.get("/", getAllProjects);

// get single project
router.get("/:id", singleProject);

// create post
router.post("/", createPost);

// project delete
router.delete("/:id", deleteProject);

// project update
router.patch("/:id", updateProject);

module.exports = router;
