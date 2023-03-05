const { default: mongoose } = require("mongoose");
const Project = require("../models/projectModal");

// create project

const createPost = async (req, res) => {
  const { title, tech, budget, duration, manager, dev } = req.body;

  let emptyFileds = [];
  if (!title) {
    emptyFileds.push("title");
  }
  if (!tech) {
    emptyFileds.push("tech");
  }
  if (!budget) {
    emptyFileds.push("budget");
  }
  if (!duration) {
    emptyFileds.push("duration");
  }
  if (!manager) {
    emptyFileds.push("manager");
  }
  if (!dev) {
    emptyFileds.push("dev");
  }

  if (emptyFileds.length > 0) {
    return res
      .status(400)
      .json({ error: "please fill all the fields", emptyFileds });
  }

  try {
    const user_id = req.user._id
    const project = await Project.create({ ...req.body, user_id });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all projects
const getAllProjects = async (req,res) => {
  const user_id = req.user._id
  const projects = await Project.find({user_id}).sort({ createdAt: -1 });
  res.status(200).json(projects);
};

// get single project
const singleProject = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json("invalid id");
  }
  const project = await Project.findById(id);
  if (!project) {
    return res.status(404).json("project not found");
  }
  res.status(200).json(project);
};

// delete project
const deleteProject = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json("invalid id");
  }
  const project = await Project.findOneAndDelete({ _id: id });
  if (!project) {
    return res.status(404).json("project not found");
  }
  res.status(200).json(project);
};

// update project
const updateProject = async (req, res) => {
  const { id } = req.params;

  const { title, tech, budget, duration, manager, dev } = req.body;

  let emptyFileds = [];
  if (!title) {
    emptyFileds.push("title");
  }
  if (!tech) {
    emptyFileds.push("tech");
  }
  if (!budget) {
    emptyFileds.push("budget");
  }
  if (!duration) {
    emptyFileds.push("duration");
  }
  if (!manager) {
    emptyFileds.push("manager");
  }
  if (!dev) {
    emptyFileds.push("dev");
  }

  if (emptyFileds.length > 0) {
    return res
      .status(400)
      .json({ error: "please fill all the fields", emptyFileds });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json("invalid id");
  }
  const project = await Project.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  if (!project) {
    return res.status(404).json({ error: "No Project Found" });
  }
  res.status(200).json(project);
};

module.exports = {
  createPost,
  getAllProjects,
  singleProject,
  deleteProject,
  updateProject,
};
