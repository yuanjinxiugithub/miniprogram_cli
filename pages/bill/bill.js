import regeneratorRuntime from '../../utils/lib/runtime.js';
import store from '../../utils/store';
import create from '../../utils/lib/create';
import { API } from '../../utils/api';
const app = getApp()
create(store, {
  data: {
    list: []
  },
  onLoad(){
   
  },

  onShow(){
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

