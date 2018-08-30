module.exports = {
  messageOptions: {
    parse_mode: "HTML",
    disable_web_page_preview: false,
    reply_markup: JSON.stringify({
        inline_keyboard: [[{
            text: 'Название кнопки',
            callback_data: 'do_something'
        }]]
    })
}
}