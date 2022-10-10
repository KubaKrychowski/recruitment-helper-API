const dbContext = require("../config/db-context");


const syncDb = async (req, res, next) => {
    try {
        await dbContext.sync({ alter: true });
        return next();
    } catch (err) {
        console.log(err);
    }

};

module.exports = syncDb;