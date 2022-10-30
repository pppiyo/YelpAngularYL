MILES_TO_METERS = 1609.344;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;

const app = express();

const axios = require('axios');

const querystring = require('querystring');


const apiKey = 'MHEQvk4S6lhCtj3jff-3adZWOWhEelClK3b4aQrzTJRjAy4VgtVka7DRxf-Qa_Fl5VEkMesbD5G6T89cfBHWuuYRFnAxrCRovbiaDr-Vc13ya6XqwF9-O6CMigpSY3Yx'

app.use(bodyParser.json());

app.use(cors());

app.get('/cook', function(req, res) {
    // console.log(req.query); // DEBUG
    let query = req.query;

    // radius
    const strDistance = query['distance']
    const radius = Math.round(parseInt(strDistance) * MILES_TO_METERS);
    query['radius'] = radius;
    delete query['distance'];
    
    // lat, lng
    location = query['location'];
    delete query['location'];
    // call Google Maps Geocoding API 
    axios({
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=AIzaSyBXU0jzc6Rbzd5yAPd5mXWOymaZUMnqKEQ',
    }).then(function (response) {
        lat = response.data["results"]["0"]["geometry"]["location"]["lat"];
        lng = response.data["results"]["0"]["geometry"]["location"]["lng"];
        query['latitude'] = lat;
        query['longitude'] = lng;

        let queryString = querystring.stringify(query);
        console.log(queryString); // DEBUG
    });


    res.status(200).send({"message": "data received"});
})

app.listen(PORT, function() {
    console.log("server running on localhost: " + PORT)
})


/*
// call biz search
axios({
    method: 'get',
    url: 'https://api.yelp.com/v3/businesses/search',
    headers: { 'Authorization': `Bearer ${apiKey}` },
    params: { 'term': 'delis', 'latitude': 37.786882, 'longitude': -122.399972 }
}).then(function (response) {
    // console.log(response.data);
});
*/

/*
// call biz details
axios({
    method: 'get',
    url: 'https://api.yelp.com/v3/businesses/FmGF1B-Rpsjq1f5b56qMwg',
    headers: { 'Authorization': `Bearer ${apiKey}` },
}).then(function (response) {
    console.log(response.data);
    });


// call autocomplete
axios({
    method: 'get',
    url: 'https://api.yelp.com/v3/autocomplete',
    headers: { 'Authorization': `Bearer ${apiKey}` },
    params: {'text': 'Ramen'}
}).then(function (response) {
    console.log(response.data);
    });
    

// call review
axios({
    method: 'get',
    url: 'https://api.yelp.com/v3/businesses/FmGF1B-Rpsjq1f5b56qMwg/reviews',
    headers: { 'Authorization': `Bearer ${apiKey}` },
    params: { 'text': 'Ramen' }
}).then(function (response) {
    console.log(response.data);
});
*/
