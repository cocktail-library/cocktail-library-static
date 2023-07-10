import { DataTypes, Sequelize } from 'sequelize'
import { nanoid } from 'nanoid'

enum FileStatus {
  PENDING = 'pending',
  READY = 'ready',
  ERROR = 'error',
}

interface IFile {
  id: number;
  fileId: string;
  filename: string;
  ext: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
  status: FileStatus;
}

const FileEntity = (sequelize: Sequelize) => sequelize.define('File', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fileId: {
    type: DataTypes.STRING,
    defaultValue: () => nanoid()
  },
  filename: {
    type: DataTypes.STRING,
  },
  ext: {
    type: DataTypes.STRING,
  },
  path: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: FileStatus.PENDING,
  }
})

export {
  FileStatus,
  FileEntity as File,
  IFile
}
