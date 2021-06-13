// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const db = require("./projects-model");

const {
  validateProjectID,
  validateProject,
} = require("../middleware/middleware");

router.get("/api/projects", async (req, res, next) => {
  try {
    const allProjects = await db.get();
    res.status(200).json(allProjects);
  } catch (err) {
    next(err);
  }
});

router.get("/api/projects/:id", validateProjectID, async (req, res) => {
  res.json(req.thisProject);
});

router.post("/api/projects", validateProject, async (req, res, next) => {
  try {
    const newProject = await db.insert(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/api/projects/:id",
  validateProjectID,
  validateProject,
  async (req, res, next) => {
    try {
      const updatedProject = await db.update(req.params.id, req.body);
      res.status(200).json(updatedProject);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/api/projects/:id",
  validateProjectID,
  async (req, res, next) => {
    try {
      const deleted = await db.remove(req.params.id);
      res
        .status(200)
        .json({ deleted, message: "The project has been deleted" });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/api/projects/:id/actions", async (req, res, next) => {
  try {
    const actions = await db.getProjectActions(req.params.id);
    if (!actions) {
      res.status(404).json({
        message: `The actions for this project id ${req.params.id} does not exist`,
      });
    } else {
      res.json(actions);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;