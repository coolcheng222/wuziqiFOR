module.exports = {
  publicPath: '/ziqi',
  devServer: {

    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: '8083',
    https: false,   //是否使用https协议y

    hotOnly: false, //是否开启热更新
    proxy: {
      '/api': {
        // target: 'http://localhost:8080/server_war', //API服务器的地址
        target: 'http://45.32.89.193:8082/', //API服务器的地址
        ws: false,  //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api': ''
        }
      },
      '/socket':{
        target:'ws://45.32.89.193:8081/game',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/socket':''
        }
      }
    }
  },
}