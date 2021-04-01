const router = require('express').Router()
const Anecdote = require('../models/anecdote')

router.get('/', async (request, response) => {
  const anecdotes = await Anecdote.find({})
  response.json(anecdotes)
})

router.post('/', async (request, response) => {
  const { content } = request.body
  const newAnecdoteObject = { content }
  const anecdote = new Anecdote(newAnecdoteObject)

  const savedAnecdote = await anecdote.save()
  response.status(201).json(savedAnecdote)
})

router.put('/:id', async (request, response) => {
  const { body } = request
  const anecdote = JSON.parse(JSON.stringify(body))
  const updatedAnecdote = await Anecdote.findByIdAndUpdate(
    request.params.id,
    anecdote,
    { new: true }
  )
  response.json(updatedAnecdote)
})

router.get('/:id', async (request, response) => {
  const anecdote = await Anecdote.findOne({ _id: request.params.id })
  response.json(anecdote)
})

module.exports = router