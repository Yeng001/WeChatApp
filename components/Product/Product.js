// components/product.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    proData:{
      type: Object,
      value: {
        samallImg: '',
        flag: '标志',
        name: '商品名称',
        price: '0.00'
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 添加到购物车
    addCart() {
      const product = this.data.proData;
      // 触发自定义事件，通知父组件添加到购物车
      this.triggerEvent('addcart', { product });
      // 显示添加成功提示
      wx.showToast({
        title: '已添加到购物车',
        icon: 'success',
        duration: 1000
      });
    }
  }
})