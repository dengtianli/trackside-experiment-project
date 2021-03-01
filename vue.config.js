let path = require('path')
const Timestamp = +new Date();

function resolve(dir) {
    return path.join(__dirname, dir)
}
const serviceIp = 'http://192.168.1.48';
module.exports = {
    publicPath: './',
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html'
        }
    },
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: `${serviceIp}:8150`,
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/test': {
                target: `http://10.1.3.191:8150`,
                // target: `http://10.200.2.227:8150`,
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/test': ''
                }
            },
        }
    },
    //     build: {
    //         // Template for index.html
    //         index: path.resolve(__dirname, '../dist/index.html'),
    //         // Paths
    //         assetsRoot: path.resolve(__dirname, '../dist'),
    //         assetsSubDirectory: 'static',
    //         assetsPublicPath: '/frontEnd/',
    //    }, 
    outputDir: 'dist',
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'));
        config.plugins.delete('prefetch');
        // config.plugin('provide').use(webpack.ProvidePlugin, [{
        //     'window.Quill': 'quill'
        // }]);
    },
    configureWebpack: config => {
        config.plugins.push(
            // new webpack.ProvidePlugin({
            //     $: "jquery",
            //     jQuery: 'jquery',
            //     'window.jQuery': 'jquery',
            //     'window.$': 'jquery'
            // })
        )
        config.output.filename = `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`;
        config.output.chunkFilename = `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`;
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      
            // config.plugins.push(
        //         // new HtmlWebpackPlugin({
        //         //     template: './public/index.html',
        //         //     inject: 'body',
        //         // }),
        //         new BundleAnalyzerPlugin({
        //             analyzerMode: 'static',
        //         }),

        //         new CompressionWebpackPlugin({
        //             filename: '[path].gz[query]',
        //             algorithm: 'gzip',
        //             test: productionGzipExtensions,
        //             threshold: 10240,
        //             deleteOriginalAssets: false,
        //             minRatio: 0.8
        //         })
        //         // {devtool: 'source-map'}
            // )
        }
    },
   
}