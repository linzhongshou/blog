<template>
  <div class="am-g am-g-fixed blog-fixed blog-content">
    <div class="am-u-sm-12">
      <a id="startReplacehold"></a>
      <article class="am-article blog-article-p">
        <div class="am-article-hd">
          <h1 class="am-article-title blog-text-center">{{ article.title }}</h1>
          <p class="am-article-meta blog-text-center">
              <span><a href="#" class="blog-color">{{ renderCategory }} &nbsp;</a></span>-
              <span>{{ dateFormat(article.createDate, 'y') }}</span>
          </p>
        </div>        
        <div class="am-article-bd">
          <p class="am-article-lead" v-html="compliedMarkDown(article.content)" v-highlight></p>
        </div>
      </article>

        <hr>
        <ul class="am-pagination blog-article-margin">
          <li class="am-pagination-prev">
            <a href="javascript:void(0);" :class="prevArticleClass" @click="nextArticle(prev_article.id)">&laquo; {{ prev_article.title }}</a>

          </li>
          <li class="am-pagination-next">
            <a href="javascript:void(0);" :class="nextArticleClass" @click="nextArticle(next_article.id)">{{ next_article.title }} &raquo;</a>
          </li>
        </ul>
        
        <hr>

        <form id="commentForm" class="am-form am-form-horizontal" @submit.prevent="submitForm()">
            <h3 class="blog-comment">评论</h3>
          <fieldset>
            <div class="am-form-group am-u-md-4 am-u-sm-12">
              <label for="name" class="am-form-label">*</label>
              <div class="am-u-sm-11">
                <input type="text" id="name" name="name" v-model="formData.name" placeholder="名字" required>
              </div>
            </div>
            <div class="am-form-group am-u-md-4 am-u-sm-12">
              <label for="email" class="am-form-label">*</label>
              <div class="am-u-sm-11">
                <input type="email" id="email" name="email" v-model="formData.email" placeholder="邮箱" required data-foolish-msg="请填写正确的邮箱地址">
              </div>
            </div>
            <div class="am-form-group am-u-md-4 am-u-sm-12">
              <div class="am-u-sm-11">
                <input type="text" id="website" name="website" v-model="formData.website" placeholder="网站" data-foolish-msg="请填写正确的网站URL" pattern="(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?">
              </div>
            </div>
            <div class="am-form-group">
              <textarea id="comment" name="comment" rows="5" v-model="formData.comment" placeholder="留言" required data-foolish-msg="请填写留言内容"></textarea>
            </div>
        
            <p><button type="submit" class="am-btn am-btn-default">发表评论</button></p>
          </fieldset>
        </form>

        <hr>

        <article class="am-comment" v-for="comment in comments">
          <a href="#link-to-user-home">
            <img src="/dist/static/images/guest.png" alt="" class="am-comment-avatar" width="48" height="48"/>
          </a>
          <div class="am-comment-main">
            <header class="am-comment-hd">
              <div class="am-comment-meta">
                <a href="#link-to-user" class="am-comment-author">{{ comment.name }}</a>
                评论于 <time>{{ dateFormat(comment.createDate, 'n') }}</time>
              </div>
            </header>
            <div class="am-comment-bd">
              {{ comment.comment }}
            </div>
          </div>
        </article>
    </div>
  </div>
</template>

<script>
import dateUtil from '../utils/dateUtil'
import stringUtil from '../utils/stringUtil'
// ES5 导入
let marked = require('../../static/js/marked.min.js')
let vHighlight = require('../../static/js/highlight.min.js')

