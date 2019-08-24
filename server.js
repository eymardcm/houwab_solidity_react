const { createServer } = require('http');
const next = require('next');
const app = next({
  dev: process.env.NODE_ENV !== 'production'
});

const routes = require('./routes');

const handler = routes.getRequestHandler(app);

const prepare = async () => {
  await app.prepare();
  createServer(handler).listen(3000, (error) => {
      if (error) {
          throw error
      }
      console.log('Ready on localhost:3000')
  })
};
prepare()
