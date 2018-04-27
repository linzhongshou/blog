import Vue from 'vue'

export default {
  updateCategoryId: (state, id) => {
    state.categoryId = id;
  },
  updateArticleSearch: (state, value) => {
    state.articleSearch = value;
  }
}
