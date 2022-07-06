import { reactive, onMounted, ref } from 'vue'
import request from 'utils/request'

export const goodsList = () => {
  // 列表数据
  const state = reactive({
    loading: true, // 加载状态
    list: [], // 列表数据
    total: 0, // 总条数
    listQuery: {
      page: 1,
      limit: 5
    }
  })

  // 获取列表
  const queryGoodsList = () => {
    state.loading = true

    return request({
      url: '/api/getGoodsList',
      method: 'get',
      params: state.listQuery
    })
    .then(({ data, total }) => {
      // 设置列表数据
      state.list = data
      state.total = total
    })
    .finally(() => {
      state.loading = false
    })
  }

  // 首次获取数据
  queryGoodsList()

  return { state, queryGoodsList }
}
