const telegraf = require('telegraf')
const data = require('./data.js')
const bot = new telegraf('677040137:AAE69J7jKUJv0upY8Z8GYWE-dI2OXO7aLn4')


bot.start((ctx) => {
	(ctx.reply('Выберите бренд', {reply_markup: {keyboard: data.brands, resize_keyboard: true}}))
})

bot.on('Artel', (ctx) => {
	switch (ctx.message.text) {
		case 'Artel': ctx.reply('Выберите категорию устройства:', {reply_markup: {keyboard: data.categories.Artel, resize_keyboard: true}})
		break
		case 'Royal': ctx.reply('Выберите категорию устройства:', {reply_markup: {keyboard: data.categories.Royal, resize_keyboard: true}})
		break
		case 'Samsung': ctx.reply('Выберите категорию устройства:', {reply_markup: {keyboard: data.categories.Samsung, resize_keyboard: true}})
		break
		case 'Shivaki': ctx.reply('Выберите категорию устройства:', {reply_markup: {keyboard: data.categories.Shivaki, resize_keyboard: true}})
		break
	}
})


bot.startPolling()
