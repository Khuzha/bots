const axios = require('axios')
const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const api = {
    binance: 'https://api.binance.com/api/v1/ticker/price',
    exmo: 'https://api.exmo.com/v1/ticker/',
    bitfinex: 'https://api.bitfinex.com/v1/tickers',
    bittrex: 'https://bittrex.com/api/v1.1/public/getmarketsummaries',
    poloniex: 'https://poloniex.com/public?command=returnTicker',
    livecoin: 'https://api.livecoin.net/exchange/ticker'
}

    console.log('Connected');
    //var base = client.db('api')
    (async () => {
        let full = {}
        let trade = await Promise.all([
            axios.get(api.binance),     //0
            axios.get(api.exmo),        //1
            axios.get(api.bitfinex),    //2
            axios.get(api.bittrex),     //3
            //axios.get(api.poloniex),    //4
            axios.get(api.livecoin)    //5
        ])
        let binance = fetchBinance(trade[0])
        for(let pair in binance) full[pair] = binance[pair]
        let exmo = fetchExmo(trade[1])
        for(let pair in exmo) (full[pair]) ? full[pair].exmo = exmo[pair].exmo : full[pair] = exmo[pair]
        let bitfinex = fetchBitfinex(trade[2])
        for(let pair in bitfinex) (full[pair]) ? full[pair].bitfinex = bitfinex[pair].bitfinex : full[pair] = bitfinex[pair]
        let bittrex = fetchBittrex(trade[3])
        for(let pair in bittrex) (full[pair]) ? full[pair].bittrex = bittrex[pair].bittrex : full[pair] = bittrex[pair]
        //let poloniex = fetchPoloniex(trade[4])
        //for(let pair in poloniex) (full[pair]) ? full[pair].poloniex = poloniex[pair].poloniex : full[pair] = poloniex[pair]
        let livecoin = fetchLivecoin(trade[4])
        for(let pair in livecoin) (full[pair]) ? full[pair].livecoin = livecoin[pair].livecoin : full[pair] = livecoin[pair]
        console.log(full);
        //for(let pair in full) {
         //   console.log(full[pair]);

        }
    )()

function fetchLivecoin(data) {
    let arr = {}
    let time = Math.round(new Date() / 1000)
    for(let pair of data.data) {
        let name = pair.symbol
        let last = Number(pair.last)
        if(last > 0) {
            arr[name] = {}
            arr[name].livecoin = {}
            arr[name].livecoin.last = last
            arr[name].livecoin.time = time
        }
    }
    return arr
}

function fetchPoloniex(data) {
    let arr = {}
    let time = Math.round(new Date() / 1000)
    for(let pair in data.data) {
        let name = pair.split('_')
        name = name[1] + '/' + name[0]
        let last = Number(data.data[pair].last)
        if(last > 0) {
            arr[name] = {}
            arr[name].poloniex = {}
            arr[name].poloniex.last = last
            arr[name].poloniex.time = time
        }
    }
    return arr
}

function fetchBittrex(data) {
    let arr = {}
    let time = Math.round(new Date() / 1000)
    for(let pair of data.data.result) {
        let name = pair.MarketName
        name = name.split('-')
        name = name[1] + '/' + name[0]
        let last = Number(pair.Last)
        if(last > 0) {
            arr[name] = {}
            arr[name].bittrex = {}
            arr[name].bittrex.time = time
            arr[name].bittrex.last = last
        }
    }
    return arr
}

function fetchBitfinex(data) {
    let arr = {}
    let time = Math.round(new Date() / 1000)
    for(let pair of data.data) {
        let name = pair.pair.slice(0,3) + '/' + pair.pair.slice(3)
        let last = Number(pair.last_price)
        if(last > 0) {
            arr[name] = {}
            arr[name].bitfinex = {}
            arr[name].bitfinex.time = time
            arr[name].bitfinex.last = last
        }
    }
    return arr
}

function fetchExmo(data) {
    let arr = {}
    let time = Math.round(new Date() / 1000)
    for(let pair in data.data) {
        let name = pair.replace('_', '/')
        let last = Number(data.data[pair].last_trade)
        if(last > 0) {
            arr[name] = {}
            arr[name].exmo = {}
            arr[name].exmo.time = time
            arr[name].exmo.last = last
        }
    }
    return arr
}

function fetchBinance(data) {
    let arr = {}
    let time = Math.round(new Date() / 1000)
    for(let pair of data.data) {
        let symb = pair.symbol
        let n = symb.length
        let s = symb[n - 1]
        let name = (s == 'T') ? symb.substring(0, n - 4) + '/USDT' : symb.substring(0, n - 3) + '/' + symb.substring(n - 3, n)
        let last = Number(pair.price)
        if(last > 0) {
            arr[name] = {}
            arr[name].binance = {}
            arr[name].binance.time = time
            arr[name].binance.last = last
        }
    }
    return arr
}
