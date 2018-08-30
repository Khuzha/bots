const Telegraf = require('telegraf');
const bot = new Telegraf('667423748:AAFedXaJSTZ-NINUSLmi-d8Ld1jG3iU-vJA');
const axios = require('axios');

bot.on('text', ctx => {
	const subreddit = ctx.message.text;
	axios.get(`https://reddit.com/r/${subreddit}/top.json?limit=10`)
	.then(res => {
		const data = res.data.data;
		if (data.children.length < 1)
			return ctx.reply('Not found 404');
		const link = `https://reddit.com/${data.children[0].data.permalink}`;
		return ctx.reply(link);
		})
	.catch(err => console.log(err));
})

let state = {};

bot.command('top', ctx => {
	const userID = ctx.message.from.id;
	if(!state[userID])
		state[userID] = {id : userID};
	state[userID].command = `top`;
	return ctx.replyWithMarkdown('Введите название сабреддита, чтобы получить *топовые* посты.');
})

bot.command('hot', ctx => {
	const userID = ctx.message.from.id;
	if(!state[userID])
		state[userID] = {id : userID};
	state[userID].command = 'hot';
	return ctx.replyWithMarkdown('Введите название сабреддита, чтобы получить *горячие* посты.');
})
/*
const userID = ctx.message.from.id;
const type = !state[userID] ? 'top' : state[userID].command ? state[userID].command : 'top';
axios.get(`https://reddit.com/r/${subreddit}/${type}.json?limit=10`)
.then(res => []);

*/

bot.startPolling();