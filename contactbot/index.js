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
  if(ctx.chat.id == data.myid && ctx.update.message && ctx.update.message.reply_to_message && ctx.message.reply_to_message.from.is_bot == false){ //чекаю, я ли в чате; ответ ли это на какое-то сообщение; не боту ли я ответил
    data.lastID = ctx.message.reply_to_message.forward_from.id //присваиваю переменной (можно было записать в виде переменной, но мне так нравится больше) айди того, кому я отвечаю
    if(data.lastID != ''){ //проверяю, не пустой ли lastID, ибо по умолчанию он именно == '', но пердыдущая строка должна была записать айди
       ctx.telegram.sendMessage(data.lastID, ctx.message.text)
     } else {
       ctx.reply(data.emptyReciever)
     }

} else {
  ctx.forwardMessage(data.myid, ctx.from.id, ctx.message.id)
}
})

bot.startPolling()
