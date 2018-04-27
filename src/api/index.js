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