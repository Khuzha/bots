const axios = require('axios');
const mongojs = require('mongojs');
const apis = {
	binance: {
		prices: 'https://api.binance.com/api/v1/ticker/price',
		pos: 'https://www.binance.com/assetWithdraw/getAllAsset.html'
	}
}
const configAtlas = {url: 'mongodb://Khuzha:lolkek@onetech-shard-00-00-g4hlr.mongodb.net:27017,onetech-shard-00-01-g4hlr.mongodb.net:27017,onetech-shard-00-02-g4hlr.mongodb.net:27017/test?ssl=true&replicaSet=onetech-shard-0&authSource=admin&retryWrites=true'};

var getBinance = () => {
	axios.get(apis.binance.prices)
		.then((res) => {
			//console.log(res);
			let arr = [];
			for (let key of res.data) {
				let n = key.symbol.length;
				let lastS = key.symbol[n-1]; //последняя буква
				//console.log(lastS);
				if (lastS == 'T') { //проверяем, Тезер ли это и если Тезер - обризаем последние три буквы
					//console.log(key.symbol);
					var m = key.symbol.substring(0, n-4); //обрезаем USDT в конце
					var main = m + '/USDT'; //прибавляем /USDT
					//console.log(main);
				} else {
					var m = key.symbol.substring(0, n-3); //обрезаем BTC, BNB.. любые три знака в конце
					var main = m + '/' + key.symbol.substring(n-3, n) //прибавляем токен, за который покупается, но уже с слешем
					//console.log(main);
				}
				var obj = {
					name: main,
					binance: {
						buy: Number(key.price),
						sell: Number(key.price),
						time: Math.round(new Date() / 1000)
					}
				}
				//console.log(obj);
			}
			})
		
		}

	mongojs(configAtlas.url);
var con = mongojs(configAtlas.url);
var svz = con.collection('first');
svz.find((err, res) => {
	console.log(res);
})

//getBinance();
