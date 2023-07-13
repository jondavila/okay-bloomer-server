const axios = require('axios');
require('dotenv').config();
const PlantDetail = require('./models/plantDetail');
const PlantGuide = require('./models/plantGuide');
const PlantList = require('./models/plantList');


function addPlantList(pageNumber) {
    axios.get(`https://perenual.com/api/species-list?page=${pageNumber}&key=sk-UEJC64a9f13f4d3e51505`)
        .then((response) => {
            let result = [];
            response.data.data.forEach((plant) => {
                let obj = {
                    commonName: plant.common_name,
                    scientificName: plant.scientific_name[0],
                    cycle: plant.cycle,
                    watering: plant.watering,
                    sunlight: [...plant.sunlight],
                    health: 0,
                    journalEntries: [],
                    image: plant.default_image ? plant.default_image.regular_url : null,
                    // image: plant.default_image.regular_url,
                    otherNames: [...plant.other_name],
                    plantId: plant.id,
                };
                result.push(obj);
            });
            return result;
            // console.log('ReSuLt', result);
        })
        .catch((error) => {
            console.log('error', error);
        });
}


// function addPlantDetails(plantNum) {
//     let newPlantDetail = {};
//     axios.get(`https://perenual.com/api/species/details/${plantNum}?key=sk-acxG64a9e7cc984031504`)
//         .then((response) => {
//             newPlantDetail = {
//                 type: response.data.type,
//                 propagation: response.data.propagation,
//                 flowers: response.data.flowers,
//                 floweringSeason: response.data.flowering_season, // can come out as null 
//                 soil: response.data.soil,
//                 growthRate: response.data.growth_rate,
//                 maintenance: response.data.maintenance,
//                 poisonousHumans: response.data.poisonous_to_humans,
//                 poisonousPets: response.data.poisonous_to_pets,
//                 invasive: response.data.invasive,
//                 thorny: response.data.thorny,
//                 indoor: response.data.indoor,
//                 careLevel: response.data.care_level,
//                 pruningMonth: response.data.pruning_month,
//                 pruningCount: {
//                     amount: response.data.pruning_count.amount, // can come out as undefined
//                     interval: response.data.pruning_count.interval // can come out as undefined
//                 },
//                 plantId: response.data.id,
//             };
//             createPlantDetail(newPlantDetail);
//         })
//         .catch((error) => {
//             console.log('error', error);
//         });
// }

// function createPlantDetail(plantObj) {
//     PlantDetail.create(plantObj)
//         .then((plant) => {
//             console.log('new plant added', plant);
//         })
//         .catch(err => console.log('error', err));
// }

function addPlantGuides(pageNum) {
    axios.get(`https://perenual.com/api/species-care-guide-list?key=sk-acxG64a9e7cc984031504&page=${pageNum}}`)
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
            });
            createPlantGuide(result);
        });
}

function createPlantGuide(plantObj) {
    PlantGuide.create(plantObj)
        .then((plant) => {
            console.log('new GUIDE added', plant);
        })
        .catch(err => console.log('error', err));
}

// function createPlantGuide(pageNumber) {
//     axios.get(`https://perenual.com/api/species-care-guide-list?key=sk-acxG64a9e7cc984031504&page=${pageNumber}`)
//         .then((response) => {
//             let result = [];
//             response.data.data.forEach((guide) => {
//                 let obj = {
//                     wateringDescription: '',
//                     sunlightDescription: '',
//                     pruningDescription: '',
//                     plantId: guide.species_id,
//                 };
//                 console.log('guide', guide);
//                 guide.section.forEach((subguide) => {
//                     if (subguide.type === 'watering') {
//                         obj.wateringDescription = subguide.description;
//                     }
//                     if (subguide.type === 'sunlight') {
//                         obj.sunlightDescription = subguide.description;
//                     }
//                     if (subguide.type === 'pruning') {
//                         obj.pruningDescription = subguide.description;
//                     }
//                 });
//                 result.push(obj);
//             });
//         });
//}

module.exports = {
    // addPlantDetails,
    addPlantList,
    // addPlantGuides,

};