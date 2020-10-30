// 封装的弹窗
//import toast from './common/toast';
// 全局分享的拦截
//import share from './common/share';
// 网络请求
import request from './common/request';
// 监听观察
import watch from './common/watch';


export default {
    data: {
        isDebug: false,  // 体验版 or 正式版
        eventUrl: '',    // 接口请求地址
        imageUrl: '',    // 图片路径绝对地址
        userInfo: {}, //获取微信用户信息
        hasUserInfo: false,
        openid: "",
        list: []
    },
    // toast: toast,
    // share: share,
    request: request,
    watch: watch,
    version: () => { // 当前小程序自定义的版本
        return getApp().version;
    },
    backHome: () => { // 返回到首页
        const pages = getCurrentPages();
        wx.navigateBack({ delta: pages.length });
    }
}