const telegraf = require('telegraf')
const mongo = require('mongodb').MongoClient
const conf = require('./config')
const bot = new telegraf(conf.token)
/*var key = telegraf.Extra.markdown().markup((m) => m.inlineKeyboard([
  m.callbackButton('Coke', 'Coke'),
  m.callbackButton('Pepsi', 'Pepsi')
]))*/

let key = {
        inline_keyboard: [
            [{text: 'Hello', callback_data: 'some'}],
            //[{...}],
            //[{...}]
        ]
    }

bot.start((ctx) => {
  ctx.reply('Let\'s create a message with comments. Send me the text message or a photo.\n\nAlso you can use native or /markdown formatting.', {reply_markup: {inline_keyboard: key}})
})



bot.startPolling()
