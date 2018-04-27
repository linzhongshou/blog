<template>
  <div id="app">
    <app-header></app-header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <app-footer></app-footer>
  </div>
</template>

<script>
// 异步加载组件
const AppHeader = () => import('./components/Header.vue')
const AppFooter = () => import('./components/Footer.vue')

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>


<style lang="stylus">
a
  text-decoration none
</style>
