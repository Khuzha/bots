const telegraf = require('telegraf')
const mongodb = require('mongodb').MongoClient;
const conf = require('./config');
const langs = require('./langs');

const bot = new telegraf(conf.token)
let langCode = ctx.from.language_code.toLowerCase();

bot.start((ctx) => {
	//let langCode = ctx.from.language_code.toLowerCase();
	console.log(langCode);
	return (langCode.search('ru') >= 0) ? ctx.reply(langs.ru.first) : ctx.reply(langs.en.first);
	console.log(langCode.search('ru'));
});

bot.command('markdown', (ctx) => {
	return (langCode.search('ru') >= 0) ? ctx.reply(langs.ru.mark) : ctx.reply(langs.en.mark);
});
bot.startPolling();