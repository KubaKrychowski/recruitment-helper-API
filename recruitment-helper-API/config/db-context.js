const Sequelize = require('sequelize');

module.exports = dbContext = new Sequelize('Recrutations', 'postgres', 'Admin1234', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})