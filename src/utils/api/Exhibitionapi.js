/* jshint esversion: 6 */
import axios from '@/utils/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/service/' : '/api';

const exhibitionapi = {
    // 获取菜单列表
    GetExhibitionList() {
        return axios.get('/GetExhibitionList.aspx');
    },
    //设置菜单顺序
    GetExhibitionDetaile(id) {
        return axios.get(`/GetExhibitionDetaile.aspx?exhibition_id=` + id);
    }
    // 其他接口…………
}
export default exhibitionapi;
