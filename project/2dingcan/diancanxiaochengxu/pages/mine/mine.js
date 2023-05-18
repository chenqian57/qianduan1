var app = getApp();
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    // userName: "11"
  },

  check:function(e){
    // this.setData({
      // username: e.detail.value
    // })
    // console.log(app.globalData.username);
    // console.log(this.data.username);
    if (this.data.username == "登录/注册") {
      // console.log(1);
      wx.navigateTo({
        url: '../../pages/login/login'
      });
    } else {
      // console.log(2);
      wx.navigateTo({
        url: '../../pages/message/message'
      });
    }
  },

  myAddress: function (e) {
    wx.navigateTo({
      url: "../myAddress/myAddress"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    var that = this;
    var username = app.globalData.username;
    this.setData({
      username: username
    })
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