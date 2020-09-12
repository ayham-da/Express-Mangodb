// Mongoose importieren
const mongoose = require('mongoose')
// Faker importieren
const faker = require('faker')
// Model für Süßigkeiten importieren
const SweetsModel = require('../models/sweets');

// Async function
(async function(){
    await mongoose.connect('mongodb://localhost:27017/test', {
        useNewUrlparser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })

    try {
        await SweetsModel.deleteMany({})
        console.log('Collection geleert')
    } catch (error) {
        console.log(error)
    }

    const dataPromises = Array(10)
        .fill(null)
        .map(() => {
            const sweet = new SweetsModel({
                name: faker.commerce.product(),
                sugarContent: faker.random.number()
            })
            return sweet.save()
        })

    try {
        await Promise.all(dataPromises)
        console.log('fake data in DB created')
    } catch (error) {
        console.log(error)
    }
    mongoose.connection.close()
})()
