import axios from 'axios'
import { API_NOTIFICATION_MESSAGES, SERVICE_URLs } from '../constants/config'
import { getAccessToken, getType } from '../utils/common-utils';

const API_URL = 'http://localhost:8000';

 const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout:10000,
    headers:{
        "content-type": "application/json"
    }
 })

 
 axiosInstance.interceptors.request.use(
    function(config){
        if(config.TYPE.params){
            config.params = config.TYPE.params;
        }
        else if(config.TYPE.query){
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error){
        return Promise.reject(error)
    }
 )

 axiosInstance.interceptors.response.use(
    function (response){
        // Stop global loader here
        return processResponse(response)
    },
    function(error){
    return  Promise.reject(ProcessError(error))}
 )

///////////////////////////////
// If success -> returns { isSuccess: true, data: object }
// If fail -> returns { isError: true, status: string, msg: string, code: int }
//////////////////////////////

const processResponse =  (response)=>{
    if(response?.status === 200){
        return {isSuccess : true, data : response.data}
    }else{
        return{isFailure:true, status: response?.status , msg:response?.msg , code: response?.code}
    }
}
const ProcessError = async (error)=>{
    if(error.response){
        // Request made and server responded with a status other
        // that falls out of the range 2.x.x
        console.log('Error in response',error.toJSON())
        return{
        isError:true,
        msg: API_NOTIFICATION_MESSAGES.responseFailure,
        code: error.response.status
        }
    }
    else if(error.request){
        // Request made but no response was received
        console.log('Error in request',error.toJSON())
        return{
            isError:true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
            }
    }
    else{
        // Something happened in setting up request that triggers an error
        console.log('Error in network',error.toJSON())
        return{isError:true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
            }
    }
}

const API = {};

for (const [key,value] of Object.entries(SERVICE_URLs)){
    API[key] = (body, showUploadProgress, showDownloadProgress)=>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE'? '':body,
            responseType: value.responseType,
            headers:{
                authorization: getAccessToken()
            },
            TYPE: getType(value,body),
            onUploadProgress: function(progressEvent){
                if(showUploadProgress){
                  let percentage = Math.round((progressEvent.loaded*100)/progressEvent.total)
                  showUploadProgress(percentage);
                }
            },
            onDownloadProgress: function(progressEvent){
                if(showDownloadProgress){
                  let percentage = Math.round((progressEvent.loaded*100)/progressEvent.total)
                  showDownloadProgress(percentage);
                }
            }

        })
}
export {API};