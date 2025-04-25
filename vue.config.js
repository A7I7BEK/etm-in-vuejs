module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  lintOnSave: false,
  publicPath: process.env.GH_PAGES_SUFFIX || '/',
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