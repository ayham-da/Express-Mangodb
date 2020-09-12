// mongoose-Bibliothek importieren
const mongoose = require('mongoose');

//const SweetsModel = require('./models/sweets')


// Async function
(async function(){
    // Mit Datenbank verbinden
    await mongoose.connect('mongodb://localhost:27017/test', {
        useNewUrlparser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    // Datenstruktur für Süßigkeiten definieren
const sweetsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sugarContent: {
        type: Number,
        required: true
    }
})

// Vorlage für Collection-Daten
const SweetsModel = mongoose.model('Sweet', sweetsSchema)

    

    

    // Document in DB-Collection hinzufügen
    const chocolateBar = new SweetsModel({name: 'Chocolate bar', sugarContent: 60})
    await chocolateBar.save()

    // Documents aus collection holen
    const allSweets = await SweetsModel.find()
    allSweets.forEach(sweet => {
        console.log(`${sweet.name} hat ${sweet.sugarContent}g Zucker`)
    })
})()