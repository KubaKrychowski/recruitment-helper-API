const Sequelize = require('sequelize');
const dbContext = require('../config/db-context');

const User = dbContext.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
         autoIncrement: true,
         primaryKey: true
    },
    externalId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true
    },
})

module.exports = User;