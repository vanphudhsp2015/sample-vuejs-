import * as mutationType from '../types'
import blogsApi from '../../api/blog'

// initial state
const state = {
  all: [],
  message: null
}

// initial getters
const getters = {
  allBlogs: state => state.all,
  messages: state => state.message
}

// initial actions
const actions = {
  // get data from API
  getAllBlogs ({commit}) {
    blogsApi.getBlogs(blogs => {
      commit(mutationType.SHOW_ALL_BLOG, blogs)
    })
  },
  // save data
  // eslint-disable-next-line no-unused-vars
  saveBlog (context, data, bool) {
    blogsApi.saveBlog(data, (response) => {
      if (response.status === 201) {
        state.message = 'Data success has saved'
      }
      context.dispatch('getAllBlogs')
    })
  },
  // update blog
  updateBlog (context, blog) {
    blogsApi.updateBlog(blog.id, blog, (response) => {
      if (response.status === 201) {
        state.message = 'Data success has updated'
      }
      context.dispatch('getAllBlogs')
    })
  },
  // delete blog
  destroy (context, idblog) {
    let conf = window.confirm('Are you sure delete this Data?')
    if (conf) {
      blogsApi.deleteBlog(idblog, (response) => {
        if (response.status === 200) {
          state.message = 'Data success has deleted'
        }
        context.dispatch('getAllBlogs')
      })
    }
  }
}

// initial mutation
const mutations = {
  [mutationType.SHOW_ALL_BLOG] (state, blogs) {
    // eslint-disable-next-line no-console
    console.log(state, blogs)
    state.all = blogs
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
