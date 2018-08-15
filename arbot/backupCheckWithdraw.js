const axios = require('axios');
const apis = {
	binance: {
		prices: 'https://www.binance.com/assetWithdraw/getAllAsset.html',
		pos: 'https://www.binance.com/assetWithdraw/getAllAsset.html'
	}
}

var getBinance = () => {
	axios.get(apis.binance.prices)
		.then((res) => {
			//console.log(res);
			let arr = [];
			for (let key of res.data){
				//console.log(key.enableWithdraw);
				console.log(key.assetCode + ' - ' + key.enableWithdraw + ' минимальный вывод: ' + key.minProductWithdraw)
			}
			/*for (let key in res) {
				console.log(key)
			} */
			//console.log(res.data);
		})
}

getBinance();


/*axios.get('https://google.com')
	.then((res) => {
		//console.log(res);
	})*/