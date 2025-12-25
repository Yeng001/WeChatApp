import{
  removeShopbagData,
  updateShopbagCount,
  getShopbagData
}from '../../api/api'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isEdit: false,
    token: '',
    shopList:[],
    isAllChecked: false,
    totalPrice: 0.00 // 合计金额
  },

  /**
   * 单个商品复选框变化
   */
  handleCheck(e) {
    const id = e.currentTarget.dataset.id;
    const { cartList } = this.data;
    // 更新商品选中状态
    const newCartList = cartList.map(item => {
      if (item.id === id) {
        item.checked = e.detail.value[0] === "true";
      }
      return item;
    });
    this.setData({ cartList: newCartList }, () => {
      this.calcTotalPrice(); // 重新计算合计
    });
  },

  /**
   * 全选复选框变化
   */
  handleAllCheck(e) {
    const isAllChecked = e.detail.value[0] === "true";
    const { cartList } = this.data;
    // 全选/全不选
    const newCartList = cartList.map(item => {
      item.checked = isAllChecked;
      return item;
    });
    this.setData({ cartList: newCartList }, () => {
      this.calcTotalPrice(); // 重新计算合计
    });
  },

  /**
   * 商品数量变化
   */
  handleCountChange(e) {
    const id = e.currentTarget.dataset.id;
    const newCount = e.detail.count;
    const { cartList } = this.data;
    // 更新商品数量
    const newCartList = cartList.map(item => {
      if (item.id === id) {
        item.count = newCount;
      }
      return item;
    });
    this.setData({ cartList: newCartList }, () => {
      // 若商品已选中，重新计算合计
      if (cartList.find(item => item.id === id)?.checked) {
        this.calcTotalPrice();
      }
    });
  },

  /**
   * 计算合计金额
   */
  calcTotalPrice() {
    const { cartList } = this.data;
    const total = cartList.reduce((sum, item) => {
      if (item.checked) {
        sum += item.price * item.count;
      }
      return sum;
    }, 0);
    this.setData({ totalPrice: total });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.data.token = wx.getStorageSync('token34');
    let data = await getShopbagData(this.data.token);
    console.log('获取购物车数据 data ==> ', data);
    if(data.data.code == 700){
      return wx.navigateTo({
        url: '../login/login',
      })
    }
    // 为每一个商品添加一个单选的属性
    data.data.result.forEach(item =>{
      item.isChecked = false
    })
    this.setData({
      shopList: data.data.result
    })
  },

  // 编辑
  edit(){
    this.setData({
      isEdit: !this.data.isEdit
    })
  },
  
  // 全选
  allChecked(){
    this.setData({
      isAllChecked: !this.data.isAllChecked
    })
    this.data.shopList.forEach(item =>{
      item.isChecked = this.data.isAllChecked
    })

    this.setData({
      shopList: this.data.shopList
    })
  },

  // 单选
  oneChecked(e){
    let index = e.currentTarget.dataset.index;
    console.log('index ==> ', index);
    this.data.shopList[index].isChecked = !this.data.shopList[index].isChecked;
    this.setData({
      shopList: this.data.shopList
    })
    for (let i =0; i< this.data.shopList.length; i++){
      if(!this.data.shopList[i].isChecked){
        this.setData({
          isAllChecked: false
        })
        return
      }
    }
    this.setData({
      isAllChecked: true
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.calcTotalPrice(); // 页面显示时计算合计
  }
});

