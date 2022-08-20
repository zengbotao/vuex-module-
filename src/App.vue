<template>
  <div id="app">
    <!-- {{ $store.getters.user.getNum }} -->
    <!-- {{ $store.getters.user.findNum(99)  }} -->

    <!-- {{ $store.getters['user/getNum'] }} -->
    <!-- {{ $store.getters['user/findNum'](99)  }} -->

    <!-- 简写形式 -->

    {{ n }}
    {{ findN(99) }}
    +++++++++++++++++
    {{ n1 }}
    {{ findN1(99) }}
    {{ getNewNum }}
    <!-- <button @click="mutationChange">通过mutation直接改变数据(同步)</button>
    <button @click="actionChange">通过action处理异步逻辑(异步)</button>
    <button @click="changeState">直接改变state(不建议)</button>
    <button @click="passPropAction">传递参数的action</button>-->

    <h2>后半段内容</h2>
    <HelloWorld />

    <h2>简写版本</h2>

    <button @click="mutationChange">通过mutation直接改变数据(同步)</button>
    <button @click="actionChange">通过action处理异步逻辑(异步)</button>
    <button @click="passPropAction(10000)">传递参数的action</button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      innerNum: 10,
    };
  },
  computed: {
    // getter的简化: 其vuex别名来缩短代码量,下面的2个写法都是一样的
    ...mapGetters({
      n: "user/getNum",
      findN: "user/findNum",
    }),
    ...mapGetters("user", {
      n1: "getNum",
      findN1: "findNum",
    }),
    // state的简化: vuex别名 + 组件属性
    ...mapState({
      getNewNum(state) {
        return state.user.num + "%%" + this.innerNum;
      },
    }),
  },
  methods: {
    ...mapActions({
      passPropAction: "user/asyncChangeNumByParams",
      actionChange: "user/asyncChangeNum",
    }),

    ...mapMutations({
      mutationChange: "user/changeNum",
    }),
  },
  name: "App",
  components: {
    HelloWorld,
  },
  mounted() {
    console.log(this.$store);
  },
};

// vuex第一版 非简写的形式
// export default {
//   created(){
//     console.log(this.$store);
//   },
//   methods: {
//     passPropAction(){
//       this.$store.dispatch('user/asyncChangeNumByParams',10000);
//     },
//     changeState() {  // 不建议如此操作, 而是下方两种同异步操作
//       this.$store.state.user.num = 123;
//     },
//     mutationChange() {
//       this.$store.commit("user/changeNum"); // commit=> mutation
//       // this.$store.commit('changeNumByAction');
//     },
//     actionChange() {
//       this.$store.dispatch("user/asyncChangeNum"); // dispatch=> action
//     }
//   },
//   name: "App",
//   components: {
//     HelloWorld
//   }
// };
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
