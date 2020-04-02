// 欢迎页-pages/welcome/welcome.js
const app = getApp()
let store = require('../../utils/store')
let router = require('../../utils/router')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userId: store.getItem('userId'), // 用户Id
    canIUse: wx.canIUse('button.open-type.getUserInfo') //判断小程序的API，回调，参数，组件等是否在当前版本可用。
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断用户是否登录
    if (!this.data.userId) {
      // 未授权
      this.getSession()
    } else {
      // 已授权-跳转到首页
      router.push({ path: 'index', query: {}, openType: 'relaunch'})
    }
  },
  getSession() {
    wx.login({
      success: res => {
        if (res.code) {
          // 发送请求-换取openId
          // app.get(app.Api.getSession,{ code: res.code }).then(result => {
          //   console.log(result)
          //   store.setItem('openId', result.openId)
          // }).catch(err => {
          //   console.log(err)
          // })
        }
      }
    })
  },
  // 获取用户信息
  getUserInfo(e) {
    // console.log(e.detail)
    let userInfo = e.detail.userInfo
    // userInfo.openId = store.getItem('openId')
    // 发送请求-登录
    // app.get(app.Api.login,{
    //   userInfo
    // }).then(res => {
    //   store.setItem('userId', res.userId)
    //   this.setData({
    //     userId: res.userId
    //   })
    //   // 授权成功-跳转到首页
    //   router.push({ path: 'index', query: {}, openType: 'relaunch'})
    // }).catch(err => {
    //   console.log(err)
    // })

    // 待删除
    app.globalData.userInfo = userInfo
    // 跳转到首页
    wx.switchTab({
      url: '../index/index'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})