const path = require('path')

module.exports = appInfo => {
  const config = {}

  config.nuxt = {
    default: {
      srcDir: path.join(appInfo.baseDir, './resources'),
      rootDir: path.join(appInfo.baseDir),
      router: {
        base: '/'
      }
    }

  }

  return config
}
