# Okay Bloomer Backend API

This is the backend half our Okay Bloomer website/app.

## Description

This is the data for our front end website that contains data such as:

- Details for each individual plant like frequency for watering, pruning, and the amount of sunlight.
- FAQs for general gardening advice.
- Guides, which are more detailed descriptions on when and how to water your plant, when and how you should prune your plant, and how much sunlight your plant needs.

## Wireframe

Pictured below are the collections and schemas that were used to store our data.

![alt text](/wireframe-images/userCollection.png)
This is the users collection that would store these 4 important data key:values.
The most important thing to look at is the userPlants as it contains multiple embedded models/schemas.

![alt text](/wireframe-images/userPlantCollection.png)
This is the user's plants collection that contains these data key:values.
The 2 most important things to look at here are the plantTasks and journalEntries
as these are schemas/models that are embedded into the user's plants collection.

![alt text](/wireframe-images/taskCollection.png)
This is the tasks collection that would be embedded inside the user's plants collection. Each task is associated with each plant since there can be multiple plants with multiple tasks.

![alt text](/wireframe-images/journalCollection.png)
This is the journal entries collection that is embedded into the user's collection. The journal entries can only be associated with one user but the journal entries contain a plantId and therefore can be associated with only one plant. We made it possible on the frontend to show all journal

![alt text](/wireframe-images/plantTypeCollection.png)
This collection contains necessary info that we needed to make connections with the individual plant and the plant guides. However, these data key:values were later seeded from the single individual plant details schema (no image provided).

## Code

![alt text](/wireframe-images/code1.png)
![alt text](/wireframe-images/code2.png)
This entire length of code shows the entirety what is included inside a SINGLE user's entry.

## Blockers

- Creating the user model.
- Creating all the routes that needed the correct and EXACT information needed to be manipulated on the front end
- Creating the functions in order to properly seed the data that we needed which required multiple tests

## Video Presentation

[Link to Presentation](https://youtu.be/C0xuBK3qbZI)

# Developed By:

Jonathan Davila: Full-Stack Development

Jessica Lee: Front-End Development

Caleb-Joshua Monzon: Back-End Development

Sydney Pogue: Full-Stack Development
