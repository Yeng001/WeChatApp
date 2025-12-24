# API接口

### /type
```
{
    type：返回商品类型
    typeId：商品类型的编号
}
```

### /items

```
{
    name：返回商品名称
    price：返回商品价格
    flag：商品标志
     itemImg：商品图片
}
```

### /typeItems(根据商品类型返回商品)
```
{
    name：返回商品名称
    price：返回商品价格
    flag：商品标志
    itemImg：商品图片
}
```

### flag
flag[热卖、新品、特价]

### /flags
```
{
    flag：返回标志
}
```

### /flagItems(根据商品标志返回商品)
```
{
    name：返回商品名称
    price：返回商品价格
    flag：返回商品标志
    itemImg：商品图片
}
```

### /idItems（根据商品编号返回单个商品信息）
```
{
    name：返回商品名称
    price：返回商品价格
    flag：商品标志
    desc：商品描述
    itemVideo：商品视频
    itemImg：商品图片
}
```