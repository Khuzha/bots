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

bot.on('text', (ctx) => {
  if(ctx.chat.id == data.myid && ctx.update.message && ctx.update.message.reply_to_message && ctx.update.message && ctx.update.message.reply_to_message){
    console.log('ok')
    data.lastID = ctx.message.reply_to_message.forward_from.id
} else {
  ctx.forwardMessage(data.myid, ctx.from.id, ctx.message.id)
}
if(ctx.message.reply_to_message.from.is_bot == false){
  if(data.lastID != ''){
     ctx.telegram.sendMessage(data.lastID, ctx.message.text)
   } else {
     ctx.reply(data.emptyReciever)
   }
}
})

bot.startPolling()
