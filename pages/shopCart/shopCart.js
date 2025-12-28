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
    const index = e.currentTarget.dataset.index;
    const { shopList } = this.data;
    // 更新商品选中状态
    const newShopList = [...shopList];
    newShopList[index].isChecked = !newShopList[index].isChecked;
    this.setData({ shopList: newShopList }, () => {
      this.calcTotalPrice(); // 重新计算合计
    });
  },

  /**
   * 全选复选框变化
   */
  handleAllCheck(e) {
    const isAllChecked = e.detail.value[0] === "true";
    const { shopList } = this.data;
    // 全选/全不选
    const newShopList = shopList.map(item => ({
      ...item,
      isChecked: isAllChecked
    }));
    this.setData({ shopList: newShopList }, () => {
      this.calcTotalPrice(); // 重新计算合计
    });
  },

  /**
   * 商品数量变化
   */
  async handleCountChange(e) {
    const index = e.currentTarget.dataset.index;
    const newCount = e.detail.count;
    const { shopList, token } = this.data;
    const item = shopList[index];
    
    try {
      // 调用API更新服务器上的商品数量
      const result = await updateShopbagCount({
        sid: item.sid,
        token: token,
        count: newCount
      });
      
      console.log('更新商品数量结果 ==> ', result);
      
      // 只有API调用成功后，才更新本地数据
      if (result.data.code === 6000) {
        const newShopList = [...shopList];
        newShopList[index].count = newCount;
        this.setData({ shopList: newShopList }, () => {
          // 若商品已选中，重新计算合计
          if (item.isChecked) {
            this.calcTotalPrice();
          }
        });
      } else {
        wx.showToast({ title: '更新数量失败', icon: 'none' });
        // 恢复原数量
        this.setData({
          [`shopList[${index}].count`]: item.count
        });
      }
    } catch (error) {
      console.error('更新商品数量失败：', error);
      wx.showToast({ title: '更新数量失败', icon: 'none' });
      // 恢复原数量
      this.setData({
        [`shopList[${index}].count`]: item.count
      });
    }
  },

  /**
   * 计算合计金额
   */
  calcTotalPrice() {
    const { shopList } = this.data;
    const total = shopList.reduce((sum, item) => {
      if (item.isChecked) {
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
    // 为每一个商品添加一个单选的属性，并确保count字段有值
    if (data.data.result && Array.isArray(data.data.result)) {
      data.data.result.forEach(item => {
        item.isChecked = false;
        // 确保count字段存在且有有效值
        if (item.count === undefined || item.count === null || item.count < 1) {
          item.count = 1;
        }
      });
    }
    this.setData({
      shopList: data.data.result || []
    }, () => {
      this.calcTotalPrice(); // 初始化时计算合计
    });
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

  // 删除选择的商品
  deleteSelected() {
    // 获取选中的商品
    const selectedItems = this.data.shopList.filter(item => item.isChecked);
    if (selectedItems.length === 0) {
      return wx.showToast({ title: '请选择要删除的商品', icon: 'none' });
    }
    // 准备删除的sids
    const sids = selectedItems.map(item => item.sid);
    // 调用API删除
    wx.request({
      url: 'http://127.0.0.1:7001/deleteShopcart',
      method: 'POST',
      data: {
        sids: JSON.stringify(sids),
        token: this.data.token
      },
      success: result => {
        console.log('删除商品结果 ==> ', result);
        if (result.data.code === 7000) {
          wx.showToast({ title: '删除成功' });
          // 重新获取购物车数据
          this.onShow();
        } else {
          wx.showToast({ title: '删除失败', icon: 'none' });
        }
      },
      fail: err => {
        console.error('删除商品失败：', err);
        wx.showToast({ title: '删除失败', icon: 'none' });
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    // 页面显示时重新获取购物车数据
    this.data.token = wx.getStorageSync('token34');
    if (this.data.token) {
      try {
        let data = await getShopbagData(this.data.token);
        console.log('页面显示时获取购物车数据 ==> ', data);
        if(data.data.code == 700){
          return wx.navigateTo({ url: '../login/login' });
        }
        // 为每一个商品添加选中属性，并确保count字段有值
        if (data.data.result && Array.isArray(data.data.result)) {
          data.data.result.forEach(item => {
            item.isChecked = false;
            // 确保count字段存在且有有效值
            if (item.count === undefined || item.count === null || item.count < 1) {
              item.count = 1;
            }
          });
        }
        this.setData({
          shopList: data.data.result || []
        }, () => {
          this.calcTotalPrice(); // 计算合计
        });
      } catch (error) {
        console.error('获取购物车数据失败：', error);
      }
    }
  }
});

