const webpack = require('webpack')

module.exports = {
	lintOnSave: false,
	devServer: {
		port: 8080,
		// If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
		// proxy: {
		//   '/': {
		//     target: 'https://school.fengniaotuangou.cn',
		//     ws: true,
		//     changeOrigin: true
		//   }
		// }
	},
	configureWebpack: config => {
		config.entry.app = ["babel-polyfill", "./src/main.js"]
	},
}
