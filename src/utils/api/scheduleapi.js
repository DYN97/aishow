 /* jshint esversion: 6 */
 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import qs from 'qs'; // 根据需求是否导入qs模块

 axios.defaults.baseURL = process.env.NODE_ENV === 'production'?'/service/':'/api';

 const scheduleapi = {
     // 创建日程
     /*param={
        username:username,
        title:title,
        content:content,
        starttime:starttime,
        endtime:endtime,
        place:place
     }*/
     CreateSchedule(params) {
         return axios.post('/Schedule/CreateSchedule.aspx',qs.stringify(params));
     },
     //获取用户日程
     GetScheduleListByUser(username,chosedate){
         return axios.get(`/Schedule/GetScheduleListByUser.aspx?username=`+username+'&chosedate='+chosedate);
     },
      //获取日程详情
      GetScheduleDetail(id,username){
        return axios.get(`/Schedule/GetScheduleDetail.aspx?id=`+id+'&username='+username);
    },
     //编辑日程
     /*param={
        id:id,
        option:option,//option:1为修改0为删除
        title:title,
        content:content,
        starttime:starttime,
        endtime:endtime,
        place:place
     }*/
     EditSchedule(params){
        return axios.post('/Schedule/EditSchedule.aspx',qs.stringify(params));
     }
     // 其他接口…………
 }
 export default scheduleapi;
