const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const puhelinnumeroSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Puhelinnumero = mongoose.model('Puhelinnumero', puhelinnumeroSchema)

// Samaan tapaan kuin salasanan kanssa
const nimi = process.argv[3]
const numero = process.argv[4]

const puhelinnumero = new Puhelinnumero({
  name: nimi,
  number: numero,
})
// Määritetään pituuden mukaan, miten ohjelma reagoi komentoon.
if (process.argv.length <= 3) {
Puhelinnumero
.find({})
.then(result => {
console.log("phonebook: ")
  result.forEach(puhelinnumero => {
    console.log((puhelinnumero.name), (puhelinnumero.number))
  })
  mongoose.connection.close()
})
}
else {
puhelinnumero.save().then(response => {
  console.log('added ', nimi, ' number ', numero, ' to phonebook')
  mongoose.connection.close()
})}