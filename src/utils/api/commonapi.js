/* jshint esversion: 6 */
import axios from '@/utils/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/service/' : '/api';

const commonapi = {
    // 获取菜单列表
    GetComCitys(pid,level) {
        return axios.get('/ss/GetComCitys.aspx?pid='+pid+'&level='+level);
    },
    //设置菜单顺序
    GetInformationList(type) {
        return axios.get(`/GetInformationList2.aspx?type_code=` + type);
    },
    AddClickData(id){
        return axios.get(`/AddClickData.aspx?id=` + id);
    },
    GetYunDaExpressInfo(mail_no){
        return axios.get(`/Express/GetYunDaExpressInfo.aspx?mail_no=` + mail_no);
    }
    // 其他接口…………
}
export default commonapi;
