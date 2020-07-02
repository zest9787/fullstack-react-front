const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '^/api',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
            // pathRewrite: {
            //     '^/api/': '/articles'
            // },
        })
    );
};
/*
const options = {
    target: 'http://localhost:8080',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        '^/api/old-path': '/api/new-path', // rewrite path
        '^/api/remove/path': '/path' // remove base path
    },
    router: {
        'localhost:3000': 'http://192.168.50.42:8002'
    }
}*/
