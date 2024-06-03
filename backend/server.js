const Server = require('./src/config/server');
const Database = require('./src/config/database');
require('dotenv').config();

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/Crawler";

const db = new Database(mongoUri);
const server = new Server();

server.start(port);