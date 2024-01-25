const fastify = require('fastify');
const path = require('path');

const start = async () => {
  const app = fastify({});
  // app.register(require('@fastify/static'), {
  //   root: path.join(__dirname, '..', 'openapi'),
  //   prefix: '/documentation',
  // });
  await app.register(require('@fastify/swagger'), {
    mode: 'static',
    specification: {
      path: './openapi/index.yaml',
    },
  });
  await app.register(require('@fastify/swagger-ui'), {
    mode: 'static',
  });
  app.listen({ host: '0.0.0.0', port: 80 }, () => {
    console.info('Server started.');
  });
  app.register((fastify) =>
    fastify.post(
      '/test',
      (req) => `OK - arg1:${req.body.arg1}, arg2:${req.body.arg2}`
    )
  );
};

if (require.main === module) start();
