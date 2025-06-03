const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routeLoggerMiddleware = require('./middleware')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes/index');

app.use(bodyParser.json());
app.use(cors());
app.use(routeLoggerMiddleware);
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
