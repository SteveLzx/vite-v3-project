import request from 'utils/request'
export type ParamsType = {
  [key: string]: any
}

export const QueryUserAuthorization = () => {
  return new Promise((resolve) => {
    request({
      url: '/api/user/authorization',
      method: 'get',
    }).then((response: ParamsType) => {
      resolve(response)
    })
  })
}