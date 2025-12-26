import { userRegister } from '../../api/api'

Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 控制是否显示密码
        showPassword: false,
        phone: '',
        password: '',
        nickName: ''
    },

    /**
     * 手机号输入处理
     */
    onPhoneInput(e) {
        this.setData({
            phone: e.detail.value
        });
    },

    /**
     * 密码输入处理
     */
    onPasswordInput(e) {
        this.setData({
            password: e.detail.value
        });
    },

    /**
     * 昵称输入处理
     */
    onNickNameInput(e) {
        this.setData({
            nickName: e.detail.value
        });
    },

    /**
     * 切换密码显示状态
     */
    togglePasswordStatus() {
        this.setData({
            showPassword: !this.data.showPassword
        });
    },

    /**
     * 注册方法
     */
    async register() {
        // 表单验证
        if (!this.validateForm()) {
            return;
        }

        // 发起注册请求
        try {
            let params = {
                phone: this.data.phone,
                password: this.data.password,
                nickName: this.data.nickName
            };

            let data = await userRegister(params);
            console.log('注册data ==> ', data);

            wx.showToast({
                title: data.data.msg,
                icon: 'none',
                mask: true
            });

            if (data.data.code == 100) {
                setTimeout(() => {
                    this.goLogin();
                }, 1500);
            }
        } catch (error) {
            console.error('注册失败:', error);
            wx.showToast({
                title: '网络异常，请重试',
                icon: 'none'
            });
        }
    },

    /**
     * 表单验证
     */
    validateForm() {
        // 手机号验证
        let phoneReg = /^1[3-9]\d{9}$/;
        if (!phoneReg.test(this.data.phone)) {
            wx.showToast({
                title: '请输入正确的11位手机号',
                icon: 'none'
            });
            return false;
        }

        // 密码验证：字母开头，数字字母组合，6-16位
        let passwordReg = /^[a-zA-Z][a-zA-Z0-9]{5,15}$/;
        if (!passwordReg.test(this.data.password)) {
            wx.showToast({
                title: '密码需字母开头，数字字母组合，6-16位',
                icon: 'none'
            });
            return false;
        }

        // 昵称验证：中英文组合，1-16位
        let nickNameReg = /^[A-Za-z\u4e00-\u9fa5]{1,16}$/;
        if (!nickNameReg.test(this.data.nickName)) {
            wx.showToast({
                title: '昵称需中英文组合，1-16位',
                icon: 'none'
            });
            return false;
        }

        return true;
    },

    /**
     * 跳转到登录页面
     */
    goLogin() {
        wx.navigateTo({
            url: '../login/login'
        });
    }
});