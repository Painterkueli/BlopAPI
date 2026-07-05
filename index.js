const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const requestlogger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorhandler');
const articleRoute = require('./routes/article.route');

const connectdb = require('./database/Connectdb');

const PORT = process.env.PORT;

connectdb();

app.use(express.json());
app.use(cors('*'));
app.use(requestlogger)

app.use(articleRoute);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
}) 