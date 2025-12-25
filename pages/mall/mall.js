import { 
  getType,
  getProductByType,
  
} from "../../api/api";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchKey: "", // 搜索关键词
    isFilterActive: false, // 筛选按钮是否激活
    isFilterShow: false, // 筛选面板是否显示
    typeData: [], // 分类数据数组
    selectedTypeId: "", // 选中的分类编号
    productData: [], // 全部商品数据数组
    filteredProducts: [] // 筛选后的商品
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    getType().then(async result =>{
      console.log('商品类型 ==>',result);
      const allType = {
        typeId: '', // 关键：用空字符串标记“全部”类型
        type: '全部' // 筛选栏显示的文字
      };
      // 2. 把“全部”插入到原始typeData的最前面
      const newTypeData = [allType, ...result.data.result];
      // 3. 存入页面data（替换原来的typeData）
      this.setData({
        typeData: newTypeData
      });
      await this.getAllProduct();
      this.setData({
        filteredProducts: this.data.productData
      });
    })
    .catch(err =>{
      console.log('err ==>',err);
    })
  },

  // 获取全部商品
  async getAllProduct(){
    // 1. 从页面data中获取typeData数组
    const { typeData } = this.data;
    // 定义空数组，用于存储所有接口请求的结果
    let allProductList = [];
    // 2. 遍历typeData数组，逐个处理每个typeId
    for (const item of typeData) {
      // 获取当前项的typeId
      const typeId = item.typeId;
      // 调用接口（注意：若需并行请求，可改用Promise.all，这里是串行请求）
      const res = await getProductByType(typeId);
      // 3. 把当前typeId对应的商品列表（res.data.result）存入allProductList
      allProductList = allProductList.concat(res.data.result);
    }
    // 4. 把合并后的所有商品列表，设置到productData中
    console.log("所有类型的商品合并结果 ==>", allProductList);
    this.setData({
      productData: allProductList
    });
  },

// 搜索事件
// 点击搜索图标执行搜索
handleSearchClick() {
  this.filterProducts();
},

// 统一的商品筛选逻辑（整合搜索和分类筛选）
filterProducts() {
  const { productData, searchKey, selectedTypeId } = this.data;
  let result = [...productData];

  // 1. 应用分类筛选
  if (selectedTypeId) {
    result = result.filter(item => item.typeId === selectedTypeId);
  }

  // 2. 应用搜索关键词筛选
  if (searchKey.trim()) {
    const key = searchKey.trim().toLowerCase();
    result = result.filter(item => 
      item.name.toLowerCase().includes(key) ||  // 假设商品有name字段
      item.description?.toLowerCase().includes(key)  // 假设商品可能有description字段
    );
  }

  // 3. 更新筛选结果
  this.setData({
    filteredProducts: result
  });

  wx.showToast({ 
    title: `找到${result.length}件商品`, 
    icon: 'none' 
  });
},
  // 搜索输入
  handleSearchInput(e) {
    this.setData({ searchKey: e.detail.value });
    // 实时搜索（可以保留也可以去掉，根据需求决定）
  // this.filterProducts();
  },

  // 切换筛选面板显示/隐藏
  toggleFilterPanel() {
    const isShow = !this.data.isFilterShow;
    this.setData({
      isFilterShow: isShow,
      isFilterActive: isShow // 显示面板时激活按钮，隐藏时取消激活
    });
  },

  // 选择分类（返回选中的typeId）
  chooseType(e) {
    const typeId = e.currentTarget.dataset.typeid;
    this.setData({
      selectedTypeId: typeId
    });
  },

  // 重置筛选条件
  resetFilter() {
    const { productData } = this.data;
  // 1. 重置选中的类型为“全部”（selectedTypeId 设为空字符串）
  this.setData({
    selectedTypeId: '', // 对应“全部”类型的标记
    // 2. 恢复filteredProducts为原始所有商品
    filteredProducts: productData,
    // 可选：隐藏筛选面板
    isFilterShow: false,
    searchKey: '' // 清空搜索输入框内容
  });

  wx.showToast({ title: '已重置筛选条件', icon: 'success' });
  },

  // 确认筛选条件（调用getProductByType方法实现筛选）
  confirmFilter() {
    this.filterProducts();
    this.setData({
      isFilterShow: false
    });
  }
});
