import regeneratorRuntime from '../../utils/lib/runtime.js';
import store from '../../utils/store';
import create from '../../utils/lib/create';
import { API } from '../../utils/api';
import mqtt from '../../utils/lib/mqtt.min.js';

const app = getApp()
create(store, {
  data: {
    userInfo: null,
    hasUserInfo: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list: []
  },
  onLoad(){
    if (app.globalData.userInfo) {
      this.store.data.userInfo = app.globalData.userInfo
      this.store.data.hasUserInfo = true
      this.update()
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.store.data.userInfo = res.userInfo
        this.store.data.hasUserInfo = true
        this.update()
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.store.data.userInfo = res.userInfo
          this.store.data.hasUserInfo = true
          this.update()
        }
      })
    }
    //登陆
  //   wx.login({
  //   success: res => {
  //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //     this.login()
  //   }
  //  });

   this.store.data.list =[{ FD_ID:1, FD_Name:'芝士华年12', count: 1 }]
   this.update()
   this.store.watch(this.watch());
  },

  onShow(){
    var client = mqtt.connect("wxs://kabao.chanyecloud.com", {
      clientId: "clientUserId"
    });
    console.log('lihdhhf')
    client.on('connect',function(){
      console.log('连接成功');
      //订阅
      client.subscribe('/test');
    })

  },
  
  watch() {
    return {
        userInfo: () => {
            console.log(`userInfo change`);
        },
        userId: (newVal) => {

        }
    }
 },

  goLog (){
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  },

  goWorkers(){
    wx.navigateTo({
      url: '/pages/worker/worker',
    })
  },

  onChangeName(){
     this.store.data.userInfo.nickName = '改了个名字';
     this.update();
  },

  login(){
    this.store.request({
      path: API.guestLogin,
      params: { Code: "aabbccdd", Flag: 0 },
      method: 'POST'
    }).then(res => {
      this.store.data.userInfo.nickName = res.data.WX.nickname;
      this.store.data.openid = res.data.WX.openid
      wx.setStorageSync('openid', res.data.WX.openid)
      this.update();
      this._getToken();
    })
  },

  _getToken(){ //获取 token
    this.store.request({
      path: API.guestScan,
      params: { OpenID: store.data.openid },
      method: 'POST'
    }).then(res => {
      if(res.err == 0){
        wx.setStorageSync('token', res.data.Token)
      }
    })
  },

  onScan(){ //1 打开扫码  然后跳转到账单页面 2 跳转到账单页面 再调用扫一扫
   wx.navigateTo({
     url: '/pages/bill/bill',
   })
  },

  onBook() { //进入预订界面
    wx.navigateTo({
      url: '/pages/book/book',
    })
  },

  onPlus (e){
    const id = e.currentTarget.dataset.id
    const item = this.store.data.list.find(o=>o.FD_ID == id)
    item.count += 1;
    this.update();
  },

  changeNum(e){
    const id = e.currentTarget.dataset.id
    const item = this.store.data.list.find(o=>o.FD_ID == id)
    if(item){
     item.count = e.detail.val;
    this.update();
    }
  },

});

