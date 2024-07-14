/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { AppDataSource } from './data-source'
import * as swaggerUi from 'swagger-ui-express'

import swaggerDocs from './swagger-output.json'

// import { Request, Response } from 'express'

import * as bodyParser from 'body-parser'
import routes from './http/controllers/routes'
import { env } from './env'

export const app = express()

AppDataSource.initialize()
  .then(async () => {
    app.use(bodyParser.json())

    app.listen(env.PORT)
    app.use('/api/v1/', routes)
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

    console.log(`Express server started on port ${env.PORT}`)
  })
  .catch((error) => console.error(error))
