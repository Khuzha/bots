const mongo = require('mongodb').MongoClient
const dbUrl = 'mongodb://localhost:27017/'
var clientID, chbr, chcat, chmod;

mongo.connect(dbUrl, function(err, client){
	const db = client.db('navi')
	const collection = db.collection('lastAction')

	if(err) {
		return console.log('Ошибка в функции dbrec:' + err)
	}

	collection.fing().toArray(function(err, results){
		console.log(results)
		client.close
	})
})
