/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { AppDataSource } from './data-source'
import 'dotenv/config'
import * as swaggerUi from 'swagger-ui-express'

import swaggerDocs from './swagger-output.json'

// import { Request, Response } from 'express'

import * as bodyParser from 'body-parser'
import routes from './http/controllers/routes'

AppDataSource.initialize()
  .then(async () => {
    const app = express()
    app.use(bodyParser.json())

    // Routes.forEach((route) => {
    //   ;(app as any)[route.method](
    //     route.route,
    //     (req: Request, res: Response, next: Function) => {
    //       const result = new (route.controller as any)()[route.action](
    //         req,
    //         res,
    //         next,
    //       )
    //       if (result instanceof Promise) {
    //         result.then((result) =>
    //           result !== null && result !== undefined
    //             ? res.send(result)
    //             : undefined,
    //         )
    //       } else if (result !== null && result !== undefined) {
    //         res.json(result)
    //       }
    //     },
    //   )
    // })

    app.listen(process.env.PORT)
    app.use('/api/v1/', routes)
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

    console.log(`Express server started on port ${process.env.PORT}`)
  })
  .catch((error) => console.error(error))
