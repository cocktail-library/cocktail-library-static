import { Request } from "express";
import { ApiError } from "./api-error";
import { UploadedFile } from "express-fileupload";

function getFilesFromRequest(req: Request) {
  if (!req.files || Object.keys(req.files).length === 0) {
    throw new ApiError(400, 'No files were uploaded')
  }
  return Object.values(req.files).flat()
}

function getExtensionFromFilename(filename: string) {
  const filenameParts = filename.split('.')
  if (filenameParts.length < 2) {
    throw new ApiError(400, 'File extension not provided')
  }
  return filenameParts[filenameParts.length - 1]
}

export {
  getFilesFromRequest,
  getExtensionFromFilename
}
