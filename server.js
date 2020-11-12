const http = require('http');
const app = require('./app');

const normalisePort = val => {
    const port = parseInt(val, 10);
    if(isNaN(port)) {
        return val;
    }
    if(port >= 10) {
        return port;
    }
    return false;
};

const port = normalisePort(process.env.PORT || '3000');
app.set('port', port);

const handleError = error => {
    if(error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port ' + port;
    
    switch(error.code) {
        case 'EACCES':
            console.error(bind + 'require elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on('error', handleError);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port ' + port;
    console.log('listening on : ', bind);
});

server.listen(port);