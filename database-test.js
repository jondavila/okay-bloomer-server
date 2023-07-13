// get access to environment variables
require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const express = require('express');


// import our models
const plantDetail = require('./models/plantDetail');

console.log('mongo uri =>', process.env.MONGO_URI);
// connect to the database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// create connection object
const db = mongoose.connection;

// once the database opens
db.once('open', () => {
    console.log('Connected to MongoDB Database: Mongoose App at HOST: ', db.host, 'PORT: ', db.port);
});

// if there is a database error
db.on('error', (err) => {
    console.log(`Database error: `, err);
});



// THIS IS HOW WE SEED PLANTLIST

// axios.get('https://perenual.com/api/species-list?page=1&key=sk-UEJC64a9f13f4d3e51505')
//     .then((response) => {
//         // let result = [];
//         // response.data.data.forEach((plant) => {
//         //     let obj = {
//         //         commonName: plant.common_name,
//         //         scientificName: plant.scientific_name[0],
//         //         cycle: plant.cycle,
//         //         watering: plant.watering,
//         //         sunlight: [...plant.sunlight],
//         //         health: 0,
//         //         journalEntries: [],
//         //         image: plant.default_image.regular_url,
//         //         otherNames: [...plant.other_name],
//         //         plantId: plant.id,
//         //     };
//         //     result.push(obj);
//         // });
//         // console.log('ReSuLt', result);
//     })
//     .catch((error) => {
//         console.log('error', error);
//     });

// // THIS IS HOW WE SEED PLANTDETAIL
// axios.get('https://perenual.com/api/species/details/500?key=sk-acxG64a9e7cc984031504')
//     .then((response) => {
//         let plantDetail = {
//             type: response.data.type,
//             propagation: response.data.propagation,
//             flowers: response.data.flowers,
//             floweringSeason: response.data.flowering_season, // can come out as null 
//             soil: response.data.soil,
//             growthRate: response.data.growth_rate,
//             maintenance: response.data.maintenance,
//             poisonousHumans: response.data.poisonous_to_humans,
//             poisonousPets: response.data.poisonous_to_pets,
//             invasive: response.data.invasive,
//             thorny: response.data.thorny,
//             indoor: response.data.indoor,
//             careLevel: response.data.care_level,
//             pruningMonth: response.data.pruning_month,
//             pruningCount: response.data.pruning_count,
//             plantId: response.data.id,
//         };
//         console.log('plantDetail', plantDetail);
//         console.log('response.data', response.data.poisonous_to_humans);
//     });

// THIS IS HOW WE SEED PLANTGUIDE

axios.get('https://perenual.com/api/species-care-guide-list?key=sk-acxG64a9e7cc984031504')
    .then((response) => {
        let result = [];
        response.data.data.forEach((guide) => {
            let obj = {
                wateringDescription: '',
                sunlightDescription: '',
                pruningDescription: '',
                plantId: guide.species_id,
            };
            console.log('guide', guide);
            guide.section.forEach((subguide) => {
                if (subguide.type === 'watering') {
                    obj.wateringDescription = subguide.description;
                }
                if (subguide.type === 'sunlight') {
                    obj.sunlightDescription = subguide.description;
                }
                if (subguide.type === 'pruning') {
                    obj.pruningDescription = subguide.description;
                }
            });
            result.push(obj);
            console.log('result', result);
        });
    });

// for (let i = 1; i <= 5; i++) {
//     plantDetail.findOrCreate(createPlantDetails(i))
//         .then((plant) => {
//             if (plant) {
//                 console.log('found plant', plant);
//             } else {
//                 console.log('created plant', plant);
//             }
//         })
//         .catch(error => {
//             console.log('error', error);
//         });

// }
// for (let i = 1; i <= 2; i++) {
//     plantDetail.findOrCreate(createPlantDetails(i))
//         // axios.get(`https://perenual.com/api/species/details/${i}?key=sk-acxG64a9e7cc984031504`)
//         .then((result) => {
//             console.log('result', result);
//         })
//         .catch(error => {
//             console.log('error', error);
//         });
// }