const app = {
  name: 'cocktail-library-static',
  port: process.env.APP__PORT || 4030,
  storagePath: process.env.COCKTAILS_STATIC__STORAGE_PATH || '../cocktail-library-static-storage'
}

const fileStorage = {
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  // useTempFiles: true,
  // tempFileDir: '/tmp/'
}

export interface DbConfig {
  dialect: string;
  storage: string;
}

const db: DbConfig = {
  dialect: 'sqlite',
  storage: process.env.COCKTAILS_STATIC__SQLITE_PATH || '../cocktail-static-db.sqlite'
}

export {
  app,
  fileStorage,
  db
}
