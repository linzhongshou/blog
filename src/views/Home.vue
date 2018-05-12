<template>
  <div class="am-g am-g-fixed blog-fixed">
    <index-left></index-left>
    <index-right></index-right>
  </div>
</template>

<script>
const IndexLeft = () => import('../components/Index_left.vue')
const IndexRight = () => import('../components/Index_right.vue')

export default {
  components: {
    IndexLeft,
    IndexRight
  }
}
</script>
