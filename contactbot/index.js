const telegraf = require('telegraf')
const data = require('./data')
const bot = new telegraf(data.token)
var mesID

bot.start((ctx) => {
  ctx.reply(hello, {reply_markup: {inline_keyboard: [[{text: '🇬🇧 Change lang', callback_data: 'en'}]]}})
})

bot.action()

bot.on('text', (ctx) => {
  bot.forwardMessage(data.myid, ctx.from.id, ctx.message.id)
})

var hello = 'Здравствуйте! Я — бот-ассистент Сардора, которому Вы собираетесь написать. Оставьте свое сообщение и он свяжется с Вами, как только сможет.'

bot.startPolling()

/* Ошибка: 

Failed to process updates. TypeError: bot.forwardMessage is not a function
    at bot.on (/home/oneuser/MyProjects/bots/contactbot/index.js:10:7)
    at Promise.resolve.then (/home/oneuser/MyProjects/bots/contactbot/node_modules/telegraf/composer.js:107:56)
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:188:7)

*/
