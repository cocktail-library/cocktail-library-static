import { Router } from 'express'
import { wrap } from '../utils/wrap'
import { iocContainer } from '../ioc-container'
import { FilesController } from './files.controller'
import { TYPES } from '../ioc-types'

const fileRouter = Router()
const filesController = iocContainer.get<FilesController>(TYPES.FilesController)

fileRouter.get('/', wrap(filesController.listAll))
fileRouter.get('/:fileId/metadata', wrap(filesController.getMetadata))
fileRouter.get('/:fileId', filesController.getFile)
fileRouter.post('/', wrap(filesController.create))
fileRouter.delete('/:fileId', wrap(filesController.delete))

export { fileRouter }
