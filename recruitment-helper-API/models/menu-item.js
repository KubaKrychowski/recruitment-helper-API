const Sequelize = require('sequelize');
const dbContext = require('../config/db-context');

const MenuItem = dbContext.define('menu-item', {
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
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

module.exports = MenuItem;