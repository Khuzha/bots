var TelegramBot = require('telegraf');
var TOKEN = '667423748:AAFedXaJSTZ-NINUSLmi-d8Ld1jG3iU-vJA';
var botOptions = {
  polling: true
};
var bot = new TelegramBot(TOKEN, botOptions); // Создаём экземпляр объекта
 
 
bot.on('text', function(msg) {
var messageChatId = msg.chat.id;
var messageText = msg.text;
 
  if (messageText === '/start') {
bot.sendMessage(messageChatId, 'Добро пожаловать, ну hello world');
  }
});

bot.startPolling();