import { FilesService } from './files.service'
import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import 'reflect-metadata'
import { TYPES } from '../ioc-types'
import { getFilesFromRequest } from "../utils/upload";

@injectable()
class FilesController {
  // eslint-disable-next-line no-unused-vars
  constructor(@inject(TYPES.FilesService) private filesService: FilesService) {
    this.listAll = this.listAll.bind(this)
    this.getFile = this.getFile.bind(this)
    this.getMetadata = this.getMetadata.bind(this)
    this.create = this.create.bind(this)
    this.delete = this.delete.bind(this)
  }

  async listAll(req: Request) {
    const offset = Number(req.query.offset) || 0
    const limit = Number(req.query.limit) || 100

    return await this.filesService.listFiles(offset, limit)
  }

  async getFile(req: Request, res: Response) {
    const { fileId } = req.params
    const metadata = await this.filesService.getFileMetadata(fileId)
    res.download(metadata.path, metadata.filename)
  }

  async getMetadata(req: Request) {
    const { fileId } = req.params
    return await this.filesService.getFileMetadata(fileId)
  }

  async create(req: Request) {
    const files = getFilesFromRequest(req)
    return await Promise.allSettled(files.map((file) => {
      this.filesService.createFile(file)
    }))
  }

  async delete(req: Request) {
    const { fileId } = req.params
    await this.filesService.deleteFile(fileId)
  }
}

export { FilesController }
