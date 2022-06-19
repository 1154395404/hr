import axios from 'axios'
import {Message} from "element-ui";

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
  }
);
service.interceptors.request.use();
service.interceptors.response.use(response => {
  const {data, success, message} = response.data;
  if (success) {
    // * 业务成功返回数据
    return data;
  } else {
    // ! 业务失败后 进入catch里面
    Message.error(message);
    return Promise.reject(new Error(message));
  }
}, error => {
  // ! 响应失败后直接进入 catch
  Message.error(error.message);
  return Promise.reject(error);

});

export default service
