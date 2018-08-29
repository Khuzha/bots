const telegraf = require('telegraf');
const mongodb = require('mongodb');

var token = '667423748:AAFedXaJSTZ-NINUSLmi-d8Ld1jG3iU-vJA';
var botOptions = {polling: true};
var bot = new telegraf(token);
//bot.start((ctx) => ctx.reply('Хеллоу'));

bot.on('text', function(msg) {
	var chatID = msg.chat.id;
	var mText = msg.text;
	console.log(msg.chat);
	var mess = JSON.stringify(msg);
	console.log('msg full: ' + mess);
	if (mText === '/start') {
		;
	} 
});

bot.startPolling();