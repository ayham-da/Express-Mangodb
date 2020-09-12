const mongoose = require('mongoose')

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

module.exports = SweetsModel