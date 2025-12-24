首次创建实体类
# 实体类
使用了 MySQL、 Spring Data JPA、lombok的@DATA注释来管理

### user（用户）

* 用户登录账号为手机号登录: phone
* 密码: password (暂不设任何限制)
* 用户名: username
* 用户id: userId (自增)


### type（分类）

* 分类名称: type
* 分类id: typeId (自增)


### item（物品）

* 物品名称: item
* 物品id: itemId (自增)
* 分类id: typeId
* 描述: desc
* 价格: price
* 物品图片: itemImg
* 物品视频: itemVideo
* 物品标志: flag
* 创建时间: createTime
* 修改时间: updateTime


### 购物车

* 购物车id: cartId
* 用户id: userId
* 商品id: itemId
* 数量: num
* 创建时间: createTime
* 修改时间: updateTime

调用接口可以返回全部数据，

例如item的api接口就设计为/item
返回数据包括item的全部数据