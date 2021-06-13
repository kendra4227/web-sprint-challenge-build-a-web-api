const project = require("../projects/projects-model");
const action = require("../actions/actions-model");

const validateProjectID = async (req, res, next) => {
  try {
    const thisProject = await project.get(req.params.id);
    if (thisProject) {
      req.thisProject = thisProject;
      next();
    } else {
      res.status(404).json({
        message: `The project with id ${req.params.id} does not exist`,
      });
    }
  } catch (err) {
    next(err);
  }
};

const validateProject = async (req, res, next) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({
      message: "Missing required name or description field",
    });
  }
  next();
};

const validateActionID = async (req, res, next) => {
  try {
    const thisAction = await action.get(req.params.id);
    if (thisAction) {
      req.thisAction = thisAction;
      next();
    } else {
      res.status(404).json({
        message: `The action with id ${req.params.id} does not exist`,
      });
    }
  } catch (err) {
    next(err);
  }
};

const validateAction = async (req, res, next) => {
  if (!req.body.description || !req.body.notes) {
    return res.status(400).json({
      message: "Missing required description or notes field",
    });
  }
  next();
};

module.exports = {
  validateProjectID,
  validateProject,
  validateActionID,
  validateAction,
};