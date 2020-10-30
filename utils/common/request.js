
/**
// 单个请求
params = {
    path: '',       // 请求路径 
    params: {},     // 请求参数
    method: 'GET'   // 请求方法
}

isShowMask = false   // 是否显示菊花

// 多个请求
params = [{
        path: '',       // 请求路径 
        params: {},     // 请求参数
        method: 'GET'   // 请求方法
    },
    {
        path: '',       // 请求路径 
        params:  {},     // 请求参数
        method: 'GET'   // 请求方法
    }
]
isShowMask = false   // 是否显示菊花
 * */ 

export default function(params = { path: null, params: {}, method: 'GET' }, isShowMask = true) {
  if (isShowMask) {
      wx.hideLoading();
      wx.showLoading({ title: '加载中', mask: true });
  }
  return new Promise((resolve)=> {
      // 判断传入是多个请求还是单个请求
      const isArray = Object.prototype.toString.call(params) === '[object Array]';
      // 不管是单个还是多个，都拼接成数组的请求
      let paramsList = isArray ? params : [params];
      // 请求列表
      let requestList = [];
      for (var i = 0; i < paramsList.length; i++) {
          const single = paramsList[i];
          // 拼接请求路径
          const url = `${this.data.eventUrl}${single.path}`;
          const method = single.method || 'GET';
          const data = single.params || {};
          const token = this.data.token || '';
          requestList.push(requestPromise(url, method, data, token));
      }
      Promise.all(requestList).then((result)=>{
          wx.hideLoading();
          if (result && result.length) {
              resolve((result.length === 1) ? result[0] : result);
          } else {
              resolve({ data: null, message: `网络开小差`, isSuccess: false });
          }
      });
  })
}

function requestPromise (url, method, data = {}) {
  const token = wx.getStorageSync('token')
  return new Promise((resolve)=>{
      wx.request({
          url,
          method, //请求方法
          header: {
              'content-type': 'application/json', // 默认header头
              'Authorization': 'Bearer '+ token,
          },
          data, //请求参数
          success: (res) => { //成功回调
              resolve({
                  data: res.data || null,
                  err:  res.data.err,
                  message: res.data.errmsg || '',
                  code: res.statusCode || 200
              });
          },
          fail: () => { //失败回调
              resolve({ data: null, message: `网络开小差`, isSuccess: false });
          },
      });
  })
}
