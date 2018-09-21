const winston = require('winston');
const restify = require('restify');
const request = require('request-promise');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ]
});

async function main() {
  let server = restify.createServer();
  server.listen(process.env.port || process.env.PORT || 8080, function () {
    console.log(`${server.name} listening to ${server.url}`);
  });
  
  server.get('/', async (req, res) => {
    logger.debug('get /');
  
    var server = process.env.API_SERVER_HOST || 'server-api';
    var port = process.env.API_SERVER_PORT || 8181;

    try {
      var result = await request.get(`http://${server}:${port}/`);
      res.send({ 'result': result });
      res.end();
    } catch(e) {
      logger.error('Error calling API: ' + e);
      logger.error(e);
      res.status(500);
      res.send({
        'error': true,
        'exception': e
      });
      res.end();
    }
  });
}

main()
  .then(v => logger.info('Sucesso'))
  .catch(err => logger.error(err));