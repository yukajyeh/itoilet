const mongoose = require('mongoose');
const Toilet = require('../models/toilet-info');

const toilets = [
    {
        location_name: 'Beursplein Fietsenstalling',
        price_per_use:'0.50€',
        child_friendly:false,
        location:{
            type: 'Point', 
            coordinates: [4.894938, 52.374265]
        },
        openings_time:'24 hours'
    },
    {
        location_name: 'Koningsplein',
        price_per_use:'0.50€',
        child_friendly:false,
        location:{
           type:'Point',
           coordinates:[4.8891493, 52.3674761]
       },
        openings_time:'24 hours'
    },
    {
        location_name: 'Bicycle Parking Paradiso',
        price_per_use:'0.50€',
        child_friendly:false,
        location:{
            type:'Point',
            coordinates:[4.883081, 52.363778]
        },
        openings_time:'24 hours'
    },
    {
        location_name: 'Vondelpark Public Toilet',
        price_per_use:'0€',
        child_friendly:false,
        location:{
            type:'Point',
            coordinates:[4.871441, 52.358568]
        },
        note:'Only Available in Spring and Summer'
    },
    {
        location_name: 'Park Kiosk',
        price_per_use:'0€',
        child_friendly:false,
        coordinates:{lat:52.343586,lng:4.88422},
    },
    {
        location_name: 'Westerpark Public Toilet',
        price_per_use:'0€',
        child_friendly:false,
        location:{
            type:'Point',
            coordinates:[4.8752199, 52.3872886]
        }
    }, 
    {
        location_name: 'Amsterdam Bostheater',
        price_per_use:'0€',
        child_friendly:false,
        location:{
            type:'Point',
            coordinates:[4.8262539, 52.3213268]
        }
    }, 

    {
        location_name: 'Amstel Park Public Toilet',
        price_per_use:'0€',
        child_friendly:false,
        location:{
            type:'Point',
            coordinates:[4.8920762, 52.3324316]
        },
        openings_time: '8am to half an hour before sunset'
    }, 
    {
        location_name: 'Sarphatipark',
        price_per_use:'0,50€',
        child_friendly:false,
        location:{
            type:'Point',
            coordinates:[4.896122, 52.354509]
        },
        openings_time: '24 hours'
    }
]


mongoose
  .connect('mongodb://localhost/itoilet', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    return Toilet.insertMany(toilets)
  })
  .then(toilets => {
    mongoose.disconnect()
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });