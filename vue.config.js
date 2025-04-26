module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  lintOnSave: false,
  publicPath: process.env.VUE_APP_DOMAIN_URL || '/',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
  devServer: {
    hot: false, // disable parallel update on save
    liveReload: false, // disable sudden browser refresh on save
  },
};