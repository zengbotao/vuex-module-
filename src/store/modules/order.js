/*
 * @Description: 
 * @Autor: zengbotao@myhexin.com
 * @Date: 2022-08-07 09:59:49
 * @LastEditTime: 2022-08-20 09:42:34
 */
export default {
    // namespaced:true,
    state: {
        goods: [
            { name: '狗粮', price: 100 },
            { name: '猫粮', price: 50 },
        ],
        orderNum: 1
    },
    getters: {
        getAll(state) {
            return state.goods;
        },
        getByPrice(state) {
            return (price) => state.goods.find(item => item.price === price)
        },
        getOrderNum(state) {
            return state.orderNum
        }
    },
    mutations: {
        changeOrderNumByPraram(state, payload) {
            console.log('mutations:changeOrderNumByPraram');
            state.orderNum = payload;
        },
    },
    actions: {
        actionA({ commit }, payload) {
            console.log('actionA:');
            // 同步改个数据，commit的时mutation
            commit('changeOrderNumByPraram', payload)
            // 返回异步数据
            return new Promise(res => {
                setTimeout(() => {
                    res(888888)
                }, 500)
            });
        },
        async asyncChangeGoods({ dispatch }, payload) {
            // 这里异步调用另一个action
            return await dispatch('actionA', payload)
        }
    }
}