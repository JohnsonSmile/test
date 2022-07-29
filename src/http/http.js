import axios from 'axios'


const http = axios.create({})

http.interceptors.request.use((config) => {
  console.log('config:', config.url)
  if (config.upload) {
    config.headers['Content-Type'] = 'multipart/form-data'
  }
  if (config.method.toLowerCase() === 'get') {
    config.params = config.data
  }
  return config
})

http.interceptors.response.use((response) => {
  return response
})

export { http }
