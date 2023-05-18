Page({
 //页面的初始数据
  data: {
    confirmOrder: [],
    //地址信息
    address:"",
    // 备注信息
    remarks:"",
    //支付方式列表
    payWayList:[],
    // 购物车数据
    cartList:{},
    totalPrice: 0,
    totalNum: 0,
    // 遮罩
    maskFlag:true,
    orderlist:[]
  },
   // 生命周期函数--监听页面加载
  onLoad:function(Options){
    var that = this;
    var shop_id = wx.getStorageSync('shop_id') || [];
    var arr = wx.getStorageSync('cart') ||[];
    for(var i in arr){
      this.data.totalPrice += arr[i].quantity * arr[i].price;
      this.data.totalNum += arr[i].quantity
    }
    this.setData({
      cartList:arr,
      totalPrice: this.data.totalPrice.toFixed(2),
      totalNum: this.data.totalNum
    })
   
  },
  // 点击数字，输入框出现对应数字
  getDinnerNUM:function(e){ 
    var dinnerNum = e.currentTarget.dataset.num;
    var diner_num = this.data.diner_num;
    // 点击“输”，获取焦点，
    if (dinnerNum == 0){
      this.setData({
        diner_numF: true,
      }) 
      this.getDinerNum();
    }else{
       this.setData({
      diner_num: dinnerNum
    });
    }  
  },
  loginBtnClick:function(){
    wx.switchTab({
      url: '../../pages/order/order'
    });
  },
  //打开支付方式弹窗
  choosePayWay: function () {
    var payWayList = this.data.payWayList
    var that = this;
    var rd_session = wx.getStorageSync('rd_session') || [];
    // 调取支付方式接口    
    var payWay = [
      {
          "package":"支付宝支付",
          "money":"2000"
      },
      {
        "package": "微信支付",
        "money": "2000"
      }

    ]
    that.setData({
      payWayList:payWay
     });
  
    // 支付方式打开动画
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-in-out',
      delay: 0
    });
    that.animation = animation;
    animation.translate(0, -285).step();
    that.setData({
      animationData: that.animation.export(),
    });
    that.setData({
      maskFlag: false,
    });
  },
  // 支付方式关闭方法
  closePayWay: function () {
    var that = this
    // 支付方式关闭动画
    that.animation.translate(0,285).step();
    that.setData({
      animationData: that.animation.export()
    });
    that.setData({
      maskFlag: true
    });
  }, 
// 获取地址信息
getAddress: function (e) {
  var address = this.data.address;
  this.setData({
    address: e.detail.value
  })
},

  // 获取备注信息
  getRemark: function (e) {
    var remarks = this.data.remarks;
    this.setData({
      remarks: e.detail.value
    })
  },
  //提交订单
  submitOrder: function (e) {
    var that = this;
    var shop_id = wx.getStorageSync('shop_id') || [];
    var arr = wx.getStorageSync('cart') || [];
    var orderlist = wx.getStorageSync('orderlist') || [];

    var order = new Object();
    var key, val, total = '';
    var address = this.data.address;//地址信息
    var remarks = this.data.remarks;//备注信息
    var payId = e.currentTarget.dataset.id;
    var rd_session = wx.getStorageSync('rd_session') || [];
    var peoples =  this.data.diner_num
    order["order_id"] = new Date;
    order["catlist"] = arr;
    order["address"] = address;
    order["remarks"] = remarks;
    order["totalPrice"] = this.data.totalPrice;
    orderlist.push(order);
    var orderk = JSON.stringify(orderlist);   
    console.log(order)
          var rescode = 200         
          if (rescode == 200){
                // 支付方式关闭动画
              that.animation.translate(0, 285).step();             
              console.log(orderlist)
              wx.setStorageSync('orderlist', orderlist)
              that.setData({
                animationData: that.animation.export()
              });
              that.setData({
                maskFlag: true
              });
              wx.showToast({
                title: '下单成功！',
              })
          } else if (rescode == 400){
              // 支付方式关闭动画
              that.animation.translate(0, 285).step();
              that.setData({
                animationData: that.animation.export()
              });
              that.setData({
                maskFlag: true
              });
                wx.showToast({
                  title: res.data.message,
               })
          }
  },

  
})