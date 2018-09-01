const telegraf = require('telegraf')
const mongo = require('mongodb').MongoClient
const data = require('./data.js')
const bot = new telegraf('619360663:AAFV0Vl6AjaFjAKBONj3zAFFErV0SaRlXHs')
var clientID, chbr, chcat, chmod;

var approp = (cid, cbr, ccat, cmod) => {
	clientID = cid
	chbr = cbr
	chcat = ccat
	chmod = cmod
	dbstart()
}

const dbUrl = 'mongodb://localhost:27017/'
var dbstart = () => {
mongo.connect(dbUrl, {useNewUrlParser: true}, function(err, client){
	const db = client.db('navi')
	const collection = db.collection('lastAction')
	var user = {id: clientID, brand: chbr, cat: chcat, model: chmod}
	collection.insertOne(user, function(err, result){
		if(err){
			console.log('Ошибка добавления айди и последнего действия в коллекцию: [' + err + ']')
		}
		console.log(result.ops)
		client.close
	})
})
}


bot.start((ctx) => {
	(ctx.reply('Начали! Выберите бренд:', {reply_markup: {keyboard: data.brands, resize_keyboard: true}}))
})


bot.on('text', (ctx) => {
	console.log(JSON.stringify(ctx.message))
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
		approp(ctx.message.from.id, 'Samsung')
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
