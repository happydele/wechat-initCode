/**
 * 封装Storage信息存储
 */

module.exports = {
  // 设置值
  /**
   * {
   *   userInfo: {
   *     key: value
   *     ...
   *   }
   * }
   */
  setItem(key,value,module_name) {
    if (module_name) {
      let module_name_info = this.getItem(module_name)
      module_name_info[key] = value
      wx.setStorageSync(module_name, module_name_info)
    } else {
      wx.setStorageSync(key, value)
    }
  },
  // 获取值
  getItem(key,module_name) {
    if (module_name) {
      let name = this.getItem(module_name)
      if (name) {
        return name[key]
      }
      return ''
    } else {
      return wx.getStorageSync(key)
    }
  },
  // 删除值
  clearItem(key) {
    key?wx.clearStorageSync(key):wx.clearStorageSync()
  },
  // 获取设备信息
  getSystemInfo() {
    return wx.getSystemInfoSync()
  }
}