const express = require('express')
const { notFound } = require('../controller/ErrorController')
const Sensor = require('../model/sensor')
const error = require('../model/error')
const router = new express.Router()

router.post('/sensors', async (req, res, next) => {
    var sensor = new Sensor({
        ...req.body
    })
    
    try {
        await sensor.save()
        res.status(201).send(sensor)    
    } catch (err) {
        console.log(err)
        next(err)
    }
})

router.get('/sensors', async (req, res, next) => {
    const {
        limit,
        offset,
        orderBy
    } = req.query

    var parsedOffset = 0
    if (offset) 
        parsedOffset = offset

    var parsedLimit = 10
    if (limit)
        parsedLimit = limit

    var order = -1
    if (orderBy) {
        if (orderBy === 'asc') order = 1
        else if (orderBy === 'desc') order = -1
        else return res.status(400).send()
    }

    const sort = {
        'createdAt': order
    }

    try {
        const sensors = await Sensor.find(null, null, {
            limit: parseInt(parsedLimit),
            skip: parseInt(parsedOffset),
            sort
        })
        res.status(200).send(sensors)
    } catch (error) {
        next(error)   
    }
})

router.get('/sensors/:categoryId', async (req, res, next) => {
    const match = { category: req.params.categoryId }

    const {
        limit,
        offset,
        orderBy
    } = req.query

    var parsedOffset = 0
    if (offset) 
        parsedOffset = offset

    var parsedLimit = 10
    if (limit)
        parsedLimit = limit

    var order = -1
    if (orderBy) {
        if (orderBy === 'asc') order = 1
        else if (orderBy === 'desc') order = -1
        else return res.status(400).send()
    }

    const sort = {
        'createdAt': order
    }

    const sensors = await Sensor.find(
        match,
        null,
        {
            limit: parseInt(parsedLimit),
            skip: parseInt(parsedOffset),
            sort
        }
    ) 
    try {
        res.send(sensors)
    } catch (err) {
        next(err)
    }
})

router.patch('/sensors/:id', async (req, res, next) => {
    const sensor = await Sensor.findById(req.params.id)

    const updates = Object.keys(req.body)
    if (!sensor) {
        return res.status(404).send(notFound(404, 'Sensor'))
    }

    try {
        updates.forEach((update) => sensor[update] = req.body[update])
        await sensor.save()
        res.send(sensor)
    } catch (err) {
        next(err)
    }
})

router.delete('/sensors/:id', async (req, res, next) => {
    try {
        const sensor = await Sensor.findById(req.params.id)
        await sensor.remove()
        res.send(sensor)
    } catch (err) {
        next(err)
    }
})

module.exports = router