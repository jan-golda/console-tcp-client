#!/usr/bin/env node

// command line arguments
var args = require('optimist')
    .describe('h', 'Host to connect to')
        .demand('h')
        .alias('h','host')
    .describe('p', 'Port to connect to')
        .demand('p')
        .alias('p','port')
    .argv;

// import modules
var net     = require('net');
var colors  = require('colors');

// create client socket
var client = new net.Socket();

// connect ot the server
client.connect(args.port, args.host, function(){
    console.log(('Connected to '+args.host+':'+args.port).green);
});

// listener: receive data
client.on('data', function(data){
    process.stdout.write(('< ' + data).grey);
});

// listener: disconnect form the server
client.on('close', function(){
    console.log('Connection closed'.red);
});

// enable console input
process.stdin.resume();
process.stdin.setEncoding('utf8');

// listener: console input
process.stdin.on('data', function(data){
    client.write(data);
});

// listening to Ctrl+C
process.on('SIGINT', function() {
    console.log("Disconnecting".red);

    client.destroy();
    process.exit();
});
