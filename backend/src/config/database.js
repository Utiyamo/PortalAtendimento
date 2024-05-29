const mongoose = require('mongoose');

class Database{
    constructor(uri){
        this.uri = uri;
        this.connect();
    }

    connect(){
        mongoose.connect(this.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('Connected to MongoDB');
        }).catch(err => {
            console.error('Error connecting to MongoDB', err);
        });
    }
}

module.exports = Database;