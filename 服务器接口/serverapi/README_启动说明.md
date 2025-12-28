# 后端服务器启动说明

## 问题说明

如果小程序报错 `ERR_CONNECTION_REFUSED`，说明后端服务器没有运行。

## 启动步骤

### 方法一：使用启动脚本（推荐）

1. 双击运行 `启动服务器.bat` 文件
2. 等待服务器启动完成
3. 看到 "the server running on http://127.0.0.1:7001" 表示启动成功

### 方法二：手动启动

1. **打开命令行工具**（PowerShell 或 CMD）

2. **进入服务器目录**
   ```bash
   cd "F:\桌面\新建文件夹 (3)\微信小程序\2\服务器接口\serverapi"
   ```

3. **安装依赖**（首次运行需要）
   ```bash
   npm install
   ```

4. **启动服务器**
   ```bash
   node index.js
   ```
   或者使用 nodemon（自动重启）：
   ```bash
   npm run serve
   ```

5. **看到以下信息表示启动成功**
   ```
   the server running on http://127.0.0.1:7001
   ```

## 数据库配置

服务器需要连接 MySQL 数据库，请确保：

1. **MySQL 服务已启动**
2. **数据库已创建**：数据库名 `shopping_weixin`
3. **数据库配置正确**：在 `config/config.js` 中配置
   - 用户名：`root`
   - 密码：`12345`
   - 主机：`localhost`

如果数据库配置不同，请修改 `config/config.js` 文件中的 `mysqlOptions` 配置。

## 常见问题

### 1. 端口被占用
如果 7001 端口被占用，可以：
- 修改 `config/config.js` 中的 `port` 值
- 同时修改小程序 `api/api.js` 中的 `baseUrl` 端口号

### 2. 数据库连接失败
- 检查 MySQL 服务是否启动
- 检查数据库名、用户名、密码是否正确
- 检查数据库是否已创建

### 3. 依赖安装失败
- 确保已安装 Node.js（建议 v14+）
- 尝试删除 `node_modules` 文件夹后重新安装
- 使用国内镜像：`npm install --registry=https://registry.npmmirror.com`

## 停止服务器

在运行服务器的命令行窗口中按 `Ctrl + C` 停止服务器。

