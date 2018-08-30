const TelegramBot = require('node-telegram-bot-api');
const objs = require('./objs');

var bot = new TelegramBot('679128833:AAGoDNIz6NFOIAYvahhPtLCKYu70NqINpXM', {polling: true});
var messageOptions = {
    parse_mode: "markdown",
    disable_web_page_preview: false,
    reply_markup: JSON.stringify({
        inline_keyboard: [[{
            text: 'Название кнопки',
            callback_data: 'do_something'
        }]]
    })
}
//bot.sendMessage(clietnID, 'Willkommen!', messageOptions);
console.log(messageOptions);
