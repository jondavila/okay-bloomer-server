const axios = require('axios');
require('dotenv').config();
const PlantDetail = require('./models/plantDetail');
const PlantGuide = require('./models/plantGuide');
const PlantList = require('./models/plantList');
const PlantFaq = require('./models/plantFaq');
const { faker } = require('@faker-js/faker');
const User = require('./models/user');


function addPlantList(pageNumber) {
    axios.get(`https://perenual.com/api/species-list?page=${pageNumber}&key=${process.env.PERENUAL_API_KEY}}`)
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
                    journalEntries: [''],
                    image: plant.default_image ? plant.default_image.regular_url : null,
                    otherNames: [...plant.other_name],
                    plantId: plant.id,
                };
                result.push(obj);
            });
            createPlantList(result);
        })
        .catch((error) => {
            console.log('error', error);
        });
}

function createPlantList(plantList) {
    PlantList.create(plantList)
        .then((plant) => {
            console.log('new PLANT LIST added', plant);
        })
        .catch(err => console.log('error', err));
}


function addPlantDetails(plantNum) {
    let newPlantDetail = {};
    axios.get(`https://perenual.com/api/species/details/${plantNum}?key=sk-acxG64a9e7cc984031504`)
        .then((response) => {
            newPlantDetail = {
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


function addPlantFaq(pageNum) {
    axios.get(`https://perenual.com/api/article-faq-list?key=sk-acxG64a9e7cc984031504&page=${pageNum}}`)
        .then((response) => {
            let result = [];
            response.data.data.forEach((plantFaq) => {
                let obj = {
                    question: plantFaq.question,
                    answer: plantFaq.answer,
                    faqId: plantFaq.id
                };
                console.log('obj', obj);
                result.push(obj);
            });
            createPlantFaq(result);
        });
}

function createPlantFaq(plantFaqObj) {
    PlantFaq.create(plantFaqObj)
        .then((plant) => {
            console.log('plant FAQ added', plant);
        })
        .catch(err => console.log('error', err));
}

function addRandomUser() {

    let firstName = faker.person.firstName();
    let lastName = faker.person.lastName();
    let email = firstName + lastName + '@' + faker.internet.email().split('@')[1];
    // let email = `${firstName}.${lastName}@${faker.internet.email().split('@')[1]}`;
    console.log('email', email);

    // split the faker email

    let newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        jobTitle: faker.person.jobTitle(),
        birthdate: faker.date.birthdate(),
        password: 'password',
        address: {
            streetAddress: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode('#####'),
        },
        number: faker.phone.number(),
        plants: [{
            userPlants: [{
                plantNickname: faker.person.firstName(),
                plantOfficialName: 'European Silver Fir',
                plantImage: faker.image.url(),
                plantId: 1,
                plantTasks: [{
                    taskName: 'Fertilize',
                    status: 'incomplete',
                    plantId: 1,
                    date: faker.date.future(),
                },
                {
                    taskName: 'Water',
                    status: 'incomplete',
                    plantId: 1,
                    date: faker.date.future(),
                }],
            }, { // these brackets close/open a new plant object inside the plant sanctuary schema
                plantNickname: faker.person.firstName(),
                plantOfficialName: 'Australian Golden Fir',
                plantImage: faker.image.url(),
                plantId: 2,
                plantTasks: [{
                    taskName: 'Fertilize',
                    status: 'incomplete',
                    plantId: 2,
                    date: faker.date.future(),
                }, { // these brackets close/open a new plant task object inside the plant sanctuary schema
                    taskName: 'Water',
                    status: 'incomplete',
                    plantId: 2,
                    date: faker.date.future(),
                }],
            }], // these brackets close/open the userPlants array
            journalEntries: [{
                title: 'My first journal entry',
                content: 'I am so excited to START my plant journal!',
                plantId: 1,
            }, { // these brackets close/open a new journal entry object inside the journal entries array
                title: 'My second journal entry',
                content: 'I am so excited to END my plant journal!',
                plantId: 1,
            }], // these brackets close the journal entries array
        }], // these brackets close/open the plants array

    }; // these brackets close/open the return object
    createRandomUser(newUser);
} // this bracket closes the function

function createRandomUser(newUserObj) {
    User.create(newUserObj)
        .then((user) => {
            console.log('new user added', user);
        })
        .catch(err => console.log('error', err));
}

module.exports = {
    addPlantDetails,
    addPlantList,
    addPlantGuides,
    addPlantFaq,
    createRandomUser,
    addRandomUser,
};