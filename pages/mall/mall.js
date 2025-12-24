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
    selectedType: "", // 选中的分类值
    productData: [], // 商品数据数组
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
      let typeId = this.data.typeData[this.data.selectedTypeIndex].typeId;
      console.log('选中的商品类型id==>',typeId);
      let data = await getProductByType(typeId)
      console.log("选中的商品类型的商品 data ==>",data);
      this.setData({
        filteredProducts :data.data.result
      })
    })
    .catch(err =>{
      console.log('err ==>',err);
    })
    // 初始化分类数据（示例，可根据实际需求修改）
    const defaultTypeData = [
      { name: "全部", value: "" },
      { name: "精选商品", value: "select" },
      { name: "奢华商品", value: "luxury" },
      { name: "尊爵商品", value: "honor" },
      { name: "限定商品", value: "limit" },
      { name: "究极商品", value: "ultimate" }
    ];

    // 初始化商品数据（示例，flag对应原稀有度）
    const defaultProductData = [
      { id: 1, name: "回火礼包/V25", flag: "select", price: 4840 },
      { id: 2, name: "千灵华绽/2.0", flag: "luxury", price: 8700 },
      { id: 3, name: "曲奇套装", flag: "honor", price: 1695 },
      { id: 4, name: "流风回雪", flag: "limit", price: 4350 },
      { id: 5, name: "千灵华绽/2.0 狂徒", flag: "ultimate", price: 2175 },
      { id: 6, name: "超时空卫队 三棱军刺", flag: "limit", price: 5350 }
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

  // 选择分类（基于typeData）
  chooseType(e) {
    const typeValue = e.currentTarget.dataset.type;
    this.setData({
      selectedType: typeValue
    });
  },

  // 重置筛选条件
  resetFilter() {
    this.setData({
      selectedType: "" // 重置为未选中（对应“全部”）
    });
  },

  // 确认筛选条件
  confirmFilter() {
    const { productData, selectedType } = this.data;
    // 筛选逻辑：根据选中的分类（selectedType）匹配商品的flag
    const filtered = productData.filter(item => {
      // 若未选中分类（全部），直接返回true；否则匹配flag与选中分类
      if (!selectedType) return true;
      return item.flag === selectedType;
    });

    // 更新商品列表+关闭筛选面板+取消按钮激活态
    this.setData({
      filteredProducts: filtered,
      isFilterShow: false,
      isFilterActive: false
    });
  }
});