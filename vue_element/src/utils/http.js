/**
 * wh
 * 2018-06-04
 */
import axios from 'axios';
import Qs from 'qs';
import { Message } from 'element-ui';

// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
var instance = axios.create()

// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 5000

// 为已知需要花费很长时间的请求覆写超时设置
instance.get('/', {
    timeout: 5000
})

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    
    return config
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    checkStatus(response)
    
    // 对响应数据做点什么
    return response
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
})

// 登录超时以及登录code判断
const checkStatus = (res) => {
    
    if (res.data.code == 1) {
      Message({
        message: res.data.msg,
        type: 'error',
        duration: 5 * 1000
      })
    }else if (res.data.code == 2) {
      Message({
        message: res.data.msg,
        type: 'error',
        duration: 5 * 1000
      })
    }
}

/**
 * 封装网络请求全局处理超时
 * 状态提示（toast）
 */
class HttpService {
    get(url, data) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: data
            }).then((res) => {
                if (res) {
                    resolve(res.data)
                }
            }).catch((error) => {
                resolve(error)
            })
        })
    }
    post(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, Qs.stringify(data), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then((res) => {
                if (res) {
                    resolve(res.data)
                }
            }).catch((error) => {
                resolve(error)
            })
        })
    } 
    // 用于上传图片 Qs.stringify() 转data会出现问题
    upload(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
                if (res) {
                    resolve(res.data)
                }
            }).catch((error) => {
                resolve(error)
            })
        })
    }
}

// 导出  获取class 出来的函数
export default new HttpService();