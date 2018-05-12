<template>
  <header class="header">
    <nav class="am-g am-g-fixed blog-fixed blog-nav">
      <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only blog-button" data-am-collapse="{target: '#blog-collapse'}" ><span class="am-sr-only">导航切换</span> <span class="am-icon-bars"></span></button>

      <div class="am-collapse am-topbar-collapse" id="blog-collapse">
        <ul class="am-nav am-nav-pills am-topbar-nav">
          <router-link to="/" tag="li" @click.native="tabClick('index', this)"><a>首页</a></router-link>
          <router-link to="/about" tag="li" @click.native="tabClick('about', this)"><a>关于我</a></router-link>
        </ul>
        <form class="am-topbar-form am-topbar-right am-form-inline" role="search" id="searchForm">
          <div class="am-input-group">
            <input type="text" class="am-form-field am-input-sm" v-model="searchContent" placeholder="文章搜索">
            <span class="am-input-group-btn">
              <button class="am-btn am-btn-success" type="button" @click="searchArticle()"><span class="am-icon-search"></span> </button>
            </span>
          </div>
        </form>
      </div>
    </nav>
  </header>
</template>

<script>
import stringUtil from '../utils/stringUtil'
import bus from '../assets/js/bus'

export default {
  data: () => {
    return {
      searchContent: ''
    }
  },
  methods: {
    searchArticle: function() {
      let content = stringUtil.trimString(this.searchContent)
      bus.$emit('searchArticle', content)
    },
    tabClick: function(tab, ele) {
      if('index' == tab) {
        window.document.forms[0].style.display = 'block'
      } else {
        $(".am-nav").find('li:eq(0)').removeClass('am-active')
        window.document.forms[0].style.display = 'none'
      }
    }
  }
}
</script>


<style>
.header { border-bottom: 1px solid #e5e5e5; margin-bottom: 1em; background-color: #ffffff; }
.am-btn-success { background-color: #10D07A; border-color: #10D07A !important; }
.router-link-exact-active a { color: #10D07A; }
</style>
