const path = require("path");

module.exports = {
    devServer: {
        port: 8080,
        proxy:{
            "/dev-api": {
                target: "http://localhost:3000",
                changeOrigin: true,
                ws: true,
                pathRewrite: {"^/dev-api" : ""}
            }
        }
    }
};