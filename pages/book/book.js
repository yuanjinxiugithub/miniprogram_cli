import regeneratorRuntime from '../../utils/lib/runtime.js';
import store from '../../utils/store';
import create from '../../utils/lib/create';

create(store, {
  data: {
    setList: [{id:"v01", name:"v01", x: 220.5,y:"30.5",height:91,width:54,borderRadius:'5px'},
    {id:"v02", name:"v02", x: 236.5,y:"118.5",height:91,width:54,borderRadius:'5px'},
    {id:"v03", name:"v03", x: 111.5,y:"62.5",height:40,width:102,transform:"rotate(-55deg)"}],
    selectID: ""
  },
  onLoad(){
   
  },

  onShow(){
  },

  changeSet(e){
   this.setData({selectID: e.detail.id})
  },
  
});

