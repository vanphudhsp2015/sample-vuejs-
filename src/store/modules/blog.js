import * as mutationType from '../types'
import blogsApi from '../../api/blog'

// initial state
const state = {
  all: [],
  loadingdata: false,
  message: null
}

// initial getters
const getters = {
  all: state => state.all,
  message: state => state.message,
  loadingdata: state => state.loadingdata
}

// initial actions
const actions = {
  // get data from API
  getAllBlogs({ commit }) {
    commit('loading-blog');
    blogsApi.getBlogs(blogs => {
      commit(mutationType.SHOW_ALL_BLOG, blogs)
    })
  },
  // save data
  saveBlog(context, data) {
    blogsApi.saveBlog(data.data, (response) => {
      if (response) context.commit('SAVE_SUCCESS', response.data)
    })
  },
  // update blog
  updateBlog(context, blog) {
    return new Promise((resolve, reject) => {
      blogsApi.updateBlog(blog.data.id, blog.data, (response) => {
        if (response) {
          resolve(response);
          context.commit('UPDATE_SUCESS', response.data)
        }
      }, error=>{
        if(error) reject(error)
      })
    })
  },
  // delete blog
  destroy(context, payload) {
    blogsApi.deleteBlog(payload.id, (response) => {
      if (response) context.commit('REMOVE_ITEM', payload.id);
    })
  },
}

// initial mutation
const mutations = {
  [mutationType.SHOW_ALL_BLOG](state, blogs) {
    state.all = blogs
    state.loadingdata = false
  },
  ['loading-blog'](state) {
    state.loadingdata = true
  },
  ['REMOVE_ITEM'](state, payload) {
    state.all = state.all.filter(item => item.id !== payload)
  },
  ['SAVE_SUCCESS'](state, payload) {
    state.all = [...state.all, payload]
  },
  ['UPDATE_SUCESS'](state, payload) {
    state.all = state.all.map(item => item.id === payload.id ? payload : item)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
