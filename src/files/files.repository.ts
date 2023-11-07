import { sequelize } from '../db-connection'
import { GenericRepository } from '../generic/generic.repository'
import { File, FileStatus, IFile } from './files.entity'
import { injectable } from 'inversify'
import { UploadedFile } from 'express-fileupload'
import { getExtensionFromFilename } from '../utils/upload'
import { app as appConfig } from '../config'
import path from 'path'
import { logger } from '../utils/logger'

@injectable()
class FilesRepository {
  private baseRepository: GenericRepository<IFile>
  constructor() {
    this.baseRepository = new GenericRepository(File(sequelize), 'fileId')
  }

  async listAll(offset = 0, limit = 100, where = {}) {
    return this.baseRepository.listAll(offset, limit, where)
  }

  async get(fileId: string) {
    return await this.baseRepository.get(fileId)
  }

  async getMetadata(fileId: string) {
    return await this.baseRepository.get(fileId)
  }

  async create(file: UploadedFile) {
    const { name: filename } = file
    const ext = getExtensionFromFilename(filename)
    const fileMetadata = await this.baseRepository.create({ filename, ext })
    const newFilename = `${fileMetadata.fileId}.${ext}`
    try {
      const filePath = path.join(appConfig.storagePath, newFilename)
      await file.mv(filePath)
      await this.baseRepository.update(fileMetadata.fileId, {
        status: FileStatus.READY,
        path: filePath,
      })
    } catch ( e ) {
      logger.error(e)
      await this.baseRepository.update(fileMetadata.fileId, {
        status: FileStatus.ERROR
      })
    }
    return await this.getMetadata(fileMetadata.fileId)
  }

  async delete(fileId: string) {
    await this.baseRepository.delete({ fileId })
  }
}

export { FilesRepository }
