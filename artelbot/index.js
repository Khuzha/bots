const telegraf = require('telegraf')
const mongo = require('mongodb')
const data = require('./data.js')
const bot = new telegraf('677040137:AAE69J7jKUJv0upY8Z8GYWE-dI2OXO7aLn4')

mongo.connect('mongodb://localhost:27017/', function(err, client)){
	if(err)
		return console.log('Произошла ошибка подключения БД Mongo: ' + err)
	client.close()
}


bot.start((ctx) => {
	(ctx.reply('Выберите бренд', {reply_markup: {keyboard: data.brands, resize_keyboard: true}}))
})

bot.on('text', (ctx) => {
	switch (ctx.message.text) {
		case 'Artel': ctx.reply('Выберите категорию устройства:', {reply_markup: {keyboard: data.categories.Artel, resize_keyboard: true}})
		break
		case 'Royal': ctx.reply('Выберите категорию устройства:', {reply_markup: {keyboard: data.categories.Royal, resize_keyboard: true}})
		break
		case 'Samsung': ctx.reply('Выберите категорию устройства:', {reply_markup: {keyboard: data.categories.Samsung, resize_keyboard: true}})
		break
		case 'Shivaki': ctx.reply('Выберите категорию устройства:', {reply_markup: {keyboard: data.categories.Shivaki, resize_keyboard: true}})
		break
	}
})

console.log(JSON.stringify(ctx.message))

bot.on('text', (ctx) => {
	switch(ctx.message.text) {
		case 'Кондиционеры': ctx.reply('Выберите модель кондиционера:', {reply_markup: {keyboard: data.models.Artel.Кондиционеры, resize_keyboard: true}})
		break
		case 'Пылесоы': ctx.reply('Выберите модель пылесоса:', {reply_markup: {keyboard: data.models.Artel.Пылесоы, resize_keyboard: true}})
		break
		case 'Холодильники': ctx.reply('Выберите модель холодильника:', {reply_markup: {keyboard: data.models.Artel.Холодильники, resize_keyboard: true}})
		break
		case 'Микроволновки': ctx.reply('Выберите модель микроволновки:', {reply_markup: {keyboard: data.models.Artel.Микроволновки, resize_keyboard: true}})
		break
	}


bot.startPolling();
