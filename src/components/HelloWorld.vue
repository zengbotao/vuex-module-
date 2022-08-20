<template>
    <div>
      {{ $store.getters['order/getOrderNum'] }}
      <button @click="asyncAction">触发异步包含异步的action</button>
    </div>
</template>

<script>
export default {
  methods:{
    asyncAction(){
      this.$store.dispatch('order/asyncChangeGoods',1000)
      .then(res=>{
        console.log('aciton调用后获取的值:',res)
      })
    }
  }
}
</script>

<style>

</style>