import axios from 'axios'
import { resolve } from 'path';

export function fetchArticlePage(currPage, pageSize, categoryId, searchContent) {
  return axios.get('http://localhost:9090/article/articles', { 
    params: {'currPage': currPage, 'pageSize': pageSize, 'categoryId': categoryId, 'searchContent': searchContent} 
  })
}

export function fetchAllCategories() {
  return axios.get('http://localhost:9090/category/all')
}

export function fetchArticle(id) {
  return axios.get('http://localhost:9090/article/' + id)
}