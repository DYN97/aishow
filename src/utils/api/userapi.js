 /* jshint esversion: 6 */
 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import qs from 'qs'; // 根据需求是否导入qs模块

 axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/service/' : '/api';
 const mode = process.env.NODE_ENV === 'production' ? 'wx' : 'test';
 const userapi = {
     // 登陆    
     oath(curl) {
         return axios.get(`upms/oath.aspx?curl=` + curl + "&mode=" + mode);
     },
     // 获取权限  

     GetUserInfo(username) {
         return axios.get(`user/GetPCUserInfo.aspx?username=` + username);
     },
     ApplyCommand(params) {
         return axios.post('upms/ApplyCommand.aspx', qs.stringify(params));
     }
     // 其他接口…………
 }

 export default userapi;