import {getDetail} from '../../api/api'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsCount: 1, // 商品选择数量
    pid:'',
    detailData:{}
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
   * 点击购物袋图标，跳转到购物车页面
   */
  goToCart() {
    // 假设购物车页面路径为 /pages/cart/cart，需提前在app.json注册
    wx.navigateTo({
      url: '/pages/cart/cart'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    console.log('options ==>',options);
    this.data.pid = options.pid;
    let data = await getDetail(this.data.pid);
    console.log('商品详情数据 data ==>', data);
    let result = data.data.result[0];
    result.descData = result.desc.trim().split('\n')
    this.setData({
      detailData: result 
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