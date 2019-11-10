declare module 'egg' {
  interface Context {
    nuxt: any;
  }

  interface EggAppConfig {
    nuxt: {
      srcDir?: string
    }
  }
}
