module.exports = (options, app) => {
  const routerPrefix = options.default.router.base;

  return async (ctx, next) => {
    await next();

    if (ctx.status !== 404 || ctx.method !== 'GET') {
      return;
    }

    const url = ctx.request.url
    const ctxPath = ctx.path

    if (/\.js$/.test(ctxPath)) {
      ctx.set('Content-Type', 'application/javascript')
    }
    if (/\.css/.test(ctxPath)) {
      ctx.set('Content-Type', 'text/css')
    }

    // webpack hot reload
    // egg will set 'content-length' with value, it will disable the hot middleware keep alive.
    // egg 默认设置了 'content-length' 值，导致热更新失败，建议去掉该值保持活跃
    if (ctxPath === '/__webpack_hmr/client') {
      ctx.response.remove('Content-Length')
    }

    if (url.startsWith(routerPrefix)) {
      ctx.status = 200
      ctx.respond = false
      ctx.req.ctx = ctx
      await ctx.app.nuxt.render(ctx.req, ctx.res)
    }
  }
}

