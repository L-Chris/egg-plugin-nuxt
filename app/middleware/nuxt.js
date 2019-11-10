module.exports = (options, app) => {
  if (app.config.env === 'prod') {
    return async (ctx, next) => {
      await next();

      if (ctx.status !== 404 || ctx.method !== 'GET') {
        return
      }

      const ctxPath = ctx.path

      if (/\.js$/.test(ctxPath)) {
        ctx.set('Content-Type', 'application/javascript')
      } else if (/\.css/.test(ctxPath)) {
        ctx.set('Content-Type', 'text/css')
      }

      ctx.status = 200
      ctx.respond = false
      ctx.req.ctx = ctx
      await app.nuxt.render(ctx.req, ctx.res)
    }
  }

  return async (ctx, next) => {
    await next();

    if (ctx.status !== 404 || ctx.method !== 'GET') {
      return;
    }

    const ctxPath = ctx.path

    if (/\.js$/.test(ctxPath)) {
      ctx.set('Content-Type', 'application/javascript')
    } else if (/\.css/.test(ctxPath)) {
      ctx.set('Content-Type', 'text/css')
    }

    // webpack hot reload
    // egg will set 'content-length' with value, it will disable the hot middleware keep alive.
    // egg 默认设置了 'content-length' 值，导致热更新失败，建议去掉该值保持活跃
    if (ctxPath === '/__webpack_hmr/client') {
      ctx.response.remove('Content-Length')
    }

    ctx.status = 200
    ctx.respond = false
    ctx.req.ctx = ctx
    await app.nuxt.render(ctx.req, ctx.res)
  }
}

