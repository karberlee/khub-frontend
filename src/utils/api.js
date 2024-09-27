
import axios from "axios"

const http = axios.create({
  // baseURL: 'https://api.example.com', // API Base URL
  baseURL: import.meta.env.VITE_API_URL, // API Base URL
  timeout: 10000, // 请求超时时间
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
    const { status } = error.response
    if([401, 403].indexOf(status) > -1 && !window.location.href.endsWith("/login")) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error.response)
  }
)



export const get = (url) => {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: url
    })
    .then(res => {
      resolve(res);
    })
    .catch(response => {
      errorState(response);
      reject(response);
    })
  })
}

export const post = (url, body) => {
  return new Promise((resolve, reject) => {
    http({
      method: "post",
      url: url,
      data: body,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      resolve(res);
    })
    .catch(response => {
      errorState(response);
      reject(response);
    })
  })
}

export const patch = (url, body) => {
  return new Promise((resolve, reject) => {
    http({
      method: "patch",
      url: url,
      data: body,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      resolve(res);
    })
    .catch(response => {
      errorState(response);
      reject(response);
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
      resolve(res);
    })
    .catch(response => {
      errorState(response);
      reject(response);
    })
  })
}



function errorState(response) {
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response;
  } else {
    console.log(response);
  }
}