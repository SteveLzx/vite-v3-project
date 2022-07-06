import { MockMethod } from 'vite-plugin-mock'
import { mock, Random } from 'mockjs'

const userInfo = mock({
  "name|1": "★★★",
  "email": Random.email(),
  "array|10": [
    () => Random.cname()
  ]
})

const goodsList = mock({
  'total': 10,
  'data|10': [
    () => Random.cname()
  ]
})

export default [
  {
    url: '/api/getGoodsList',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 200,
        body: goodsList,
      }
    },
  },
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000,
    response: {
      code: 200,
      body: {
        name: Random.cname(),
      },
    },
  },
  {
    url: '/api/userInfo',
    method: 'post',
    response: {
      code: 0,
      message: '参数错误',
    },
  },
] as MockMethod[]