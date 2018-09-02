const telegraf = require('telegraf')
const mongo = require('mongodb').MongoClient
const data = require('./data.js')
const dbUrl = 'mongodb://localhost:27017/'
const bot = new telegraf('619360663:AAFBE_x2dPzx8dxqvo7EL_oMseXre2OIS4s')

//var clientID, chbr, chcat, chmod, rcvdUserData;
var clientID, action, rcvdUserData;
var rcvdDB = {}

var approp = (cid, act/*cbr, ccat, cmod*/) => {
	clientID = cid
	action = act
	/*chbr = cbr
	chcat = ccat
	chmod = cmod*/
	dbAdd()
}


//ОШИБКА ВОТ ТУТ(текст консоли в самом низу):
var dbAdd = () => {
mongo.connect(dbUrl, {useNewUrlParser: true}, function(err, client){
	const db = client.db('navi')
	const collection = db.collection('lastAction')
	//var user = {id: clientID, brand: chbr, cat: chcat, model: chmod}
	//var lastAction = {id: clientID, lAct: action}
	db.collection.update({id: clientID}, {lAct: action}, {upsert: true})
	//collection.insertOne(lastAction, function(err, result){
		if(err){
			console.log('Ошибка добавления данных в коллекцию: [' + err + ']')
		}
		console.log(result.ops)
		dbAsk()
		client.close
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
		console.log(rcvdDB)
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


// bot.on('text', (ctx) => {
// 	switch(ctx.message.text) {
// 		case 'Кондиционеры': ctx.reply('Выберите модель кондиционера:', {reply_markup: {keyboard: data.models.Artel.Кондиционеры, resize_keyboard: true}})
// 		break
// 		case 'Пылесоы': ctx.reply('Выберите модель пылесоса:', {reply_markup: {keyboard: data.models.Artel.Пылесоы, resize_keyboard: true}})
// 		break
// 		case 'Холодильники': ctx.reply('Выберите модель холодильника:', {reply_markup: {keyboard: data.models.Artel.Холодильники, resize_keyboard: true}})
// 		break
// 		case 'Микроволновки': ctx.reply('Выберите модель микроволновки:', {reply_markup: {keyboard: data.models.Artel.Микроволновки, resize_keyboard: true}})
// 		break
// 	}


bot.startPolling()



/* Сама ошибка:

/home/oneuser/MyProjects/bots/artelbot/node_modules/mongodb/lib/operations/mongo_client_ops.js:466
      throw err;
      ^

TypeError: Cannot read property 'update' of undefined
    at /home/oneuser/MyProjects/bots/artelbot/index.js:26:16
    at result (/home/oneuser/MyProjects/bots/artelbot/node_modules/mongodb/lib/utils.js:414:17)
    at executeCallback (/home/oneuser/MyProjects/bots/artelbot/node_modules/mongodb/lib/utils.js:406:9)
    at err (/home/oneuser/MyProjects/bots/artelbot/node_modules/mongodb/lib/operations/mongo_client_ops.js:286:5)
    at connectCallback (/home/oneuser/MyProjects/bots/artelbot/node_modules/mongodb/lib/operations/mongo_client_ops.js:241:5)
    at process.nextTick (/home/oneuser/MyProjects/bots/artelbot/node_modules/mongodb/lib/operations/mongo_client_ops.js:463:7)
    at _combinedTickCallback (internal/process/next_tick.js:131:7)
    at process._tickCallback (internal/process/next_tick.js:180:9)
*/
