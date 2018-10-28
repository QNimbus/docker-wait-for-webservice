var http = require('http');

var args = process.argv.slice(2);

var hostIndex = args.indexOf('-h') + 1;
var portIndex = args.indexOf('-p') + 1;
var pathIndex = args.indexOf('-u') + 1;

var maxAttempts = args.indexOf('-c') + 1 > 0 ? args[args.indexOf('-c') + 1] : 5;
var interval = Math.max(1000, args.indexOf('-i') + 1 > 0 ? args[args.indexOf('-i') + 1] : 0);

var options = {  
    host : hostIndex > 0 ? args[hostIndex] : 'localhost',
    path : pathIndex > 0 ? args[pathIndex] : '/',
    port : portIndex > 0 ? args[portIndex] : 8080,
    timeout : 1000
};

console.log(`Interval ===> ${interval}`);

setInterval(function() {
    console.log(`Attempting to connect to ${options.host}:${options.port}${options.path}`);

    var request = http.request(options, (res) => {  
        console.log(`Statuscode: ${res.statusCode}`);
        if (res.statusCode >= 200 && res.statusCode <= 299) {
            process.exit(0);
        }
        else {
            if (maxAttempts-- <= 0 ) {
                process.exit(1);
            }            
        }
    });
    
    request.on('error', function(err) {  
        console.log(`${err}`);
        if (maxAttempts-- <= 0 ) {
            process.exit(1);
        }
    });
    
    request.end(); 
}, interval);
 