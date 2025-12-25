//api接口访问地址
let baseUrl = 'http://127.0.0.1:7001';

//获取商品类型
export const getType = () => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: `${baseUrl}/type`,
      method: 'GET',
      success: result =>{
        resolve(result)
      },
      fail: err =>{
        reject(err)
      }
    })
  })
}

// 根据商品类型获取商品
export const getProductByType= typeId =>{
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}/typeProducts`,
      method: 'GET',
      data: {
        typeId
      },
      success: result => {
        resolve(result)
      },
      fail: err =>{
        reject(err)
      }
    })
  }
  ) 
}

//根据指定商品标志查询商品数据
export const getProductByFlag = flags =>{
  return new Promise((resolve,reject) =>{
    wx.request({
      url: `${baseUrl}/flagProducts`,
      method: 'GET',
      data: {
       flags
      },
      success: result => {
        resolve(result)
      },
      fail: err =>{
        reject(err)
      }
    })
  })
}

// 查看商品详情数据
export const getDetail = pid => {
  return new Promise((resolve,reject) =>{
    wx.request({
      url: `${baseUrl}/productDetail`,
      method: 'GET',
      data: {
       pid
      },
      success: result => {
        resolve(result)
      },
      fail: err =>{
        reject(err)
      }
    })
  })
}

// 查询指定收藏商品
export const getLikeByPid = params => {
  return new Promise((resolve,reject) =>{
    wx.request({
      url: `${baseUrl}/findlike`,
      method: 'GET',
      data: {
       pid: params.pid,
       token: params.token
      },
      success: result => {
        resolve(result)
      },
      fail: err =>{
        reject(err)
      }
    })
  })
}

// 收藏商品
export const like = params => {
  return new Promise((resolve,reject) =>{
    wx.request({
      url: `${baseUrl}/like`,
      method: 'POST',
      data: {
       pid: params.pid,
       token: params.token
      },
      success: result => {
        resolve(result)
      },
      fail: err =>{
        reject(err)
      }
    })
  })
}

// 取消收藏
export const cancelLike = params => {
  return new Promise((resolve,reject) =>{
    wx.request({
      url: `${baseUrl}/notlike`,
      method: 'POST',
      data: {
       pid: params.pid,
       token: params.token
      },
      success: result => {
        resolve(result)
      },
      fail: err =>{
        reject(err)
      }
    })
  })
}

//查询购物车商品数量
export const getShopbagCount = token => {
  return new Promise((resolve,reject) =>{
    wx.request({
      url: `${baseUrl}/shopcartCount`,
      method: 'GET',
      data: {
       token: token
      },
      success: result => {
        resolve(result)
      },
      fail: err =>{
        reject(err)
      }
    })
  })
}

//加入购物袋
export const addShopbag = params =>{
  return new Promise((resolve,reject) =>{
    wx.request({
      url: `${baseUrl}/addShopcart`,
      method: 'POST',
      data: {
        pid: params.pid,
        token: params.token,
        count: params.count
      },
      success: result => {
        resolve(result)
      },
      fail: err =>{
        reject(err)
      }
    })
  })
}