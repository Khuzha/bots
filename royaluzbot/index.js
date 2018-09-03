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
    //ОШИБКА ТУТ (вывод консоли выложил в самом низу):
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
      ctx.reply('Выберите тип солнечных ВН:', {reply_markup: {keyboard: data.types.solar}})
      db.collection('actions').updateOne({id: clientID}, {$set: {lastAction: 'Солнечные ВН'}})
      break
    case 'Электрические ВН':
      ctx.reply('Выберите тип электрических ВН:', {reply_markup: {keyboard: data.types.electric}})
      db.collection('actions').updateOne({id: clientID}, {$set: {lastAction: 'Электрические ВН'}})
      break
    case 'Газовые котлы':
      ctx.reply('Выберите тип газовых котлов:', {reply_markup: {keyboard: data.types.gas}})
      db.collection('actions').updateOne({id: clientID}, {$set: {lastAction: 'Газовые котлы'}})
      break
    default:
  }
	}
) //Помни, Сардор, перед этой скобкой была фигурная скобка, но ты не знал, к чему она и удалил

bot.startPolling()


/*
Ошибка:

oneuser@OnePC:~/MyProjects/bots/royaluzbot$ node index.js
/home/oneuser/MyProjects/bots/royaluzbot/node_modules/mongodb/lib/operations/mongo_client_ops.js:466
      throw err;
      ^

TypeError: Assignment to constant variable.
    at mongo.connect (/home/oneuser/MyProjects/bots/royaluzbot/index.js:14:8)
    at result (/home/oneuser/MyProjects/bots/royaluzbot/node_modules/mongodb/lib/utils.js:414:17)
    at executeCallback (/home/oneuser/MyProjects/bots/royaluzbot/node_modules/mongodb/lib/utils.js:406:9)
    at err (/home/oneuser/MyProjects/bots/royaluzbot/node_modules/mongodb/lib/operations/mongo_client_ops.js:286:5)
    at connectCallback (/home/oneuser/MyProjects/bots/royaluzbot/node_modules/mongodb/lib/operations/mongo_client_ops.js:241:5)
    at process.nextTick (/home/oneuser/MyProjects/bots/royaluzbot/node_modules/mongodb/lib/operations/mongo_client_ops.js:463:7)
    at _combinedTickCallback (internal/process/next_tick.js:131:7)
    at process._tickCallback (internal/process/next_tick.js:180:9)

*/
