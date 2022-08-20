/*
 * @Description: 
 * @Autor: zengbotao@myhexin.com
 * @Date: 2022-08-07 09:59:43
 * @LastEditTime: 2022-08-20 09:37:32
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user';
import order from './modules/order';

Vue.use(Vuex); //  {  install: function install (Vue) {   属性挂载 组件 指令 过滤器 } }



// 动态导入所有模块                   目录     是否子 文件特点
const modulesFn = require.context('./modules', true, /\.js$/);
// require.context()接收三个参数，第一个参数是要加载的文件目录地址，第二个参数是true或false，表示是否需要加载子目录，第三个参数是个正则表达式，表示要加载哪些文件，上面代码表示要加载components目录下的.js文件。
// 返回一个（require）函数，该函数可以接收一个参数: request。
// 此导出函数有三个属性: resolve、keys和 id。
// resolve是一个函数，它返回 request被解析后得到的模块 id。
// keys也是一个函数，@{它返回一个数组}，由所有可能被此 context module 处理的请求。
// id是 context module 的模块 id。它可能在你使用 module.hot.accept时会用到。


const regex = /.*\/(.*)\.js$/
console.dir(modulesFn, modulesFn.keys);
const modules = {};
// modulesFn.keys() 可以获取到上述满足条件的文件的加载路径
// modulesFn方法 modulesFn(路径) 获取模块
// {文件的加载路径user:模块}
// 通过循环，将每个js中export default出的对象放在modules中并return，最后将modules丢到Vuex.Strore中。
modulesFn.keys().forEach(filepath => {

  let moduleName = regex.exec(filepath);
  if (moduleName !== null) {
    moduleName = moduleName[1]
  }
  const moduleObj = modulesFn(filepath);
  console.log(filepath, moduleName, moduleObj);
  //./order.js  order 

  //{
  //   "default": {
  //     "state": {
  //       "goods": [
  //         {
  //           "name": "狗粮",
  //           "price": 100
  //         },
  //         {
  //           "name": "猫粮",
  //           "price": 50
  //         }
  //       ],
  //         "orderNum": 1
  //     },
  //     "getters": { },
  //     "mutations": { },
  //     "actions": { }
  //   }
  // }
  modules[moduleName] = {
    namespaced: true,
    ...moduleObj.default
  }
  // let config2 = {
  //   order: {
  //     namespaced: true,
  //     ...moduleObj.default
  //   }
  // }
})




// 应用级别 root属性
export default new Vuex.Store({
  state: {// 数据
  },
  mutations: {// 改变
  },
  actions: { // 行为
  },
  // modules: { // 封装业务的模块 = 数据 + 改变 + 行为 + 获取数据
  //   user, order
  // }
  modules
})
