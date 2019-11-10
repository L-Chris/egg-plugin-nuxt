const path = require('path')

module.exports = appInfo => {
  const config = {}

  config.nuxt = {
    srcDir: path.join(appInfo.baseDir, './resources'),
    rootDir: path.join(appInfo.baseDir)
  }

  return config
}
