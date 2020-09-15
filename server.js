const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let restaurants = [];

app.use(bodyParser.json());
  
app.get('/', function(req, res) { 
  res.json(restaurants);
});

app.get('/:type', function(req, res) { 
    const filterRestaurants = restaurants.filter( resto => { return resto.kindOfRestaurant.indexOf(req.params.type)>=0 });
    res.json(filterRestaurants);
});
  
app.post('/', validateByName, function(req, res) {
    restaurants.push(req.body);  
    res.sendStatus(201);
});

app.listen(3000);
console.log('Listening on http://localhost:3000');


function validateByName (req, res, next) {
    if (restaurants.filter( resto => { return resto.name === req.body.name }).length > 0) {
        res.sendStatus(400);
    } else {
        next();
    }
}