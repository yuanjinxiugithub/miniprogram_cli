
import regeneratorRuntime from '../../utils/lib/runtime.js';
import create from '../../utils/lib/create';

create({
    options: {
        addGlobalClass: true,
    },
    properties: {
      step: {
        type: Number,
        value: 1
      },
      init: {
        type: Number,
        value: 1
      },
      min: {
        type: Number,
        value: 1
      },
      max: {
        type: Number,
        value: 5
      }

    },
    data: {
      val: 0
    },
    pageLifetimes: {
      // 组件所在页面的生命周期函数
      show: function () {
        this.setData({ val: this.properties.init})
       },
      hide: function () { 
      },
      resize: function () { },
    },

    methods: {
      bindAdd(){
        const { step , max } = this.properties
        const { val } = this.data
        this.setData({
           val: val+step
        },()=>{
          this.bindChage()
        });
      },
      bindSub(){
        const { step , max } = this.properties
        const { val } = this.data
        this.setData({
           val: val-step
        },()=>{
          this.bindChage()
        });
      },
      bindChage(){
        const { val } = this.data
        this.triggerEvent('changeNum',{val})
      },
    },
})