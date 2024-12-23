
import axios from "axios"

const http = axios.create({
  // baseURL: 'https://api.example.com', // API Base URL
  baseURL: import.meta.env.VITE_API_URL, // API Base URL
  timeout: 30000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor
http.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    const { authorization } = response.headers
    authorization && localStorage.setItem("token", authorization)
    return response
  }, 
  function (error) {
    console.log("api response error:", error)
    const status = error.response?.status
    if([401, 403].indexOf(status) > -1 && !window.location.href.endsWith("/login")) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error.response)
  }
)



export const get = (url, query = {}) => {
   // 使用 URLSearchParams 构造查询字符串
   const queryString = new URLSearchParams(query).toString()
   // 如果有查询参数，拼接到 URL 后面
   const fullUrl = queryString ? `${url}?${queryString}` : url
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: fullUrl
    })
    .then(res => {
      resolve(res)
    })
    .catch(response => {
      errorState(response)
      reject(response)
    })
  })
}

export const post = (url, body, headers = { "Content-Type": "application/json" }) => {
  return new Promise((resolve, reject) => {
    http({
      method: "post",
      url,
      data: body,
      headers
    })
    .then(res => {
      resolve(res)
    })
    .catch(response => {
      errorState(response)
      reject(response)
    })
  })
}

export const patch = (url, body, headers = { "Content-Type": "application/json" }) => {
  return new Promise((resolve, reject) => {
    http({
      method: "patch",
      url,
      data: body,
      headers
    })
    .then(res => {
      resolve(res)
    })
    .catch(response => {
      errorState(response)
      reject(response)
    })
  })
}

export const del = (url) => {
  return new Promise((resolve, reject) => {
    http({
      method: "delete",
      url: url,
    })
    .then(res => {
      resolve(res)
    })
    .catch(response => {
      errorState(response)
      reject(response)
    })
  })
}



function errorState(response) {
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
  } else {
    console.log(response)
  }
}