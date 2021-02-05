var Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .addEntry('index', './assets/js/index.js')
    .addEntry('polyfill', 'babel-polyfill')
    .splitEntryChunks()
    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .enableReactPreset()

    .addLoader({
        test: /\.js$/,
        enforce: 'pre',
        loader: 'prettier-loader',
        exclude: /node_modules/,
        options: {
            parser: "babel"
        }
     })

    .addLoader({
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          fix: true,
            parser: 'babel-eslint'
        }
  })
;

module.exports = Encore.getWebpackConfig();
