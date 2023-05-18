// pages/myAddress/myAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    orderlist:{},
    listLength:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 获取购物车缓存数据
    var arr = wx.getStorageSync('orderlist') || [];
    
    this.setData({
      orderlist: arr,
      listLength:arr.length
    })
    console.log(this.data.orderlist);
      
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
    // 获取购物车缓存数据
    var arr = wx.getStorageSync('orderlist') || [];

    this.setData({
      orderlist: arr,
      listLength: arr.length
    })
    console.log(this.data.orderlist);
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