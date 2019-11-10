const { Nuxt, Builder } = require('nuxt');

module.exports = app => {
  app.addSingleton('nuxt', createNuxt)

  app.config.coreMiddleware.unshift('nuxt-error-handler');
  app.config.coreMiddleware.unshift('nuxt-render');
}

async function createNuxt(config, app) {
  const nuxt = new Nuxt(config);

  if (app.config.env === 'prod') {
    await nuxt.ready();
  } else {
    const builder = new Builder(nuxt);

    await builder.build();
  }

  return nuxt;
}
