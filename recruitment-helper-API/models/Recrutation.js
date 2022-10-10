const Sequelize = require('sequelize');
const dbContext = require('../config/db-context');

const Recrutation = dbContext.define('recrutation', {
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
    userExternalId: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    companyName: {
        type: Sequelize.STRING,
        allowNull: false
    },    
    companyDescription: {
        type: Sequelize.STRING,
        allowNull: true
    },
    position: {
        type: Sequelize.STRING,
        allowNull: false
    },
    recruitersName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    websiteUrl: {
        type: Sequelize.STRING,
        allowNull: true
    },
    workType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    workLanguage: {
        type: Sequelize.STRING,
        allowNull: false
    },
    recrutationLanguage: {
        type: Sequelize.STRING,
        allowNull: false
    },
    meetingDateAndHour: {
        type: Sequelize.DATE,
        allowNull: false
    },
    isSalaryRanged: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },    
    salary: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    minSalary: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    maxSalary: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    employmentType: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    comments: {
        type: Sequelize.STRING,
        allowNull: true
    },
})

module.exports = Recrutation;