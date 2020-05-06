/**
 * 路由跳转
 * 使用：router.push('index',{query:{}, openType: ''})
 */

// 映射
const routerPath = {
  'index': '/pages/index/index' // 注意路径
}

module.exports = {
  push(path,option={}) {
    if (typeof path === 'string') {
      option.path = path
    } else {
      option = path
    }
    // 获取url
    let url = routerPath[option.path]
    // openType跳转类型
    let { query={}, openType } = option
    let params = this.parse(query)
    if (params) {
      url += '?' + params
    }
    this.to(openType,url)
  },
  
  to(openType,url) {
    let obj = { url }
    if (openType === 'redirect') {
      // 关闭当前页面,不能返回。跳转到某个页面--小房子
      wx.redirectTo(obj)
    } else if (openType === 'relaunch') {
      // 关闭所有页面，打开到某个页面--小房子
      wx.reLaunch(obj)
    } else if (openType === 'back') {
      // 关闭当前页面，返回上一页面或多级页面。
      wx.navigateBack({
        delta: 1
      })
    } else if (openType === 'tabbar') {
      // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
      wx.switchTab(obj)
    } else {
      // 保留当前页面，跳转到某个页面--可返回
      wx.navigateTo(obj)
    }
  },

  parse(data) {
    let arr = []
    for (let key in data) {
      arr.push(key + '=' + data[key])
    }
    return arr.join('&')
  }
}