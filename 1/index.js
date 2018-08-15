const express = require('express');
const parser = require('body-parser');

var app = express();
app.use(parser.json());
app.post('*', answer)

function answer(res, req) {
	res.sendStatus(200);
	console.log(req.body);
}

app.listen(9010, alfa);
function alfa() {
	console.log('horen');
}