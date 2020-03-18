 /* jshint esversion: 6 */
 import axios from '@/utils/http'; // 导入http中创建的axios实例
 import qs from 'qs'; // 根据需求是否导入qs模块

 axios.defaults.baseURL = process.env.NODE_ENV === 'production'?'/service/':'/api';

 const noticeapi = {
     // 新闻列表
     GetNoticeList (company_id,dept_id,page) {
         return axios.get('/notice/GetNoticeList.aspx?company_id='+company_id+'&dept_id='+dept_id+'&page='+page);
     },
     GetNoticeDetail(id){
         return axios.get(`/notice/GetNoticeDetail.aspx?id=`+id);
     },
     GetDepts(company_id){
        return axios.get(`/notice/GetDepts.aspx?company_id=`+company_id);
    },
     /*param={
        username:username,
        title:title,
        content:content,
        company_id:company_id,
        dept_ids:dept_ids
     }*/
     CreateNotice(params){
        return axios.post('/notice/CreateNotice.aspx',qs.stringify(params));
     },
      /*param={
        noticeid:noticeid,
        username:username,
        title:title,
        content:content,
        company_id:company_id,
        dept_ids:dept_ids
     }*/
     EditNotice(params){
        return axios.post('/notice/CreateNotice.aspx',qs.stringify(params));
     }
     // 其他接口…………
 }
 export default noticeapi;
