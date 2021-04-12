/**
 * Full Stack Open 2021
 * Eetu Karttunen, UEF
 * Tehtävät 3.1-3.15
 */

require('dotenv').config()
var date = new Date()
const express = require('express')
const app = express()
app.use(express.json()) 
const cors = require('cors')
app.use(express.static('build'))
app.use(cors())
const morgan = require('morgan')
const Puhelinnumero = require('./models/person')
// Jos ei ole post niin null ja jos on niin sitten tulostaa datan.
app.use(morgan('tiny'))
morgan.token('person', (req) => {
  if (req.method !== 'POST') {
  return null
}
else {
  return JSON.stringify(req.body)
}})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))


let persons = [
  { 
    
    id: 1,
    name: "Arto Hellas", 
    number: "040-123456",

  },
  {
    id: 2,
    name: "Ada Lovelace", 
    number: "39-44-5323523",

  },
  {
    id: 3,
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick", 
    number: "39-23-6423122"
  },


]


// request sisältää kaikki HTTP-pyynnön tiedot ja 
// toisen parametrin response:n avulla määritellään, miten pyyntöön vastataan.

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Puhelinnumero.find({}).then(puh => {
    response.json(puh)
  })
})

app.get('/info', (req, res) => {
  res.send(
  '<p>Phonebook has info for ' +persons.length+ ' people</p>'+ date)

})

/*
app.get('/api/persons/:id', (req, res) => {

  const id = Number(req.params.id)
  const note = persons.find(note => note.id === id)
  
  // Consoleen tulee GET http://localhost:3001/api/persons/6 400 (Bad Request) ja näkyviin content missing error
  if (id>persons.length) {
    return res.status(400).json({ 
      error: 'content missing' 
    })
  }
  else {
    res.json(note)
  }
  
})
*/
app.get('/api/persons/:id', (req, res, next) => { //HTTP GET
  Puhelinnumero.findById(req.params.id)
  console.log(Puhelinnumero.length)
    .then(personsNum => {
      if (personsNum) 
      res.json(personsNum.toJSON())
      else 
      res.status(400).end()
      
    })
    .catch(error => next(error))
})

// poisto vanha
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(note => note.id !== id)

  res.status(204).end()
})

app.delete('/api/persons/:id', (request, response, next) => {
  Puhelinnumero.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

//lisäys
const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (req, res) => {
  const body = req.body
  
  // jos ei ole nimeä 
  if (body.name === undefined) {
    return res.status(400).json({ error: 'name is missing' 
    })
  }
  
  // jos ei ole numeroa
  else if (body.number === undefined ) {
    return res.status(400).json({ 
      error: 'number is missing' 
    })
  }

// jos sama kuin jokin aiemmista
  else if (persons.find(pe => pe.name === body.name)) {
      return res.status(400).json({
          error: 'Name must be unique'
      })
  }

  const person = new Puhelinnumero({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})