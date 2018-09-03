const telegraf = require('telegraf')
const mongo = require('mongodb').MongoClient
const data = require('./data.js')
const dbUrl = 'mongodb://localhost:27017/'
const bot = new telegraf('619360663:AAExUoNV_1XuffVf7SWVS_0GkxSnXrFeRK0')

var rcvdUserData, rcvdDB


mongo.connect(dbUrl, {useNewUrlParser: true}, function(err, client){
	if(err) return console.log('Ошибка подключения к ДБ на строке: ' + err)
  db = client.db('navi')
	const collection = db.collection('lastAction')
	var dbAdd = (clientID, action) => {
		db.lastAction.updateOne({id: ClientID}, {$set: {lastAction: action}})
	}
	var dbAsk = (clientID) => {
		rcvdDB = collection.find().toArray(function(err, results){
			return results
			client.close
		})
		rcvdUserData = collection.find({id: clientID}).toArray(function(err, results){
			return results
			client.close
		})
	}
})

console.log('DB: \n' + rcvdDB + '\n\n__________________________________________________ \n User: \n' +rcvdUserData)

bot.start((ctx) => {
	(ctx.reply('Начали! Выберите бренд:', {reply_markup: {keyboard: data.brands, resize_keyboard: true}}))
	db.collection.list.find().toArray()
})


bot.on('text', (ctx) => {
	console.log(JSON.stringify(ctx.message) + '\n______________________________________________________________________')

	//if(typeof(ctx.message.text) === 'string' && (ctx.message.text) !== '⬅️ Назад' && (ctx.message.text) !== 'Artel' && (ctx.message.text) !== 'Royal' && (ctx.message.text) !== 'Shivaki' && (ctx.message.text) !== 'Samsung')
		//ctx.reply('Вы не выбрали бренд. Пожалуйста, нажмите одну из кнопок ниже:', {reply_markup: {keyboard: data.brands, resize_keyboard: true}})
	switch (ctx.message.text) {
		case 'Artel': case 'artel': ctx.reply('Выберите категорию устройства Artel:', {reply_markup: {keyboard: data.categories.Artel, resize_keyboard: true}})
		dbAdd(ctx.message.from.id, 'Artel')
		break
		case 'Royal': case 'royal': ctx.reply('Выберите категорию устройства Royal:', {reply_markup: {keyboard: data.categories.Royal, resize_keyboard: true}})
		dbAdd(ctx.message.from.id, 'Royal')
		break
		case 'Samsung': case 'samsung': ctx.reply('Выберите категорию устройства Samsung:', {reply_markup: {keyboard: data.categories.Samsung, resize_keyboard: true}})
		dbAdd(ctx.message.from.id, 'Samsung')
		break
		case 'Shivaki': case 'shivaki': ctx.reply('Выберите категорию устройства Shivaki:', {reply_markup: {keyboard: data.categories.Shivaki, resize_keyboard: true}})
		dbAdd(ctx.message.from.id, 'Shivaki')
		break
		case '⬅️ Назад': ctx.reply('Вернулись назад. Выберите бренд:', {reply_markup: {keyboard: data.brands, resize_keyboard: true}})
		break
	}
})

bot.startPolling()
