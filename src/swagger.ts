import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:3000',
}

const outputFile = './swagger-output.json'
const routes = ['./src/http/controllers/routes.ts']

swaggerAutogen()(outputFile, routes, doc)
