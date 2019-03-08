const RequestService = require('./request-service');
const WebSocket = require('websocket').w3cwebsocket;
const wsUri = 'wss://www.bitmex.com/realtime';
const _ = require('lodash');

const bMexBook = function bitmexOrderBook() {
    let masterBook = {
        bids: [],
        asks: []
    }
    let bookInitialized = false;

    const handleBookData = (data) => {
        if (data.action === 'partial') {

            _.forEach(data.data, (bookLevel) => {
                if (bookLevel.side === 'Sell') {
                    masterBook.asks.push(bookLevel);
                } else if (bookLevel.side === 'Buy') {
                    masterBook.bids.push(bookLevel);
                }
            });
            bookInitialized = true;

        } else if (data.action === 'update' && bookInitialized === true) {
            _.forEach(data.data, (bookUpdate) => {
                if (bookUpdate.side === 'Buy') {
                    _.forEach(masterBook.bids, (bookLevel) => {
                        if (bookUpdate.id === bookLevel.id) {
                            bookLevel.size = bookUpdate.size;
                            return false;
                        }
                    });
                } else if (bookUpdate.side === 'Sell') {
                    _.forEach(masterBook.asks, (bookLevel) => {
                        if (bookUpdate.id === bookLevel.id) {
                            bookLevel.size = bookUpdate.size;
                            return false;
                        }
                    });
                }
            });
            

        } else if (data.action === 'insert' && bookInitialized === true) {
        } else if (data.action === 'delete' && bookInitialized === true) {
        }
        masterBook.bids = _.orderBy(masterBook.bids, ['price'], ['desc']);
        masterBook.asks = _.orderBy(masterBook.asks, ['price'], ['asc']);

        _.forEach(masterBook.bids, (bid) => {
            console.log(bid.price, bid.size);
        });

        // console.log(masterBook.bids);

        // for (let i = 0; i < 25; i++) {
        //     console.log(masterBook.)
        // }
        
    }
    

    const openBmexWS = () => {
        const bmexWS = new WebSocket('wss://www.bitmex.com/realtime?subscribe=orderBookL2_25:XBTUSD');
        bmexWS.onopen = (e) => console.log('bmexWS Open');
        bmexWS.onclose = (e) => console.log('bmexWS Close', e);
        bmexWS.onerror = (e) => console.log('bmexWS Error:', e);
        bmexWS.onmessage = (e) => {
            console.log('bmexWS message, unhandled');
        }
        return bmexWS;
    }

    const orderbookWS = openBmexWS();
    orderbookWS.onmessage = (e) => {
        console.log('bmexWS message');
        const data = JSON.parse(e.data);
        handleBookData(data);
    }
}

module.exports = bMexBook;