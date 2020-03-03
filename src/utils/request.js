import  axios from 'axios'
import  config from './config'
import QS from 'qs'

export  const service = axios.create({
    baseURL: config.BASE_URL,
    timeout: config.REQUEST_TIMEOUT,
    headers: {
    },
    transformRequest: [function(data) {
        data = QS.stringify(data)
        return data
    }]
})

service.interceptors.request.use(config =>{
    return config;
},error =>{
    console.log(error)
    return Promise.reject()
})

service.interceptors.response.use(response=>{
    if(response.status === 200){
        return response.data
    }
    else{
        Promise.reject()
    }
},error => {
    console.log(error)
    return Promise.reject()
})

export default obj =>{
    if(config.DEVELOPMENT){
        return Promise.resolve(obj.result)
    }
    else{
        return obj.invoke(obj.params)
    }
}
