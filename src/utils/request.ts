import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus';

// 请求定义类型
interface RequestConfig extends AxiosRequestConfig {
  contentType?: string; // 可能更改的post数据类型
  canRepeat?: boolean; // 防止重复提交
  hasUseCode?: boolean; // 需要后端返回的code特俗处理错误信息
}

// 响应定义类型
interface ResonseConfig extends AxiosResponse {
  config: RequestConfig
}

// 创建axios实例
const server = axios.create({
  // 再请求地址前面加上baseUrl
  // baseURL: import.meta.env.VITE_BASE_API,
  // 当发送跨域请求携带cookie
  // withCredentials: true,
  timeout: 5000
})

// 请求链接列表
let pendingAjax: string[] = [];

// 请求拦截
server.interceptors.request.use(
  (config: RequestConfig) => {
    // console.log('config', config)
    // 防止重复提交 需要重复提交则传入canRepeat: true
    if (!config.canRepeat) {
      config.cancelToken = new axios.CancelToken(cancel => {
        const requestMsg = `${config.url}-${config.method}`
        if (pendingAjax.includes(requestMsg)) {
          cancel(requestMsg);
        }
        pendingAjax.push(requestMsg)
      });
    }    
    // 指定请求令牌
    // config.headers.Authorization = ''
    // 配置post Content-Type
    // config.headers.post['Content-Type'] = config.contentType || 'application/json;charset=utf-8';
    // 配置get Response-Type
    // if (config.responseType) config.headers.get['Response-Type'] = config.responseType;
    return config;
  },
  (error) => {
    Promise.reject(error)
  }
)

// 响应拦截
server.interceptors.response.use(
  (response: ResonseConfig) => {
    const {
      url, method, hasUseCode
    } = response.config;
    // 把请求完的接口释放
    const requestMsg = `${url}-${method}`;
    pendingAjax.splice(pendingAjax.indexOf(requestMsg), 1)
    // console.log('response.data', response.data)
    const { code, body, message } = response.data;
    if ([401, 407].includes(code)) {
      // 用户无权限 || 登录过期 || token失效
      ElMessage.error(message);
      // 重新登录

    } else {
      if (code !== 200) {
        ElMessage.error(message)
        Promise.reject(message)
      } else {
        // 需要使用到code处理时传hsaUseCode: true；返回整个数据
        if (hasUseCode) { 
          return response.data
        }
        return body
      }
    }
  },
  error => {
    const { message } = error;
    if (message.includes('code 503') || message.includes('code 500')) {
      ElMessage.error('服务错误，请稍后重试!');
    }
    // 取消重复请求时在请求列表中拿掉
    if (message && pendingAjax.indexOf(message) > -1) {
      pendingAjax.splice(pendingAjax.indexOf(message), 1)
    } else {
      pendingAjax = [];
    }
    const { config } = error;
    // 判断是否配置了重试
    if (!config || !config.retry) {
      pendingAjax = [];
      return Promise.reject(error)
    }
    if (!config.shouldRetry(error)) {
      return Promise.reject(error)
    }

    // 设置重置次数，默认为0
    config.__retryCount = config.__retryCount || 0
    // 判断是否超过了重试次数
    if (config.__retryCount >= config.retry) {
      return Promise.reject(error)
    }
    // 重试次数自增
    config.__retryCount += 1
    // 延时处理
    const backoff = new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, config.retryDelay || 1)
    })
    // 重新发起axios请求
    return backoff.then(() => axios(config))  
  }
)

export default server;