/**
 * 路由跳转
 */

// 映射
const routerPath = {
  'index': 'pages/index/index'
}

module.exports = {
  // this.$router.push({ path: '/index', query: {}})
  // /index?name=张三&age=20
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
      // 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
      wx.redirectTo(obj)
    } else if (openType === 'relaunch') {
      // 关闭所有页面，打开到应用内的某个页面
      wx.reLaunch(obj)
    } else if (openType === 'back') {
      // 关闭当前页面，返回上一页面或多级页面。
      wx.navigateBack({
        delta: 1
      })
    } else {
      // 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
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