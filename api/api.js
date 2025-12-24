//api接口访问地址
let baseUrl = '';

//获取皮肤类型
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

// 获取全部皮肤
export const getAllProduct= () =>{
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}/typeProducts`,
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

