// westore默认的change回调，res 更新的字段，比如是 userInfo.name  userInfo.age userId
// 如果是多个更新，会多个都回调过来
// Object.keys(params).forEach(key => {
//     console.log(key);
// });
// 对westore的 onChange 进行细分。制作类似vue的watch方法

export default function(obj) {
  if (!obj) return;
  this.onChange = (newVal) => {
      try {
          // 监听的key
          let watchKeys = JSON.parse(JSON.stringify(Object.keys(obj)));
          Object.keys(newVal).forEach(key => {
              // 更新的key
              const containKey = watchKeys.find(item => {
                  return key.indexOf(item) > -1;
              });
              if (containKey) {
                  // 有监听
                  const callBack = obj[containKey];
                  const isFun = Object.prototype.toString.call(callBack) === '[object Function]';
                  if (!isFun) return;
                  callBack(newVal[key]);
                  const index = watchKeys.indexOf(containKey); 
                  if (index > -1) { 
                      // 移除回调方法
                      watchKeys.splice(index, 1); 
                  }
              } else {
                  // 未监听该值
              }
          })
      } catch (error) {
          console.log('监听出错', error);
      }
  }
}