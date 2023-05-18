//logs.js
var util = require('../../utils/util.js')
var sliderWidth = 190// 需要设置slider的宽度，用于计算中间位置
// 最大行数
var max_row_height = 5;
// 行高
var food_row_height = 50;
// 底部栏偏移量
var cart_offset = 90;

Page({
  data: {
    logs: [],
    tabs: ["今日菜单", "我的订单"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sliderWidth: 0.5,
    // 左菜单
    menu_list: [],
    // 右菜单
    foodList: [],//展示菜品
    allFoodList: [],//所有获取到的菜品
    //我的订单列表
    orderList: [],
    // 购物车
    cartList: [],
    hasList: false,// 列表是否有数据
    totalPrice: 0,// 总价，初始为0
    totalNum: 0,  //总数，初始为0
    // 购物车动画
    animationData: {},
    animationMask: {},
    maskVisual: "hidden",
    maskFlag: true,
    // 左右两侧菜单的初始显示次序
    curNav: 0,

    //判断是否登录会员
    loginFlag: true,
    //判断是否已经发送验证码
    sendingF: false,
    // 倒计时时间
    second: 60,
  },

  onLoad: function (options) {
    var that = this
    // 获取购物车缓存数据
    var arr = wx.getStorageSync('cart') || [];
    // 左分类菜单
    var menu_list = this.data.menu_list;
    // 获取左侧分类菜单数据
    var category = [
      {
        "id": 0,
        "name": "全部"
      },
      {
        "id": 1,
        "name": "热菜"
      },
      {
        "id": 2,
        "name": "凉菜"
      },
      {
        "id": 3,
        "name": "荤菜"
      },
      {
        "id": 4,
        "name": "素菜"
      },
      {
        "id": 5,
        "name": "甜品"
      },
      {
        "id": 6,
        "name": "饮品"
      }
    ]
    that.setData({
      menu_list: category,
    })
    // 右菜品菜单
    var foodList = this.data.foodList;
    var allFoodList = this.data.allFoodList;
    // 购物车总量、总价
    var totalPrice = this.data.totalPrice
    var totalNum = this.data.totalNum
    // 获取右侧菜品列表数据
    var resFood = [
      {
        "id": 1,
        "name": "麻辣小龙虾",
        "thumb": "",
        "imageUrl":"../../image/1.jpg",
        "price": "98.00",
        "unit": "份",
        "catid": 3,
        "zan": 90,
        "note": "饭店A",
        "quantity": 0
      },
      {
        "id": 2,
        "name": "酸梅汤",
        "thumb": "",
        "imageUrl": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1412630950,2138419770&fm=26&gp=0.jpg",
        "price": "39.00",
        "unit": "杯",
        "catid": 6,
        "zan": 105,
        "note": "饭店B",
        "quantity": 0
      },
      {
        "id": 3,
        "name": "辣子鸡",
        "thumb": "",
        "imageUrl": "https://ae01.alicdn.com/kf/H8380aa44ed6d4d1cba4952154c98a32fF.jpg",
        "price": "68.00",
        "unit": "份",
        "catid": 3,
        "zan": 400,
        "note": "饭店C",
        "quantity": 0
      },
      {
        "id": 4,
        "name": "凉拌藕片",
        "thumb": "",
        "imageUrl": "https://ae01.alicdn.com/kf/Hedf1e632bb4949a5980ef0c95107496ap.jpg",
        "price": "40.00",
        "unit": "份",
        "catid": 2,
        "zan": 150,
        "note": "饭店A",
        "quantity": 0
      },
      {
        "id": 5,
        "name": "凉拌藕片",
        "thumb": "",
        "imageUrl": "https://ae01.alicdn.com/kf/Hedf1e632bb4949a5980ef0c95107496ap.jpg",
        "price": "37.00",
        "unit": "份",
        "catid": 2,
        "zan": 90,
        "note": "饭店C",
        "quantity": 0
      },
      {
        "id": 6,
        "name": "凉拌土豆丝",
        "thumb": "",
        "imageUrl": "https://ae01.alicdn.com/kf/He49951fa9d18427fa72ac5fa75ab710e4.jpg",
        "price": "26.00",
        "unit": "份",
        "catid": 2,
        "zan": 150,
        "note": "饭店B",
        "quantity": 0
      },
      {
        "id": 7,
        "name": "小酥肉",
        "thumb": "",
        "imageUrl": "https://ae01.alicdn.com/kf/Ha8ac927750224313969f95b424b2742b8.jpg",
        "price": "19.00",
        "unit": "份",
        "catid": 1,
        "zan": 112,
        "note": "饭店B",
        "quantity": 0
      },
      {
        "id": 8,
        "name": "香辣带鱼",
        "thumb": "",
        "imageUrl": "https://ae01.alicdn.com/kf/H0f3fdf4b86f244fba9d600825574c5baS.jpg",
        "price": "48.00",
        "unit": "份",
        "catid": 1,
        "zan":78,
        "note": "饭店A",
        "quantity": 0
      },
      {
        "id": 9,
        "name": "肘子",
        "thumb": "",
        "imageUrl": "https://ae01.alicdn.com/kf/H0bec6ec154d34892b0ef8d31a241cf1dz.jpg",
        "price": "49.80",
        "unit": "份",
        "catid": 1,
        "zan": 126,
        "note": "饭店C",
        "quantity": 0
      },
      {
        "id": 10,
        "name": "泡芙",
        "thumb": "",
        "imageUrl": "https://ae01.alicdn.com/kf/H7ccf2689cf5e44f38958ae8010599df22.jpg",
        "price": "6.00",
        "unit": "斤",
        "catid": 5,
        "zan": 80,
        "note": "饭店C",
        "quantity": 0
      },
      {
        "id": 11,
        "name": "手撕包菜",
        "thumb": "",
        "imageUrl": "https://ae01.alicdn.com/kf/Hb517ad362a5640268b73553fafd591381.jpg",
        "price": "19.00",
        "unit": "份",
        "catid": 4,
        "zan": 37,
        "note": "饭店D",
        "quantity": 0
      },
      {
        "id": 12,
        "name": "糖醋里脊",
        "thumb": "",
        "imageUrl": "https://ae01.alicdn.com/kf/H5be27c0681fe416eaa8830a3f25f07ab6.jpg",
        "price": "97.90",
        "unit": "份",
        "catid": 1,
        "zan": 56,
        "note": "饭店F",
        "quantity": 0
      },
      {
        "id": 13,
        "name": "粉蒸排骨",
        "thumb": "",
        "imageUrl": "https://ae01.alicdn.com/kf/H2dd54064664143cb83969ff3c1a52d64P.jpg",
        "price": "25.00",
        "unit": "份",
        "catid": 1,
        "zan": 80,
        "note": "饭店E",
        "quantity": 0
      },
      {
        "id": 14,
        "name": "蔬菜沙拉",
        "thumb": "",
        "imageUrl": "https://ae01.alicdn.com/kf/H7d0283f841d8492ca33b404eff80ac57v.jpg",
        "price": "125.00",
        "unit": "份",
        "catid": 4,
        "zan": 90,
        "note": "饭店E",
        "quantity": 0
      },
      {
        "id": 15,
        "name": "泡芙",
        "thumb": "",
        "imageUrl": "https://ae01.alicdn.com/kf/H45defa89bd7a40779919874d4480b0c1O.jpg",
        "price": "30.00",
        "unit": "15",
        "catid": 7,
        "zan": 65,
        "note": "饭店E",
        "quantity": 0
      },
      {
        "id": 16,
        "name": "花卷",
        "thumb": "/uploads/20178/201708311002557FPpnEyE.jpg",
        "imageUrl": "https://ae01.alicdn.com/kf/H4253b24f530a43169ace616b0130bb39w.jpg",
        "price": "19.90",
        "unit": "份",
        "catid": 5,
        "zan": 94,
        "note": "",
        "quantity": 0
      },
      {
        "id": 17,
        "name": "菜花汤",
        "thumb": "/uploads/20178/20170831165625IyWlwdFM.jpg",
        "imageUrl": "https://ae01.alicdn.com/kf/Heda479e3992742e49bd3f0895849b9edU.jpg",
        "price": "33.00",
        "unit": "份",
        "catid": 6,
        "zan": 92,
        "note": "饭店D",
        "quantity": 0
      },
      {
        "id": 18,
        "name": "小米粥",
        "thumb": "/uploads/20178/20170831165711bLN478bK.jpg",
        "imageUrl": "https://ae01.alicdn.com/kf/H713c5eace3184c5ba822758c9dfee5d3Y.jpg",
        "price": "18.00",
        "unit": "份",
        "catid": 6,
        "zan": 49,
        "note": "饭店E",
        "quantity": 0
      },
      {
        "id": 19,
        "name": "莲子粥",
        "thumb": "",
        "imageUrl": "https://ae01.alicdn.com/kf/H45f9304d714b42fc99916dafa78ea8e1v.jpg",
        "price": "32.00",
        "unit": "扎",
        "catid": 6,
        "zan": 50,
        "note": "饭店E",
        "quantity": 0
      },
      {
        "id": 20,
        "name": "土豆丝",
        "thumb": "",
        "imageUrl": "../../image/3.jpg",
        "price": "15.00",
        "unit": "份",
        "catid": 4,
        "zan": 82,
        "note": "饭店D",
        "quantity": 0
      },
      {
        "id": 21,
        "name": "清炖鸡",
        "thumb": "",
        "imageUrl": "https://ae01.alicdn.com/kf/H830c3b5e9f984866920390a6fe861b29y.jpg",
        "price": "88.00",
        "unit": "份",
        "catid": 1,
        "zan": 203,
        "note": "饭店C",
        "quantity": 0
      }
    ]

    // 进入页面后判断购物车是否有数据，如果有，将菜单与购物车quantity数据统一
    if (arr.length > 0) {
      for (var i in arr) {
        for (var j in resFood) {
          if (resFood[j].id == arr[i].id) {
            resFood[j].quantity = arr[i].quantity;
          }
        }
      }
    }
    // 进入页面计算购物车总价、总数
    if (arr.length > 0) {
      for (var i in arr) {
        totalPrice += arr[i].price * arr[i].quantity;
        totalNum += Number(arr[i].quantity);
      }
    }
    // 赋值数据
    this.setData({
      hasList: true,
      cartList: arr,
      foodList: resFood,
      allFoodList: resFood,
      payFlag: this.data.payFlag,
      totalPrice: totalPrice.toFixed(2),
      totalNum: totalNum
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - res.windowWidth / 2) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
        });
      }
    });
  },
  // 点击切换tab
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  // 点击切换右侧数据
  changeRightMenu: function (e) {
    var classify = e.target.dataset.id;// 获取点击项的id
    var foodList = this.data.foodList;
    var allFoodList = this.data.allFoodList;
    var newFoodList = [];
    if (classify == 0) {//选择了全部选项
      this.setData({
        curNav: classify,
        foodList: allFoodList
      })
    } else { //选择了其他选项
      for (var i in allFoodList) {
        if (allFoodList[i].catid == classify) {
          newFoodList.push(allFoodList[i])
        }
      }
      this.setData({
        // 右侧菜单当前显示第curNav项
        curNav: classify,
        foodList: newFoodList
      })
    }
  },
  // 购物车增加数量
  addCount: function (e) {
    var id = e.currentTarget.dataset.id;
    var arr = wx.getStorageSync('cart') || [];
    var f = false;
    for (var i in this.data.foodList) {// 遍历菜单找到被点击的菜品，数量加1
      if (this.data.foodList[i].id == id) {
        this.data.foodList[i].quantity += 1;
        if (arr.length > 0) {
          for (var j in arr) {// 遍历购物车找到被点击的菜品，数量加1
            if (arr[j].id == id) {
              arr[j].quantity += 1;
              f = true;
              try {
                wx.setStorageSync('cart', arr)
              } catch (e) {
                console.log(e)
              }
              break;
            }
          }
          if (!f) {
            arr.push(this.data.foodList[i]);
          }
        } else {
          arr.push(this.data.foodList[i]);
        }
        try {
          wx.setStorageSync('cart', arr)
        } catch (e) {
          console.log(e)
        }
        break;
      }
    }

    this.setData({
      cartList: arr,
      foodList: this.data.foodList
    })
    this.getTotalPrice();
  },
  // 定义根据id删除数组的方法
  removeByValue: function (array, val) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id == val) {
        array.splice(i, 1);
        break;
      }
    }
  },
  // 购物车减少数量
  minusCount: function (e) {
    var id = e.currentTarget.dataset.id;
    var arr = wx.getStorageSync('cart') || [];
    for (var i in this.data.foodList) {
      if (this.data.foodList[i].id == id) {
        this.data.foodList[i].quantity -= 1;
        if (this.data.foodList[i].quantity <= 0) {
          this.data.foodList[i].quantity = 0;
        }
        if (arr.length > 0) {
          for (var j in arr) {
            if (arr[j].id == id) {
              arr[j].quantity -= 1;
              if (arr[j].quantity <= 0) {
                this.removeByValue(arr, id)
              }
              if (arr.length <= 0) {
                this.setData({
                  foodList: this.data.foodList,
                  cartList: [],
                  totalNum: 0,
                  totalPrice: 0,
                })
                this.cascadeDismiss()
              }
              try {
                wx.setStorageSync('cart', arr)
              } catch (e) {
                console.log(e)
              }
            }
          }
        }
      }
    }
    this.setData({
      cartList: arr,
      foodList: this.data.foodList
    })
    this.getTotalPrice();
  },
  // 获取购物车总价、总数
  getTotalPrice: function () {
    var cartList = this.data.cartList;                  // 获取购物车列表
    var totalP = 0;
    var totalN = 0
    
    for (var i in cartList) {                           // 循环列表得到每个数据
      totalP += cartList[i].quantity * cartList[i].price;    // 所有价格加起来     
      totalN += cartList[i].quantity
    }
    this.setData({                                      // 最后赋值到data中渲染到页面
      cartList: cartList,
      totalNum: totalN,
      totalPrice: totalP.toFixed(2)
    });
  },
  // 清空购物车
  cleanList: function (e) {
    for (var i in this.data.foodList) {
      this.data.foodList[i].quantity = 0;
    }
    try {
      wx.setStorageSync('cart', "")
    } catch (e) {
      console.log(e)
    }
    this.setData({
      foodList: this.data.foodList,
      cartList: [],
      cartFlag: false,
      totalNum: 0,
      totalPrice: 0,
    })
    this.cascadeDismiss()
  },

  //删除购物车单项
  deleteOne: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var arr = wx.getStorageSync('cart')
    for (var i in this.data.foodList) {
      if (this.data.foodList[i].id == id) {
        this.data.foodList[i].quantity = 0;
      }
    }
    arr.splice(index, 1);
    if (arr.length <= 0) {
      this.setData({
        foodList: this.data.foodList,
        cartList: [],
        cartFlag: false,
        totalNum: 0,
        totalPrice: 0,
      })
      this.cascadeDismiss()
    }
    try {
      wx.setStorageSync('cart', arr)
    } catch (e) {
      console.log(e)
    }


    this.setData({
      cartList: arr,
      foodList: this.data.foodList
    })
    this.getTotalPrice()
  },
  //切换购物车开与关
  cascadeToggle: function () {
    var that = this;
    var arr = this.data.cartList
    if (arr.length > 0) {
      if (that.data.maskVisual == "hidden") {
        that.cascadePopup()
      } else {
        that.cascadeDismiss()
      }
    } else {
      that.cascadeDismiss()
    }

  },
  // 打开购物车方法
  cascadePopup: function () {
    var that = this;
    // 购物车打开动画
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
    // 遮罩渐变动画
    var animationMask = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
    });
    that.animationMask = animationMask;
    animationMask.opacity(0.8).step();
    that.setData({
      animationMask: that.animationMask.export(),
      maskVisual: "show",
      maskFlag: false,
    });
  },
  // 关闭购物车方法
  cascadeDismiss: function () {
    var that = this
    // 购物车关闭动画
    that.animation.translate(0,285).step();
    that.setData({
      animationData: that.animation.export()
    });
    // 遮罩渐变动画
    that.animationMask.opacity(0).step();
    that.setData({
      animationMask: that.animationMask.export(),
    });
    // 隐藏遮罩层
    that.setData({
      maskVisual: "hidden",
      maskFlag: true
    });
  },
  // 跳转确认订单页面
  gotoOrder: function () {
    wx.navigateTo({
      url: '../confirmOrder/confirmOrder'
    })
  },

  GetQueryString:function (name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  }

})
