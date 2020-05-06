//app.js
let Api = require('./http/api')
let request = require('./http/request')
let router = require('./utils/router')
let config = require('./env/index')
let env = 'Dev' // 环境
App.config = config[env] // 公共文件用的
App.version = '1.0.0' // 版本信息

App({
  config: config[env], // 视图用的
  Api,
  router,
  get: request.fetch,
  post: (url,data={},option={}) => {
    option.method = 'POST'
    return request.fetch(url,data,option)
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    userInfo: null
  }
})