import {
  getProductByFlag
} from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图展示热卖的商品，首页推荐上新、特价数据
    flags: ['热销','新品','时令'],
    //轮播图数据，热卖商品
    bannerData:[],
    //首页推荐新品数据
    productsData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    console.log('页面加载..........');
    let  result = await getProductByFlag(this.data.flags);
    console.log('根据商品标志查询商品数据 ==>',result);
    let bannerFlag = this.data.flags[0];
    let bannerData =[];
    let productsData = [];
    result.data.result.forEach(element => {
      if(element.flag == bannerFlag){
        bannerData.push(element)
      }else{
        productsData.push(element)
      }
    });
    console.log('热卖商品数据 ==>',bannerData);
    console.log('其他商品数据 ==>',productsData);
    this.setData({
      bannerData,
      productsData
    })
  }

})
