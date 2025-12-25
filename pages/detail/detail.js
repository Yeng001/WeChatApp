import {
  getDetail,
  getLikeByPid,
  like,
  cancelLike,
  getShopbagCount,
  addShopbag
} from '../../api/api'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    count: 1, // 商品选择数量
    pid:'',
    detailData:{},
    isLike:false,
    token:' ',
    shopbagCount:0
  },

  /**
   * 监听Stepper组件数量变化
   */
  handleCountChange(e) {
    const newCount = e.detail.count;
    this.setData({
      goodsCount: newCount
    });
  },

  /**
   * 收藏按钮点击事件
   */
  handleCollect() {
    wx.showToast({
      title: '已切换收藏状态',
      icon: 'none'
    });
  },

  /**
   * 加入购物袋按钮点击事件
   */
  handleAddCart() {
    wx.showToast({
      title: '已加入购物袋',
      icon: 'success'
    });
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.data.token = wx.getStorageSync('token34')
    console.log('options ==>',options);
    this.data.pid = options.pid;
    let data = await getDetail(this.data.pid);
    console.log('商品详情数据 data ==>', data);
    let result = data.data.result[0];
    result.descData = result.desc.trim().split('\n')
    this.setData({
      detailData: result 
    })
    // 查询指定收藏商品
    let params = {
      pid: this.data.pid,
      token: this.data.token
    };
    let likeResult = await getLikeByPid(params);
    console.log('查询指定收藏商品 likeResult ==>', likeResult);
    if(likeResult.data.code == 1000 && likeResult.data.result.length > 0){
      this.setData({
        isLike: true
      })
    }

    //查询购物袋商品数量
    let shopbagCountResult = await getShopbagCount(this.data.token);
    console.log('查询购物袋商品数量 shopbagCountResult ==> ', shopbagCountResult);
    if(likeResult.data.code == 4000 && shopbagCountResult.data.result != null){
      this.setData
      ({
        shopbagCount: shopbagCountResult.data.result
      })
    }
  },

  //加入购物袋
  async addShopbagData(){
    let params ={
      pid:this.data.pid,
      token: this.data.token,
      count: this.data.count
    };
    let data = await addShopbag(params);
    if(data.data.code == 700){
      return wx.navigateTo({
        url: '../login/login',
      })
    }
    if(data.data.code == 3000){
      wx.showToast({
        title: '加入购物车成功',
        icon: 'none',
        mask: true
      })
      this.setData({
        shopbagCount: this.data.shopbagCount + this.data.count
      })
    }
  },

  //跳转到购物袋页面
  goShopbag(){
    wx.switchTab({
      url: '../shopCart/shopCart'
    })
  },

  // 收藏或取消收藏
  async likeProduct(){
    let data = null;
    let params ={
      pid:this.data.pid,
      token: this.data.token
    };
    if(this.data.isLike){
      //发起取消收藏请求
      data = await cancelLike(params);
    }else{
      //发起收藏请求
      data = await like(params);
    }
    console.log('收藏   或者  取消收藏 data ==> ', data);
    if(data.data.code == 700){
      return wx.navigateTo({
        url: '../login/login'
      })
    }
    this.setData({
      isLike: !this.data.isLike
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
});