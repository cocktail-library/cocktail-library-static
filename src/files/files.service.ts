import { FilesRepository } from './files.repository'
import { inject, injectable } from 'inversify'
import { TYPES } from '../ioc-types'
import { UploadedFile } from 'express-fileupload'

@injectable()
class FilesService {
  // eslint-disable-next-line no-unused-vars
  constructor(@inject(TYPES.FilesRepository) private filesRepository: FilesRepository) {}

  listFiles(offset = 0, limit = 100) {
    return this.filesRepository.listAll(offset, limit)
  }

  getFile(fileId: string) {
    return this.filesRepository.get(fileId)
  }

  getFileMetadata(fileId: string) {
    return this.filesRepository.getMetadata(fileId)
  }

  createFile(file: UploadedFile) {
    return this.filesRepository.create(file)
  }

  deleteFile(fileId: string) {
    return this.filesRepository.delete(fileId)
  }
}

export { FilesService }
