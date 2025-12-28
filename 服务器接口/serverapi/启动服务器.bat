@echo off
chcp 65001 >nul
echo ========================================
echo 正在启动后端服务器...
echo ========================================
cd /d "%~dp0"
echo 当前目录: %CD%
echo.
echo 检查 Node.js 环境...
node --version
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js，请先安装 Node.js
    pause
    exit /b 1
)
echo.
echo 检查依赖包...
if not exist "node_modules" (
    echo 正在安装依赖包，请稍候...
    call npm install
    if %errorlevel% neq 0 (
        echo [错误] 依赖包安装失败
        pause
        exit /b 1
    )
)
echo.
echo ========================================
echo 启动服务器...
echo ========================================
echo 服务器地址: http://127.0.0.1:7001
echo 按 Ctrl+C 停止服务器
echo ========================================
echo.
node index.js
pause


