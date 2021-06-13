// Write your "actions" router here!
const express = require('express')
const router = express.Router()
const Actions = require('./actions-model')

router.get('/', (req, res) => {
    Actions.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json("The actions could not be retrieved.")
    })
})

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
    .then(action => {
        if (action) {
            // If the action exists
            res.status(200).json(action)
        } else {
            // If it doesn't exist
            res.status(404).json( {message: "The action with the specified ID does not exist"})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json( {error: "The action information could not be retrieved."})
    })
})

router.post('/', (req, res) => {

    if(!req.body.project_id || !req.body.description || !req.body.notes){
        res.status(400).json({ error: 'Incomplete body'} )
    }

    Actions.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "There was an error while saving the posts to the database."})
    })
})

router.put('/:id', (req, res) => {

    Actions.update(req.params.id, req.body)
    .then(action => {
        // Require all fields to be present before you can update actions
        if (req.body.project_id && req.body.description && req.body.notes && req.body.completed) {
            res.status(200).json(action)
        }
        else {
            res.status(400).json({ error: "Missing fields."})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(400).json({error: "Critical error."})
    })
})

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then(action => {
        if (action) {
            res.status(200).json({message: "Successfully deleted action"})
        } else {
            res.status(404).json({error: "The action with the specified id does not exist"})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: "The action could not be removed."})
    })
})

module.exports = router