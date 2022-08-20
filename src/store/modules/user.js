// 数据 + 改变 + 行为 + 获取数据
export default {
    // namespaced:true, // 以模块名user作为命名空间
    state:{
        num:99
    },
    getters:{  // 取数据
        getNum(state){
            return state.num;
        },
        findNum(state) { // 也可以返回方法
            return (id)=> state.num === id
        }
    },
    mutations:{ 
       changeNum(state){ // Commit触发
            state.num++;
       },
       changeNumByAction(state){
        state.num = state.num + 10;
       },
       syncChangeNumByParams(state,payload){
        state.num += payload;
       }
    },
    actions:{
        // 异步的操作: 异步操作在这里执行 可以被devTools快照捕获
        // 发N个请求...最终由这里调用commit
        asyncChangeNum({ commit }) {  // 这个对象比较大
            commit('changeNumByAction')
            
        },
        // 附加数据
        asyncChangeNumByParams({commit},payload){
            // 参数可以在处理业务的时候使用, 比如: 查找订单id的详情
            commit('syncChangeNumByParams',payload)
        }
    },
   
}