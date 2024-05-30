const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;


        // Middleware
        this.middlewares();

        // Routes
        this.routes();
    }

    middlewares() {
        this.app.use(bodyParser.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors({
            origin: 'http://localhost:3000',
            credentials: true
        }))
    }

    routes() {
        const routes = require('../routes');
        this.app.use('/api', routes);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

module.exports = Server;