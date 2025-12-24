# API接口

### /type
```
{
    type：返回商品类型
    typeId：商品类型的编号
}
```

### /products

```
{
    name：返回商品名称
    price：返回商品价格
    flag：商品标志[]
}
```

### /typeProducts(根据商品类型返回商品)
```
{
    name：返回商品名称
    price：返回商品价格
    flag：商品标志
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

### /flagProducts(根据商品标志返回商品)
```
{
    name：返回商品名称
    price：返回商品价格
    flag：返回商品标志
}
```