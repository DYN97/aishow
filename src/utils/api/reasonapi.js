 /* jshint esversion: 6 */
 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import qs from 'qs'; // 根据需求是否导入qs模块

 axios.defaults.baseURL = process.env.NODE_ENV === 'production'?'/service/':'/api';

 const reasonapi = {
     // 添加
      /*param={
        proText:proText,
        proIndex:proIndex,
        reason:reason,
     }*/
     Add(params) {
        return axios.post('/ReasonManage/Add.aspx',qs.stringify(params));
     },
     Del(id){
         return axios.get(`/ReasonManage/Del.aspx?modify_id=`+id);
     },
     ModefiyList(id){
         return axios.get(`/ReasonManage/ModefiyList.aspx?modify_id=`+id);
     },
      /*param={
        modify_id:modify_id,
        proText:proText,
        proIndex:proIndex,
        reason:reason,
     }*/
     Modefiy(params){
         return axios.post(`/ReasonManage/Modefiy.aspx`,qs.stringify(params));
     },
     List(){
        return axios.get(`/ReasonManage/ReasonList.aspx`);
     }
     // 其他接口…………
 }
 export default reasonapi;
