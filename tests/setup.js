const mongoose = require('mongoose')
require('dotenv').config()

afterAll(done => mongoose.connection.dropDatabase(done))