import { Container } from 'inversify'
import 'reflect-metadata'

import { TYPES } from './ioc-types'
import { FilesController } from "./files/files.controller";
import { FilesService } from "./files/files.service";
import { FilesRepository } from "./files/files.repository";

const iocContainer = new Container()

iocContainer.bind<FilesRepository>(TYPES.FilesRepository).to(FilesRepository)
iocContainer.bind<FilesService>(TYPES.FilesService).to(FilesService)
iocContainer.bind<FilesController>(TYPES.FilesController).to(FilesController)

export { iocContainer }
