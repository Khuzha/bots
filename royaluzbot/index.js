const telegraf = require('telegraf')
const mongo = require('mongodb').MongoClient
const data = require('./data')
const token = require('./token')
const dbUrl = 'mongodb://localhost:27017/'
const bot = new telegraf(token.token)
var rcvdUserData, rcvdDB, clientID, db, collection

mongo.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
    if(err) console.log('Ошибка при подключении к ДБ: \n' + err)
    db = client.db('royal')
		collection = db.collection('actions')
})

//console.log('DB: \n' + rcvdDB + '\n\n__________________________________________________ \n User: \n' +rcvdUserData)

bot.start((ctx) => {
	ctx.reply('Начали! Выберите категорию водонагревателей:', {reply_markup: {keyboard: data.categories, resize_keyboard: true}})
  clientID = ctx.from.id
  db.collection('actions').find({id: clientID}).toArray()
        .then((docs) => {
            if(docs.length > 0) return db.collection('actions').updateOne({id: clientID}, {$set: {lastAction: ctx.message.text}})
        })
  db.collection('actions').find().toArray(function(err, results){
    if(err) console.log('Ошибка получения данных из ДБ: ' + err)
    else console.log(results)
  })
})


bot.on('text', (ctx) => {
	console.log(JSON.stringify(ctx.message) + '\n----------------------------------------------------------')
  switch (ctx.message.text) {
    case 'Солнечные ВН':
      ctx.reply('Выберите тип солнечных ВН:', {reply_markup: {keyboard: data.types.solar, resize_keyboard: true}})
      db.collection('actions').updateOne({id: clientID}, {$set: {lastAction: 'Солнечные ВН'}}, function(err, results){
        if(err) console.log('Ошибка при добавлении данных солнечных ВН в БД' + err)
        return results
      })
      break
    case 'Электрические ВН':
      ctx.reply('Выберите тип электрических ВН:', {reply_markup: {keyboard: data.types.electric, resize_keyboard: true}})
      db.collection('actions').updateOne({id: clientID}, {$set: {lastAction: 'Электрические ВН'}}, function(err, results){
        if(err) console.log('Ошибка при добавлении данных электрических ВН в БД' + err)
        return results
      })
      break
    case 'Газовые котлы':
      ctx.reply('Выберите тип газовых котлов:', {reply_markup: {keyboard: data.types.gas, resize_keyboard: true}})
      db.collection('actions').updateOne({id: clientID}, {$set: {lastAction: 'Газовые котлы'}}, function(err, results){
        if(err) console.log('Ошибка при добавлении данных газовых котлов в БД' + err)
        return results
      })
      break
  }
	}
) //Помни, Сардор, перед этой скобкой была фигурная скобка, но ты не знал, к чему она и удалил

bot.startPolling()
