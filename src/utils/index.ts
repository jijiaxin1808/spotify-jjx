import axios from 'axios'
import { getAccessToken } from './access'
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const baseConfig = {
    baseURL: 'http://localhost:8888',
    headers: { Authorization: 'Bearer ' + getAccessToken() }
  }
  return Object.assign(config, baseConfig)
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export { axios }
