const RequestService = require('./request-service');
const WebSocket = require('websocket').w3cwebsocket;
const wsUri = 'wss://www.bitmex.com/realtime';

const trackLiquidations = function trackBitmexLiquidations() {
    const openBmexWS = () => {
        const ws = new WebSocket('wss://www.bitmex.com/realtime?subscribe=liquidation:XBTUSD');
        ws.onopen = (e) => console.log('ws Open');
        ws.onclose = (e) => {
            console.log('ws Close, attempting to reopen');
            bmexWS = openBmexWS();
        }
        ws.onerror = (e) => console.log('ws Error:', e);
        ws.onmessage = (e) => {
            console.log('ws message');
            console.log(JSON.parse(e.data));
        }
        return ws;
    }
    let bmexWS = openBmexWS();
}

module.exports = trackLiquidations;