const telegraf = require('telegraf')
const mongo = require('mongodb').MongoClient
const data = require('./data')
const bot = new telegraf(data.token)
var basket

bot.start((ctx) => {
  ctx.reply(data.answers.welcome, {reply_markup: {keyboard: data.keys.welcome, resize_keyboard: true}})
})

bot.on('text', (ctx) => {

  switch(ctx.message.text) {
    case '📖Меню': case '⬅️Меню': ctx.reply(data.answers.menu, {reply_markup: {keyboard: data.keys.menu, resize_keyboard: true}})
    break
    case '🛒Корзина': ctx.reply(data.answers.basket, {reply_markup: {keyboard: data.keys.basket, resize_keyboard: true}})
    break
    case '📍Все рестораны': ctx.reply(data.answers.restaurants, {reply_markup: {keyboard: data.keys.restaurants, resize_keyboard: true}})
    break
    case '⬅️Главное меню': ctx.reply(data.answers.welcomeBack, {reply_markup: {keyboard: data.keys.welcome, resize_keyboard: true}})
    break
    case '🍔Сэндвичи': ctx.reply(data.answers.sandwiches, {reply_markup: {keyboard: data.keys.sandwiches, resize_keyboard: true}})
    break
    case 'Ай-Твистер Чиз': ctx.replyWithPhoto(data.other['Ай-Твистер Чиз'].url, {caption: data.other['Ай-Твистер Чиз'].caption, parse_mode: 'markdown'}, {reply_markup: {inline_keyboard: data.inlineKeys.twister}})
  }
})

bot.startPolling()
