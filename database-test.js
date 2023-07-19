// get access to environment variables
require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const express = require('express');


// import our models
const PlantDetail = require('./models/plantDetail');

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

function addPlantDetails(plantNum) {
    let newPlantDetail = {};
    axios.get(`https://perenual.com/api/species/details/${plantNum}?key=sk-acxG64a9e7cc984031504`)
        .then((response) => {
            console.log('response', response);
            newPlantDetail = {
                commonName: response.data.common_name,
                scientificName: response.data.scientific_name,
                cycle: response.data.cycle,
                watering: response.data.watering,
                sunlight: [...response.data.sunlight],
                health: 100,
                image: response.default_image ? response.default_image.regular_url : null,
                type: response.data.type,
                propagation: response.data.propagation,
                flowers: response.data.flowers,
                floweringSeason: response.data.flowering_season, // can come out as null 
                soil: response.data.soil,
                growthRate: response.data.growth_rate,
                maintenance: response.data.maintenance,
                poisonousHumans: response.data.poisonous_to_humans,
                poisonousPets: response.data.poisonous_to_pets,
                invasive: response.data.invasive,
                thorny: response.data.thorny,
                indoor: response.data.indoor,
                careLevel: response.data.care_level,
                pruningMonth: response.data.pruning_month,
                pruningCount: {
                    amount: response.data.pruning_count.amount, // can come out as undefined
                    interval: response.data.pruning_count.interval // can come out as undefined
                },
                description: response.data.description,
                plantId: response.data.id,
            };
            createPlantDetail(newPlantDetail);
        })
        .catch((error) => {
            console.log('error', error);
        });
}

function createPlantDetail(plantObj) {
    PlantDetail.create(plantObj)
        .then((plant) => {
            console.log('new plant added', plant);
        })
        .catch(err => console.log('error', err));
}

addPlantDetails(1);