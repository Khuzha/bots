const telegraf = require('telegraf')
const mongodb = require('mongodb').MongoClient;
const conf = require('./config');
const langs = require('./langs');

const bot = new telegraf(conf.token);
let langCode;

bot.start((ctx) => {
	let lc = ctx.from.language_code.toLowerCase();
	langCode = lc;
	console.log(langCode);
	return (langCode.search('ru') >= 0) ? ctx.reply(langs.ru.first) : ctx.reply(langs.en.first);
	console.log(langCode.search('ru'));
});

bot.command('markdown', (ctx) => {
	return (langCode.search('ru') >= 0) ? ctx.reply(langs.ru.mark, telegraf.Extra.HTML()) : ctx.reply(langs.en.mark, telegraf.Extra.HTML());
});
bot.startPolling();