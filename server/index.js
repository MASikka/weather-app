const express = require("express");
const path = require('path');
var cors = require('cors');
require('./models/db');

const PORT = process.env.PORT || 3001;
const mainRoute = require('./routes/main');
const errorRoute = require('./routes/error');

const app = express();
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());

app.use(mainRoute);
app.use(errorRoute);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});