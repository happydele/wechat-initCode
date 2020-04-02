/***
 * 网络请求的公共方法
 *    1.基本请求
 *    2.promise处理
 *    3.状态处理
 *    4.请求头处理
 */
let store = require('../utils/store')
let system = store.getSystemInfo()

const clientInfo = {
  'clientType': 'mp',
  'appName': 'secmind', // App名称
  'model': system.model, // 设备型号
  'os': system.system, // 操作系统
  'screen': system.screenWidth + '*' + system.screenHeight, // 屏幕宽和高
  'version': App.version, // 发布的版本
  'chennel': 'miniProgram'
}

module.exports = {
  fetch: (url,data={},option={}) => {
    let { loading=true, toast=true, method='get' } = option
    return new Promise((resolve, reject) => {
      if (loading) {
        wx.showLoading({
          title: '加载中...',
          mask: true
        })
      }
      let env = App.config.BASEAPI // 公共域名
      wx.request({
        url: env + url,
        data,
        method,
        header: {
          'content-type': 'application/json',
          'clientInfo': JSON.stringify(clientInfo)
        },
        success: function(result) {
          let res = result.data
          if (res.code === 0) {
            if (loading) {
              wx.hideLoading()
            }
            resolve(res.data)
          } else {
            if (toast) {
              wx.showToast({
                title: res.message,
                mask: true,
                icon: 'none'
              })
            } else {
              wx.hideLoading()
            }
          }
        },
        fail: function({e = { code: -1,msg: errMsg,errMeg }}) {
          let msg = e.errMsg
          if (msg === 'request:fail timeout') {
            msg = '请求超时，请稍后处理'
          }
          wx.showToast({
            title: msg,
            icon: 'none'
          })
          reject(e)
        }
      })
    })
  }
}