Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 初始数量（支持外部传入，默认1）
    count: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 减数量
    handleReduce() {
      let currentCount = this.properties.count;
      if (currentCount <= 1) {
        // 数量最小为1，不允许继续减少
        return;
      }
      currentCount--;
      // 更新属性并向父页面传递最新数量
      this.setData({ count: currentCount });
      this.triggerEvent("countChange", { count: currentCount });
    },

    // 加数量
    handleAdd() {
      let currentCount = this.properties.count;
      currentCount++;
      // 更新属性并向父页面传递最新数量
      this.setData({ count: currentCount });
      this.triggerEvent("countChange", { count: currentCount });
    }
  }
});