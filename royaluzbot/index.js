const telegraf = require('telegraf')
const token = require('./token')
const data = require('./data')
const bb = require('./bb')
const bot = new telegraf(token.token)

bot.context.categ = {}

bot.start((ctx) => {
  ctx.reply('Начали! Выберите категорию:', {reply_markup: {keyboard: data.categories, resize_keyboard: true}})
  ctx.categ[ctx.from.id] = 'start'
})

bot.on('text', (ctx) => {
  ctx.categ[ctx.from.id] = ctx.message.text
  console.log(ctx.categ)

  switch(ctx.categ[ctx.from.id]) {
    case 'Солнечные ВН':
    ctx.reply('Выберите тип солнечных водонагревателей:', {reply_markup: {keyboard: data.types.solar, resize_keyboard: true}})
    break
    case 'Электрические ВН':
    ctx.reply('Выберите тип электрических водонагревателей', {reply_markup: {keyboard: data.types.electric, resize_keyboard: true}})
    break
    case 'Газовые котлы':
    ctx.reply('Выберите тип газовых котлов:', {reply_markup: {keyboard: data.types.gas, resize_keyboard: true}})
    break
    case 'Бойлеры':
    ctx.reply('Файл Вы можете скачать ниже. Для онлайн просмотра нажмите [сюда](https://drive.google.com/open?id=1AwfiRZFINU36kiomrLUG5E8EUmC7uzi9)', {parse_mode: 'markdown'})
    break
    case '⬅️ Назад':
    ctx.reply('Вернулись назад. Выберите категорию:', {reply_markup: {keyboard: data.categories, resize_keyboard: true}})
    ctx.categ[ctx.from.id] = 'start'
    break
    case 'Коллекторы':
    ctx.reply('Файл Вы можете скачать ниже. Для онлайн просмотра нажмите [сюда](https://drive.google.com/open?id=1hY-H1GxF1vSU-HFq3nImhfxzSMx7kEPu)', {parse_mode: 'markdown'})
    break
    case 'Kiturami':
    ctx.reply('Файл Вы можете скачать ниже. Для онлайн просмотра нажмите [сюда](https://drive.google.com/open?id=1Oo770v3E87VR6u977_WVZtI0uiBNqLKw)', {parse_mode: 'markdown'})
    break
    case 'Baykan':
    ctx.reply('Файл Вы можете скачать ниже. Для онлайн просмотра нажмите [сюда](https://drive.google.com/open?id=1H70gE16kVBJOtTv50dsECMN7xm4gz76s)', {parse_mode: 'markdown'})
    break
    case 'Классик':
    ctx.reply('Файл Вы можете скачать ниже. Для онлайн просмотра нажмите [сюда](https://drive.google.com/open?id=1AwfiRZFINU36kiomrLUG5E8EUmC7uzi9)', {parse_mode: 'markdown'})
    break
    case 'Премиум':
    ctx.reply('Файл Вы можете скачать ниже. Для онлайн просмотра нажмите [сюда](https://drive.google.com/open?id=1AwfiRZFINU36kiomrLUG5E8EUmC7uzi9)', {parse_mode: 'markdown'})
    break
  }
})





bot.startPolling()
