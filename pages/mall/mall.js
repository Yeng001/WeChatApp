import { 
  getType,
  getProductByType,
  getAllProduct
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
      this.setData({
        typeData: result.data.result
      })
      let data = await getAllProduct();
      console.log("全部商品 data ==>",data);
      this.setData({
        productData :data.data.result
      })
    })
    .catch(err =>{
      console.log('err ==>',err);
    })
    const defaultTypeData = [
      { type: "全部", typeId: "" },
      { type: "精选商品", typeId: "1001" },
      { type: "奢华商品", typeId: "1002" },
      { type: "尊爵商品", typeId: "1003" },
      { type: "限定商品", typeId: "1004" },
      { type: "究极商品", typeId: "1005" }
    ];

    // 初始化商品数据（示例，包含typeId属性）
    const defaultProductData = [
      { id: 1, name: "回火礼包/V25", typeId: "1001", price: 4840 },
      { id: 2, name: "千灵华绽/2.0", typeId: "1002", price: 8700 },
      { id: 3, name: "曲奇套装", typeId: "1003", price: 1695 },
      { id: 4, name: "流风回雪", typeId: "1004", price: 4350 },
      { id: 5, name: "千灵华绽/2.0 狂徒", typeId: "1005", price: 2175 },
      { id: 6, name: "超时空卫队 三棱军刺", typeId: "1004", price: 5350 }
    ];

    // 设置初始数据并初始化商品列表
    this.setData({
      typeData: defaultTypeData,
      productData: defaultProductData,
      filteredProducts: defaultProductData // 初始显示全部商品
    });
  },

  // 搜索输入
  handleSearchInput(e) {
    this.setData({ searchKey: e.detail.value });
    // 可在此处添加实时搜索逻辑（结合筛选条件）
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
    this.setData({
      selectedTypeId: "" // 重置为未选中（对应“全部”分类）
    });
  },

  // 确认筛选条件（调用getProductByType方法实现筛选）
  async confirmFilter() {
    const { selectedTypeId } = this.data;
    // 调用自定义筛选方法，传入选中的typeId，获取筛选后的商品
    // api接入
    // if (!selectedTypeId) {
    //   const filteredResult = this.data.productData;
    // }else{
    //   let filteredResult = await getProductByType(selectedTypeId);
    // }
    
    const filteredResult = this.getProductByType(selectedTypeId);
    // 更新商品列表+关闭筛选面板+取消按钮激活态
    this.setData({
      filteredProducts: filteredResult,
      isFilterShow: false,
      isFilterActive: false
    });
  },

  /**
   * 自定义方法：通过typeId匹配商品（核心筛选逻辑）
   * @param {String/Number} typeId 选中的分类编号
   * @returns {Array} 筛选后的商品数组
   */
  getProductByType(typeId) {
    const { productData } = this.data;
    // 若typeId为空（选中“全部”），直接返回所有商品
    if (!typeId) {
      return productData;
    }
    // 匹配商品的typeId与选中的typeId，返回符合条件的商品
    return productData.filter(item => {
      return item.typeId === typeId;
    });
  }
});