export default {
  data: () => {
    return {
      article: { title: '' },
      comments: [],
      prev_article: {'id': null, 'title': '没有了'},
      next_article: {'id': null, 'title': '没有了'},
      formData: {
        name: '',
        email: '',
        website: '',
        comment: ''
      }
    }
  },
  components: {
    marked,
    vHighlight
  },
  beforeMount() {
    this.initArticle(this.$route.params.id)
    this.initComments(this.$route.params.id)
    this.initMarked()
    this.initFormValidator()
  },
  methods: {
    initArticle: function(id) {
      if(id == null) {
        return ;
      }
  
      this.$store.dispatch('FETCH_ARTICLE', { id: id })
        .then( (res) => {
          if (res.data.code == 1) {
            let map = res.data.data;
            this.article = map['article'];

            if(!stringUtil.isNull(map['prev'])) {
              this.prev_article = map['prev'];
            } else {
              this.prev_article = {'id': null, 'title': '没有了'};
            }
            if(!stringUtil.isNull(map['next'])) {
              this.next_article = map['next'];
            } else {
              this.next_article = {'id': null, 'title': '没有了'};
            }

            window.setTimeout(function() {
              $("html, body").animate({ scrollTop: $("#startReplacehold").offset().top }, {duration: 100, easing: "swing" });
            }, 100); 
          }
        } );
    },
    initComments(articleId) {
      this.$store.dispatch('FETCH_COMMENTS', { articleId: articleId })
        .then( (res) => {
          if(res.data.code == 1) {
            this.comments = res.data.data
          }
        } );
    },
    nextArticle(id) {
      if(id == null) {
        return ;
      }
      
      this.$router.push({ path: '/article/' + id })
      window.location.reload()
    },
    initMarked() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      });
    },
    dateFormat: function(value, dateType) {
      if(value) {
        if(dateType === 'y') {
          return dateUtil.format('yyyy-MM-dd', value);
        } else {
          return dateUtil.format('yyyy-MM-dd HH:mm', value);
        }
      } else {
        return '';
      }
    },
    compliedMarkDown(content) {
      if(!stringUtil.isNull(content)) {
        return marked(content, { sanitize: true });
      } else {
        return '';
      }
    },
    initFormValidator() {
      // 表单验证
      var $form = $('#commentForm');
      var $tooltip = $('<div id="vld-tooltip">提示信息！</div>');
      $tooltip.appendTo(document.body);

      $form.validator();

      var validator = $form.data('amui.validator');

      $form.on('focusin focusout', '.am-form-error input', function(e) {
        if (e.type === 'focusin') {
          var $this = $(this);
          var offset = $this.offset();
          var msg = $this.data('foolishMsg') || validator.getValidationMessage($this.data('validity'));

          $tooltip.text(msg).show().css({
            left: offset.left + 10,
            top: offset.top + $(this).outerHeight() + 10
          });
        } else {
          $tooltip.hide();
        }
      });
      $form.on('focusout', function(e) {
        $("#vld-tooltip").hide();
      });
    },
    submitForm() {
      if(!$('#commentForm').find('input, textarea').hasClass('am-field-error')) {
        this.formData['articleId'] = this.article.id;
        this.$store.dispatch('SUBMIT_COMMENT', this.formData)
        .then(res => {
          if (res.data.code == 1) {
            debugger;
            this.comments.push(res.data.data)
          }
        })
      }
      return false;
    }
  },
  computed: {
    prevArticleClass: function() {
      return {
        'page_disabled': this.prev_article.id == null
      }
    },
    nextArticleClass: function() {
      return {
        'page_disabled': this.next_article.id == null
      }
    },
    renderCategory: function() {
      return this.article.category != null ? this.article.category.name : '';
    }
  }
}
</script>

<style>
pre { padding: 0px; border: none; }
nav:first-child { display: none; }
div > hr:first-child { display: none; }

.page_disabled { background-color: #e6e6e6 !important; color: inherit; cursor: default; }
.page_disabled a:hover { color: inherit; }
.page_disabled a:visited { color: inherit; background-color: #fff; }

.am-g { text-align: left; }
.am-article-lead { word-wrap: break-word; }
.am-comment { margin-bottom: 20px; }

#searchForm { display: none; }

#vld-tooltip {
  position: absolute;
  z-index: 1000;
  padding: 5px 10px;
  background: #F37B1D;
  min-width: 150px;
  color: #fff;
  transition: all 0.15s;
  box-shadow: 0 0 5px rgba(0,0,0,.15);
  display: none;
}

#vld-tooltip:before {
  position: absolute;
  top: -8px;
  left: 50%;
  width: 0;
  height: 0;
  margin-left: -8px;
  content: "";
  border-width: 0 8px 8px;
  border-color: transparent transparent #F37B1D;
  border-style: none inset solid;
}
</style>
