import {
  fetchArticlePage,
  fetchAllCategories,
  fetchArticle,
  submitComment,
  fetchComments
} from '../api'

export default {
  FETCH_ARTICLE_PAGE: ({ commit, dispatch, state }, { currPage, pageSize, categoryId, searchContent }) => {
    return fetchArticlePage(currPage, pageSize, categoryId, searchContent)
  },

  FETCH_ALL_CATEGORIES: ({ commit, dispatch, state }) => {
    return fetchAllCategories()
  },

  FETCH_ARTICLE: ({ commit, dispatch, state }, { id }) => {
    return fetchArticle(id)
  },

  SUBMIT_COMMENT: ({ commit, dispatch, state },  comment ) => {
    return submitComment(comment)
  },

  FETCH_COMMENTS: ({ commit, dispatch, state },  { articleId } ) => {
    return fetchComments(articleId)
  }
}
