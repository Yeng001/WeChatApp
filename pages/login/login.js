import { userLogin } from '../../api/api'

Page({
    data: {
        showPassword: false,
        phone: '',
        password: ''
    },

    onPhoneInput(e) {
        this.setData({ phone: e.detail.value });
    },

    onPasswordInput(e) {
        this.setData({ password: e.detail.value });
    },

    togglePasswordStatus() {
        this.setData({ showPassword: !this.data.showPassword });
    },

    async login() {
        // 手机号/密码校验
        let phoneReg = /^1[3-9]\d{9}$/;
        if (!phoneReg.test(this.data.phone)) {
            wx.showToast({ title: '手机号格式错误', icon: 'none', mask: true });
            return;
        }
        let passwordReg = /^[A-Za-z][A-Za-z0-9]{5,15}$/;
        if (!passwordReg.test(this.data.password)) {
            wx.showToast({ title: '密码格式错误', icon: 'none', mask: true });
            return;
        }

        // 登录请求
        let params = { phone: this.data.phone, password: this.data.password };
        try {
            let data = await userLogin(params);
            console.log('登录 data ==> ', data);
            
            if (data.data.code == 200) {
                // 核心修复：同时存储 token + 用户信息（必须和my页面读取的key一致）
                wx.setStorageSync('token34', data.data.token);
                // 假设后端返回的用户信息在 data.data.userInfo，需和后端字段匹配
                wx.setStorageSync('userInfo', data.data.userInfo || { 
                    nickname: '用户' + this.data.phone.slice(-4), // 兜底昵称
                    avatar: '/images/default-avatar.png' // 兜底头像
                });

                wx.showToast({ title: '登录成功', icon: 'success', mask: true });
                setTimeout(() => {
                    // 登录后跳转到my页面（而非home），直接展示登录状态
                    wx.switchTab({ url: '../my/my' });
                }, 1500);
            } else {
                wx.showToast({ title: data.data.msg || '登录失败', icon: 'none', mask: true });
            }
        } catch (error) {
            console.error('登录失败:', error);
            wx.showToast({ title: '登录失败，请检查网络', icon: 'none' });
        }
    },

    goRegister() {
        wx.navigateTo({ url: '../register/register' });
    }
});