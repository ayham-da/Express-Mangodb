// Mongodb-Bibliothek importieren
const MongoClient = require('mongodb').MongoClient;

// Async function
(async function(){
    // Mit Datenbank verbinden
    const mongodb = await MongoClient.connect('mongodb://localhost:27017/test')
    // Datenbank auswählen
    const db = mongodb.db('test')
    // Collection mit Validator erstellen
    const sweetsCollection = await db.createCollection('sweets', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: [ "name", "sugarContent" ],
                properties: {
                    name: {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    sugarContent: {
                        bsonType: "int",
                        minimum: 1,
                        description: "must be an integer and is required"
                    }
                }
            }
        }
    })
    // Dacument in Collection hinzufügen
    try {
        await sweetsCollection.insertOne({name: 'Lollypop', sugarContent: 50})
    } catch (error) {
        console.log(error)
    }
    

    // Liste der Ducuments aus DB-Collection holen
    const allSweets = await sweetsCollection.find().toArray()
    allSweets.forEach(sweet => {
        console.log(`${sweet.name} hat ${sweet.sugarContent}g Zucker`)
        
    })
})();