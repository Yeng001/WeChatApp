//api接口访问地址
let baseUrl = '';

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

// 获取全部商品
export const getAllProduct= () =>{
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}/items`,
      method: 'GET',
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

// 根据皮肤类型获取皮肤
export const getProductByType= typeId =>{
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}/typeItems`,
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

