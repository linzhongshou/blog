<template>
  <div class="am-u-md-4 am-u-sm-12 blog-sidebar">
    <div class="blog-sidebar-widget blog-bor">
      <h2 class="blog-title"><span>目录</span></h2>
      <ul class="am-list">
          <li v-for="category in categories"><a href="javascript:void(0);" @click="categoryClick(category.id)">{{ category.name }}</a></li>
      </ul>
    </div>
    <!-- <div class="blog-sidebar-widget blog-bor">
      <h2 class="blog-text-center blog-title"><span>联系我</span></h2>
      <p>
          <a href=""><span class="am-icon-qq am-icon-fw am-primary blog-icon"></span></a>
          <a href=""><span class="am-icon-github am-icon-fw blog-icon"></span></a>
          <a href=""><span class="am-icon-weibo am-icon-fw blog-icon"></span></a>
          <a href=""><span class="am-icon-reddit am-icon-fw blog-icon"></span></a>
          <a href=""><span class="am-icon-weixin am-icon-fw blog-icon"></span></a>
      </p>
    </div>
    <div class="blog-clear-margin blog-sidebar-widget blog-bor am-g ">
      <h2 class="blog-title"><span>热门标签</span></h2>
      <div class="am-u-sm-12 blog-clear-padding">
      <a href="" class="blog-tag">标签1</a>
      <a href="" class="blog-tag">标签2</a>
      <a href="" class="blog-tag">标签3</a>
      <a href="" class="blog-tag">标签4</a>
      <a href="" class="blog-tag">标签5</a>
      <a href="" class="blog-tag">标签6</a>
      </div>
    </div> -->
  </div>
</template>

<script>
import bus from '../assets/js/bus'

export default {
  data: () => {
    return {
      categories: {}
    };
  },
  beforeMount() {
    this.initCategories();
  },
  methods: {
    initCategories: function() {
      this.$store.dispatch('FETCH_ALL_CATEGORIES')
        .then(res => {
          if (res.data.code == 1) {
            this.categories = res.data.data;
          }
        })
    },
    categoryClick: function(categoryId) {
      bus.$emit('searchCategory', categoryId);
    }
  }
};
</script>

<style>
.blog-sidebar-widget { background-color: #ffffff; }
.blog-title span { border-top: 2px solid #e5e5e5; }
</style>