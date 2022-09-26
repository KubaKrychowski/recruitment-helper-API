const Sequelize = require('sequelize');
const dbContext = require('../config/db-context');

const Recrutation = dbContext.define('recrutation', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
         autoIncrement: true,
    },
    externalId: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Recrutation;