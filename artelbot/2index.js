const telegraf = require('telegraf')
const mongo = require('mongodb').MongoClient
const data = require('./data.js')
const dbUrl = 'mongodb://localhost:27017/'
const bot = new telegraf('619360663:AAG77yeLT3RMRp5B8ra9TR41dh7Lp-Cb_zs')

var clientID, action, rcvdUserData;
var rcvdDB = {}

var approp = (cid, act) => {
	clientID = cid
	action = act
	console.log('CID:' + clientID + ' Action:' + action)
	if(JSON.stringify(clientID).length > 0 && clientID != undefined && JSON.stringify(act).length >0 && act != undefined)
		dbAdd()
}


var dbAdd = () => {
mongo.connect(dbUrl, {useNewUrlParser: true}, function(err, client){
	const db = client.db('navi')
	const collection = db.collection('lastAction')
	var lastAction = {id: clientID, lAct: action}
	collection.updateOne({id: clientID}, {lAct: action}, {upsert: true}, function(err, result){
		if(err){
			console.log('Ошибка добавления данных в коллекцию: [' + err + ']')
		}
		//ОШИБКА ТУТ (описана внизу):
		console.log(result.ops)
		dbAsk()
		client.close
	})
})
}

var dbAsk = () => {
mongo.connect(dbUrl, {useNewUrlParser: true}, function(err, client){
	const db = client.db('navi')
	const collection = db.collection('lastAction')

	if(err) {
		return console.log('Ошибка в функции dbAsk():' + err)
	}
	rcvdUserData = collection.find().toArray()
	collection.find().toArray(function(err, results){
		//console.log(results)
		rcvdDB = results
		//console.log(rcvdDB)
		client.close
	})
})
}

dbAsk()

bot.start((ctx) => {
	(ctx.reply('Начали! Выберите бренд:', {reply_markup: {keyboard: data.brands, resize_keyboard: true}}))
})


bot.on('text', (ctx) => {
	console.log(JSON.stringify(ctx.message) + '\n______________________________________________________________________')

	//if(typeof(ctx.message.text) === 'string' && (ctx.message.text) !== '⬅️ Назад' && (ctx.message.text) !== 'Artel' && (ctx.message.text) !== 'Royal' && (ctx.message.text) !== 'Shivaki' && (ctx.message.text) !== 'Samsung')
		//ctx.reply('Вы не выбрали бренд. Пожалуйста, нажмите одну из кнопок ниже:', {reply_markup: {keyboard: data.brands, resize_keyboard: true}})
	switch (ctx.message.text) {
		case 'Artel': case 'artel': ctx.reply('Выберите категорию устройства Artel:', {reply_markup: {keyboard: data.categories.Artel, resize_keyboard: true}})
		approp(ctx.message.from.id, 'Artel')
		break
		case 'Royal': case 'royal': ctx.reply('Выберите категорию устройства Royal:', {reply_markup: {keyboard: data.categories.Royal, resize_keyboard: true}})
		approp(ctx.message.from.id, 'Royal')
		break
		case 'Samsung': case 'samsung': ctx.reply('Выберите категорию устройства Samsung:', {reply_markup: {keyboard: data.categories.Samsung, resize_keyboard: true}})
		approp(ctx.message.from.id, 'Samsung', 'Холодильники', 'kek')
		break
		case 'Shivaki': case 'shivaki': ctx.reply('Выберите категорию устройства Shivaki:', {reply_markup: {keyboard: data.categories.Shivaki, resize_keyboard: true}})
		approp(ctx.message.from.id, 'Shivaki')
		break
		case '⬅️ Назад': ctx.reply('Вернулись назад. Выберите бренд:', {reply_markup: {keyboard: data.brands, resize_keyboard: true}})
		break
	}
})

bot.startPolling()



/* Сама ошибка:

/home/oneuser/MyProjects/bots/artelbot/node_modules/mongodb/lib/operations/mongo_client_ops.js:466
      throw err;
      ^

TypeError: Cannot read property 'ops' of undefined
    at /home/oneuser/MyProjects/bots/artelbot/index.js:29:22
    at Collection.updateOne (/home/oneuser/MyProjects/bots/artelbot/node_modules/mongodb/lib/collection.js:721:48)
    at /home/oneuser/MyProjects/bots/artelbot/index.js:25:13
    at result (/home/oneuser/MyProjects/bots/artelbot/node_modules/mongodb/lib/utils.js:414:17)
    at executeCallback (/home/oneuser/MyProjects/bots/artelbot/node_modules/mongodb/lib/utils.js:406:9)
    at err (/home/oneuser/MyProjects/bots/artelbot/node_modules/mongodb/lib/operations/mongo_client_ops.js:286:5)
    at connectCallback (/home/oneuser/MyProjects/bots/artelbot/node_modules/mongodb/lib/operations/mongo_client_ops.js:241:5)
    at process.nextTick (/home/oneuser/MyProjects/bots/artelbot/node_modules/mongodb/lib/operations/mongo_client_ops.js:463:7)
    at _combinedTickCallback (internal/process/next_tick.js:131:7)
    at process._tickCallback (internal/process/next_tick.js:180:9)


*/
