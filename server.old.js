const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./Utils/routes')
const cors = require('cors')

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
// An api endpoint that returns a short list of items
// app.get('/api/agm/getturnos', (req,res) => {

// });
new routes(app).appRoutes();

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);