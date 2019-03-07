const RequestService = require('./request-service');
const WebSocket = require('websocket').w3cwebsocket;
const wsUri = 'wss://www.bitmex.com/realtime';

const trackLiquidations = function trackBitmexLiquidations() {
    const WS = new WebSocket('wss://www.bitmex.com/realtime?subscribe=instrument:XBTUSD')
    WS.onopen = (e) => console.log('WS Open');
    WS.onclose = (e) => console.log('WS Close', e);
    WS.onerror = (e) => console.log('WS Error:', e);
    WS.onmessage = (e) => {
        console.log('WS message');
        console.log(JSON.parse(e.data));
    }
}

module.exports = trackLiquidations;