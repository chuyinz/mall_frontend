module.exports = {
    devServer: {
        open:true,
        https:false,
        // host: "localhost", //本地服务器访问的路径
        // port: 8081, //本地服务器访问的端口
        proxy: {
            '/api': {
                target: 'http://localhost:8080',  // target host
                ws: true,  // proxy websockets
                changeOrigin: true,  // needed for virtual hosted sites
                pathRewrite: {
                    '^/api': ''  // rewrite path
                }
            },
        }
    }
}