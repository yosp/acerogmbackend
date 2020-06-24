const express = require('express')
const path = require('path')

class Config {
    constructor(app) {
        app.use(express.static(path.join(__dirname, '/ClientApp/build')))
    }
}

module.exports = Config