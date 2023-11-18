const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const port = new SerialPort({ path: '/dev/cu.usbmodem14401', baudRate: 9600 })

const WebSocket = require(`ws`);

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
parser.on('data', console.log)

// WebSocket server
//const wss = new WebSocket.Server({ port: 5173 });
const wss = new WebSocket('ws://localhost:5173')

wss.on('connection', ws => {
    parser.on('data', data => {
        ws.send(data);
    });
});

wss.on('open', () => {
    console.log('WebSocket server started on ws://localhost:5173');
});

wss.on('error', () => {
    console.log("error?");
});

//socket isnt open!!!

