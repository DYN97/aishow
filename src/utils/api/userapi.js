 /* jshint esversion: 6 */
 import axios from '@/utils/http'; // 导入http中创建的axios实例
 //  import qs from 'qs'; // 根据需求是否导入qs模块

 axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/service/' : '/api';

 const userapi = {
     // 登陆    
     oath(curl) {
         return axios.get(`upms/oath.aspx?curl=` + curl);
     },
     // 获取权限  

     GetUserInfo(username) {
         return axios.get(`user/GetPCUserInfo.aspx?username=` + username);
     }
     // 其他接口…………
 }

 export default userapi;