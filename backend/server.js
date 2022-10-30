const axios = require('axios');
const apiKey = 'MHEQvk4S6lhCtj3jff-3adZWOWhEelClK3b4aQrzTJRjAy4VgtVka7DRxf-Qa_Fl5VEkMesbD5G6T89cfBHWuuYRFnAxrCRovbiaDr-Vc13ya6XqwF9-O6CMigpSY3Yx'


// call biz search
axios({
    method: 'get',
    url: 'https://api.yelp.com/v3/businesses/search',
    headers: { 'Authorization': `Bearer ${apiKey}` },
    params: { 'term': 'delis', 'latitude': 37.786882, 'longitude': -122.399972 }
}).then(function (response) {
    console.log(response.data);
});


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

