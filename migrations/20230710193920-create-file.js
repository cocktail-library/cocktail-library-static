/* eslint-disable no-undef, @typescript-eslint/no-var-requires */
'use strict'

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up ({ context }) {
    const { queryInterface } = context.sequelize
    await queryInterface.createTable('Files', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fileId: {
        type: DataTypes.STRING,
        allowNull: false,
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
      }
    })
},

  async down (queryInterface) {
    await queryInterface.dropTable('Files')
  }
}
