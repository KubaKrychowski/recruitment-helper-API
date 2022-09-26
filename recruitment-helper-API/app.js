const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

//*Database
const dbContext = require('./config/db-context');

//* Test database connection
dbContext.authenticate()
  .then(() => {
    console.log(`db connected`)
  })
  .catch(err => {
    console.error(err);
  })

const app = express();

app.get('/', (req, res) => {
  res.send('INDEX');
})

app.use('/recrutations', require('./routes/recrutations'));


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on localhost:${PORT}`));