const TelegramBot = require('node-telegram-bot-api');
const token = '665381933:AAFDawxAbu1isl5zz-TRmmhhf3dMFX8vvVg';
var bot = new TelegramBot(token, {polling:true});

var notes = [];

bot.onText (/напомни (.+) в (.+0)/, function(msg, match)) {
	var userId = msg.from.id;
	var text = match[1];
	var time = match[2];

	notes.push({'uid': userId, 'time': time, 'text': text});
	bot.sendMessage(userId, ', отлично! Я обязательно напомню тебе об этом!');
}