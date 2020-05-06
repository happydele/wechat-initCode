/***
 * 网络请求的公共方法
 *    1.基本请求
 *    2.promise处理
 *    3.状态处理
 *    4.请求头处理
 */
let store = require('../utils/store')
let system = store.getSystemInfo()
let md5 = require('../utils/md5')

const clientInfo = {
  'model': system.model, // 设备型号
  'os': system.system, // 操作系统
  'screen': system.screenWidth + '*' + system.screenHeight, // 屏幕宽和高
  'version': App.version // 发布的版本
}

const api_key = 'rEFOUShinYWaNYbElowK' // api_key
const api_version = '1.1.0' // 接口版本号
const request_timestamp = () => { // 请求时间戳
  return Date.parse(new Date())
}
const secretKey = '9255e161e612b1bd3f0bd82b3496bfc6' // 秘钥
// 统一管理md5加密方法A-Z排序
const httpMd5 = function(params) {
  let str = ''
  const _params = JSON.parse(JSON.stringify(Object.assign(params, {
    api_key: api_key,
    api_version: api_version,
    request_timestamp: request_timestamp()
  })))
  const parasmsKeys = Object.keys(params).sort()
  parasmsKeys.forEach(item => {
    if (params[item] && params[item] !== '' && params[item] !== 'undefined') {
      str += `${item}=${params[item]}&`
    }
  })
  str += secretKey
  _params.api_sign = md5.MD5(str)
  return _params
}

module.exports = {
  fetch: (url,data={},option={}) => {
    let { loading=true, toast=true, method='GET' } = option
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
        data: data ? httpMd5(data) : {},
        method,
        header: {
          'content-type': 'application/json;charset=UTF-8',
          'clientInfo': JSON.stringify(clientInfo)
        },
        success: function(result) {
          let res = result.data
          if (res.code === 0) {
            if (loading) {
              wx.hideLoading()
            }
            resolve(res)
          } else {
            if (toast) {
              wx.showToast({
                title: res.message || res.toast || res.error || res.msg,
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