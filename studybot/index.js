const telegraf = require('telegraf')
const mongo = require('mongodb').MongoClient
const data = require('./data.js')
const bot = new telegraf(data.token)
var db

mongo.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
  if(err){
    return console.log(err)
  }

  db = client.db('studyarea')
  bot.startPolling()
})

bot.start((ctx) => {
  let status
  if(ctx.chat.id == data.myid) {
    myPanel()
    status = 1
  }
  db.collection('admins').find({id: ctx.chat.id}).toArray((err, results) => {
    if(err) ctx.telegram.sendMessage(data.myid, ('В чате ' + ctx.chat.id + ' произошла ошибка: ' + err))
    if(results.indexOf(ctx.chat.id) != -1) {
      admin()
      status = 1
    }
})
  if(status != 1) usualUser()
})

myPanel = () => {
  bot. //А ВОТ СЮДА НЕ ЗНАЮ, ЧТО ПИСАТЬ
}
