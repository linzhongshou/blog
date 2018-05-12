import axios from 'axios'
import { resolve } from 'path';

export function fetchArticlePage(currPage, pageSize, categoryId, searchContent) {
  return axios.get('/apis/article/articles', { 
    params: {'currPage': currPage, 'pageSize': pageSize, 'categoryId': categoryId, 'searchContent': searchContent} 
  })
}

export function fetchAllCategories() {
  return axios.get('/apis/category/all')
}

export function fetchArticle(id) {
  return axios.get('/apis/article/' + id)
}

export function submitComment(comment) {
  return axios.post('/apis/comment', comment, { headers: {"Content-Type": "application/json;charset=utf-8;"} })
}

export function fetchComments(articleId) {
  return axios.get('/apis/comment/' + articleId)
}