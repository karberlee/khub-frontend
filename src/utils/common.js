import { post } from "./api"

const uploadImage = (file, type) => {
  return new Promise((rev, rej) => {
    const form = new FormData()
    form.append('file', file)
    post(`/storage/upload/image/${type}`, form, { 'Content-Type': 'multipart/form-data' })
      .then((res) => rev(res))
      .catch((error) => rej(error))
  })
}

export {
  uploadImage
}