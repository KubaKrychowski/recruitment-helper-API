const express = require('express');
const bodyParser = require('body-parser');
const dbContext = require('./config/db-context');
const router = express.Router();
const jsonParser = bodyParser.json()
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const auth = require("./middleware/auth");

require("dotenv").config();

dbContext.authenticate()
  .then(() => {
    console.log(`db connected`)
  })
  .catch(err => {
    console.error(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(jsonParser);
app.options('*', cors())
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server started on localhost:${PORT}`)
});

//* routes
app.use('/recrutations', require('./routes/recrutations'));
app.use('/idp', require('./routes/auth'))