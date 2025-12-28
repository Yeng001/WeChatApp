Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 初始数量（支持外部传入，默认1）
    count: {
      type: Number,
      value: 1,
      observer: function(newVal) {
        // 当外部传入的count变化时，同步到内部data
        this.setData({
          currentCount: newVal || 1
        });
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentCount: 1  // 内部管理的数量状态
  },

  /**
   * 组件生命周期
   */
  attached() {
    // 组件挂载时，初始化数量
    this.setData({
      currentCount: this.properties.count || 1
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 减数量
    handleReduce() {
      let currentCount = this.data.currentCount;
      if (currentCount <= 1) {
        // 数量最小为1，不允许继续减少
        return;
      }
      currentCount--;
      // 更新内部状态并向父页面传递最新数量
      this.setData({ currentCount: currentCount });
      this.triggerEvent("countChange", { count: currentCount });
    },

    // 加数量
    handleAdd() {
      let currentCount = this.data.currentCount;
      currentCount++;
      // 更新内部状态并向父页面传递最新数量
      this.setData({ currentCount: currentCount });
      this.triggerEvent("countChange", { count: currentCount });
    }
  }
});