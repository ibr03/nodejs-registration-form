const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/connect');
const bodyParser = require('body-parser');
const indexRoute = require('./routes/index');

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8080;
// mongoDB connection
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// routes
app.use('/', indexRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
