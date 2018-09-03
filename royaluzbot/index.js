const telegraf = require('telegraf')
const mongo = require('mongodb').MongoClient
const data = require('./data')
const token = require('./token')
const dbUrl = 'mongodb://localhost:27017/'
const bot = new telegraf(token.token)
const db = {}
const collection = {}
var rcvdUserData, rcvdDB, clientID

mongo.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
    if(err) console.log('Ошибка при подключении к ДБ: \n' + err)
    //ошибка тут:
    db = client.db('royal')
		collection = db.collection('actions')
})

bot.on('text', (ctx) => {
    clientID = ctx.from.id
    db.collection('actions').find({id: clientID}).toArray()
        .then((userInfo) => {
            console.log('Из ДБ: ' + userInfo);
        })
})

//console.log('DB: \n' + rcvdDB + '\n\n__________________________________________________ \n User: \n' +rcvdUserData)

bot.start((ctx) => {
	ctx.reply('Начали! Выберите категорию водонагревателей:', {reply_markup: {keyboard: data.categories, resize_keyboard: true}})
})


bot.on('text', (ctx) => {
	console.log(JSON.stringify(ctx.message) + '\n----------------------------------------------------------')
  switch (ctx.message.text) {
    case 'Солнечные ВН':
    ctx.reply('Выберите тип солнечных ВН:')

      break;
    default:

  }
	}
})

bot.startPolling()
