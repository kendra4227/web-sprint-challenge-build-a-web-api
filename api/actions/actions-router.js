// Write your "actions" router here!
const express = require('express')
const router = express.Router()
const db = require('./actions-model')

const{
    validateActionID,
    validateAction
} = require('../middleware/middleware')

router.get("/api/actions", async (req, res, next) => {
    try {
      const getActions = await db.get();
      res.json(getActions);
    } catch (err) {
      next(err);
    }
  });
  
  router.get("/api/actions/:id", validateActionID, async (req, res) => {
    res.json(req.thisAction);
  });
  
  router.post("/api/actions", async (req, res, next) => {
    try {
      const newAction = await db.insert(req.body);
      res.status(201).json(newAction);
    } catch (err) {
      next(err);
    }
  });
  
  router.put("/api/actions/:id", validateAction, async (req, res, next) => {
    try {
      const updatedAction = await db.update(req.params.id, req.body);
      res.status(200).json(updatedAction);
    } catch (err) {
      next(err);
    }
  });
  
  router.delete("/api/actions/:id", validateActionID, async (req, res, next) => {
    try {
      const deleted = await db.remove(req.params.id);
      console.log(deleted);
      res.status(200).json({ message: "The action has been deleted" });
    } catch (err) {
      next(err);
    }
  });
  
  module.exports = router