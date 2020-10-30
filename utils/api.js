export const  API = {
  guestLogin: '/guest/login',//扫码登录接口
  guestScan: '/guest/scan', //扫码结账
  getFoodType: '/front/foodType/list',
  getFoodList: '/front/foodItem/list',
  getRealUrl: '/url/real',
  guestCheckPay: '/guest/check/pay', //检查是否有客人正在支付
  guestClosePay: '/guest/close/pay',//关闭未支付订单
  guestBillPay : '/guest/bill/pay', //账单支付
  getRechargeList: '/system/vipCardType/rechargeList',//咨客收银-会员卡充值列表
  getVipCardList: '/system/vipCardType/list',//咨客收银-会员卡类型列表
  getPromotionList: '/guest/promotion',//酒水促销列表
}