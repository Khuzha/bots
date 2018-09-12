const telegraf = require('telegraf')
const data = require('./data')
const bot = new telegraf(data.token)

bot.start((ctx) => {
  if (ctx.chat.id == data.myid){
    ctx.reply(data.startMessageToMe)
  } else {
  ctx.reply(data.hello, {reply_markup: {inline_keyboard: [[{text: '🇬🇧 Change lang', callback_data: 'en'}]]}})
  }
})

getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

bot.on('text', (ctx) => {
  if (ctx.chat.id == data.myid){
    if(ctx.update.message && ctx.update.message.reply_to_message) {
      ctx.telegram.sendMessage(ctx.message.reply_to_message.forward_from.id, ctx.message.text)
    } else {
      let num = getRandomInt(0, data.ansme.length)
      ctx.reply(data.ansme[num])
    }
  } else {
    ctx.forwardMessage(data.myid, ctx.from.id, ctx.message.id)
  }
})

bot.startPolling()
