const express = require('express');
const bodyParser = require('body-parser');
const dbContext = require('./config/db-context');
const router = express.Router();
const jsonParser = bodyParser.json()
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
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


//* middleware
app.use((req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
})
//* routes
app.use('/recrutations', require('./routes/recrutations'));
app.use('/idp', require('./routes/auth'))