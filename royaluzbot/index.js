const telegraf = require('telegraf')
const mongo = require('mongodb').MongoClient
const data = require('./data')
const dbUrl = 'mongodb://localhost:27017/'
const bot = new telegraf('619360663:AAG77yeLT3RMRp5B8ra9TR41dh7Lp-Cb_zs')

var rcvdUserData, rcvdDB, db

mongo.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
    if(err) throw err
    const db = client.db('royal')
		const collection = db.collection('')
})

bot.on('text', (ctx) => {
    let id = ctx.from.id
    db.collection('list').find({id: id}).toArray()
        .then((docs) => {
            console.log(docs);
        })
})

//console.log('DB: \n' + rcvdDB + '\n\n__________________________________________________ \n User: \n' +rcvdUserData)

bot.start((ctx) => {
	ctx.reply('Начали! Выберите бренд:', {reply_markup: {keyboard: data.brands, resize_keyboard: true}})
	//ctx.answerCbQuery('Добро пожаловать!')
})


bot.on('text', (ctx) => {
	console.log(JSON.stringify(ctx.message) + '\n______________________________________________________________________')

	//if(typeof(ctx.message.text) === 'string' && (ctx.message.text) !== '⬅️ Назад' && (ctx.message.text) !== 'Artel' && (ctx.message.text) !== 'Royal' && (ctx.message.text) !== 'Shivaki' && (ctx.message.text) !== 'Samsung')
		//ctx.reply('Вы не выбрали бренд. Пожалуйста, нажмите одну из кнопок ниже:', {reply_markup: {keyboard: data.brands, resize_keyboard: true}})
	switch (ctx.message.text) {
		case 'Artel': case 'artel': ctx.reply('Выберите категорию устройства Artel:', {reply_markup: {keyboard: data.categories.Artel, resize_keyboard: true}})
		db.collection('')
		break
		case 'Royal': case 'royal': ctx.reply('Выберите категорию устройства Royal:', {reply_markup: {keyboard: data.categories.Royal, resize_keyboard: true}})
		break
		case 'Samsung': case 'samsung': ctx.reply('Выберите категорию устройства Samsung:', {reply_markup: {keyboard: data.categories.Samsung, resize_keyboard: true}})
		break
		case 'Shivaki': case 'shivaki': ctx.reply('Выберите категорию устройства Shivaki:', {reply_markup: {keyboard: data.categories.Shivaki, resize_keyboard: true}})
		break
		case '⬅️ Назад': ctx.reply('Вернулись назад. Выберите бренд:', {reply_markup: {keyboard: data.brands, resize_keyboard: true}})
		break
	}
})

bot.startPolling()
