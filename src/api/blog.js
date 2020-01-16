import axios from 'axios'

const api = axios.create({
  baseURL: 'https://5caacc7969c15c00148494dc.mockapi.io/'
})

function getBlogsApi (cb) {
  api.get('product')
  .then((response) => {
    cb(response.data)
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error)
  })
}

function saveDataApi (data, cb) {
  api.post('product', data)
  .then(function (response) {
    cb(response)
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error)
  })
}

function updateData (idblog, data, cb) {
  api.put('product/' + idblog, data)
  .then(() => {
    cb({ status: 201 })
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error)
  })
}

function deleteData (idblog, cb) {
  api.delete('product/' + idblog)
  .then((response) => {
    cb(response)
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error)
  })
}

export default {
  getBlogs: (cb) => getBlogsApi(cb),
  saveBlog: (data, cb) => saveDataApi(data, cb),
  updateBlog: (idblog, data, cb) => updateData(idblog, data, cb),
  deleteBlog: (idblog, cb) => deleteData(idblog, cb)
}
