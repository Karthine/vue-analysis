const path = require('path')

function resolve (dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	publicPath:process.env.NODE_ENV == 'production' ? process.env.VUE_APP_STATIC_PATH:'/', //部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
	outputDir: 'target',// 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
	assetsDir: 'static',//放置生成的静态资源(js、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
	indexPath: 'index.html',//指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
	productionSourceMap: false, //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
	lintOnSave:false,

	devServer:{
		host: '0.0.0.0',
		port: 8084,
		https: false,
		hotOnly: false,
		open:true,
	},

	// webpack-chain这个库提供了一个 webpack 原始配置的上层抽象，使其可以定义具名的 loader 规则和具名插件，
	// 并有机会在后期进入这些规则并对它们的选项进行修改。
	chainWebpack:config => {
		config.resolve.alias
			.set('@$', resolve('src'))
			.set('vue$', 'vue/dist/vue.js')

	},
}
