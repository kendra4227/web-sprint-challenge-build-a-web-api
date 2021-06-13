// Write your "projects" router here!
const express = require('express')
const router = express.Router()
const Projects = require('./projects-model')

router.get('/', (req, res) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "Couldn't get project"})
        })
})

router.get('/:id', (req, res) => [
    Projects.get(req.params.id)
    .then(project => {
        if (project) {
            res.status(200).json(project)
        }
        else {
            res.status(404).json({error: "Couldn't get specified project."})
        }
    })
])

router.post('/', (req, res) => {

    if (!req.body.name || !req.body.description){
        res.status(400).json({ errorMessage: 'Missing fields'})
    }

    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "Missing error"})
        })
})

router.put('/:id', (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(project => {
        if (req.body.name && req.body.description && req.body.completed) {
            res.status(200).json(project)
        }
        else {
            res.status(400).json( {error: "Missing fields"})
        }
    })
    .catch (error => {
        console.log(error)
        res.status(400).json({ error: "Couldn't update"})
    })
})

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then(project => {
        if (project) {
            res.status(200).json({message: "Project deleted"})
        }
        else {
            res.status(404).json({message: "Couldn't find project"})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "Critical error"})
    })
})

router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            if (actions) {
                res.status(200).json(actions)
            } else {
                res.status(404).json({ error: "Couldn't find the actions array"})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: "Critical error"})
        })
})

module.exports = router

