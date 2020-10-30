// components/rect/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    id: {
      type: String,
      value: ''
    },
    name: {
      type: String,
      value: ''
    },
    x: {
      type: Number,
      value: 0
    },
    y: {
      type: Number,
      value: 0
    },
    width: {
      type: Number,
      value: 0
    },
    height: {
      type: Number,
      value: 0
    },
    borderColor: {
      type: String,
      value: "rgb(179, 240, 232)"
    },
    transform: {
      type: String,
      value: '0'
    },
    borderRadius: {
      type: String,
      value: '0'
    },
    active: {
      type: Boolean,
      value: false
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindClick(e){
     const id = e.target.dataset.id
     this.triggerEvent('changeSet',{id})
    }
  }
})
