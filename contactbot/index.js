const telegraf = require('telegraf')
const data = require('./data')
const bot = new telegraf(data.token)
var mesID, userID

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

  userID = ctx.from.id
  console.log(ctx.update)
  //console.log(ctx.update.message.reply_to_message.message_id)
  console.log(ctx.update.message.reply_to_message.from.id)
  if (userID == data.myid){
    if(ctx.update.message.message_id != null && ctx.update.message.message_id != undefined){

    } else {
      let num = getRandomInt(0, data.ansme.length)
      ctx.reply(data.ansme[num])
    }
  } else {
    ctx.forwardMessage(data.myid, ctx.from.id, ctx.message.id)
  }

})

bot.startPolling()
