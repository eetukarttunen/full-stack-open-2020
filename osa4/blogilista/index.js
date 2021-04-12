const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
require('dotenv').config()

const server = http.createServer(app)

// const PORT = process.env.PORT toinen tapa

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
