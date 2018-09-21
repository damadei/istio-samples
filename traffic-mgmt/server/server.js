var winston = require('winston');
const restify = require('restify');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ]
});

let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 8181, function () {
  console.log(`${server.name} listening to ${server.url}`);
});

server.get('/', (req, res) => {
  logger.debug('get /');
  res.send({ version: (process.env.version || 'v1') });
  res.end();
});