<template>
  <div class="am-u-md-8 am-u-sm-12">

    <article class="am-g blog-entry-article article" v-for="article in articles">
      <div class="am-u-lg-12 am-u-md-12 am-u-sm-12 blog-entry-text">
          <div class="title-container">
            <span class="title-label am-badge am-badge-success am-radius">{{ article.category.name }}</span>
            <span class="title-content"><router-link target="_blank" :to="{ path: '/article/' + article.id }">{{ article.title }}</router-link></span>
          </div>
          <div class="summary">{{ article.summary }}</div>
          <div class="info-bar">
            <i class="am-icon-clock-o">{{ dateFormat(article.createDate) }}</i>
            <i class="am-icon-eye">浏览 ( 100 )</i>
          </div>
      </div>
    </article>
    
    <ul class="am-pagination">
      <li class="am-pagination-prev">
        <a v-if="currPage <= 1" href="javascript:void(0);" class="page_disabled">&laquo; 上一页</a>
        <a v-else href="javascript:void(0);" @click="pageClick(currPage-1)">&laquo; 上一页</a>
      </li>
      <li class="am-pagination-next">
        <a v-if="currPage >= totalPage" href="javascript:void(0);" class="page_disabled">&raquo; 下一页</a>
        <a v-else href="javascript:void(0);" @click="pageClick(currPage+1)">&raquo; 下一页</a>
      </li>
    </ul>
  </div>
</template>

<script>
import dateUtil from '../utils/dateUtil'
import bus from '../assets/js/bus'

export default {
  data: () => {
    return {
      articles: [],
      currPage: 1,
      totalPage: 0,
      pageSize: 10,
      categoryId: null,
      searchContent: null
    }
  },
  beforeMount() {
    let self = this;
    this.pageSize = this.$store.state.pageSize;
    this.initArticleList();

    // 注册文章搜索事件
    bus.$on('searchArticle', function(searchContent) {
      self.currPage = 1;
      self.categoryId = null;
      self.searchContent = searchContent;
      self.initArticleList();
    });

    // 注册点击分类事件
    bus.$on('searchCategory', function(categoryId) {
      console.log('触发搜索');
      self.currPage = 1;
      self.categoryId = categoryId;
      self.searchContent = null;
      self.initArticleList();
    });
  },
  methods: {
    initArticleList: function() {
      this.$store.dispatch('FETCH_ARTICLE_PAGE', { 
          currPage: this.currPage, 
          pageSize: this.pageSize, 
          categoryId: this.categoryId, 
          searchContent: this.searchContent })
        .then(res => {
          if (res.data.code == 1) {
            this.articles = res.data.data.content;
            this.totalPage = res.data.data.totalPages;
          }
        }).catch(err => {
          console.log('Request error at article for page.')
        })
    },
    dateFormat: function(value) {
      return dateUtil.format('yyyy-MM-dd', value);
    },
    categoryClick: function(categoryId) {
      this.$store.commit('updateCategoryId', categoryId);
    },
    pageClick: function(currPage) {
      this.currPage = currPage;
      this.initArticleList();
    }
  }

}
</script>

<style>
.page_disabled { background-color: #e6e6e6 !important; color: inherit; cursor: default }
.page_disabled a:hover { color: inherit; }
.page_disabled a:visited { color: inherit }

.blog-entry-text { text-align: left; }
.summary { word-wrap: break-word; text-indent: 2em; }
.article { background-color: #ffffff; }
.info-bar { float: right; font-size: 0.7em; }
.info-bar i { margin: 0px 3px; padding-left: 0.5em;}

.title-content { font-size: 1.5em; font-weight: bold; padding: 0px 0.5em; }
.title-time { font-size: 0.7em; }
</style>
