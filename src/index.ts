import express from 'express'
import { applyMigrations } from './utils/apply-migrations'
import { logger } from './utils/logger'
import { app as appConfig, fileStorage as fileStorageConfig } from './config'
import bodyParser from 'body-parser'

import { fileRouter } from './files/files.routes'
import fileUpload from 'express-fileupload'

const app = express()

app.use(fileUpload(fileStorageConfig))
app.use(bodyParser.json())

app.get('/ping', (_, res) => res.send('pong'))

app.use('/static/files', fileRouter)

applyMigrations().then(() => {
  app.listen(appConfig.port, () => {
    logger.info(`App listening on port ${appConfig.port}`)
  })
})
