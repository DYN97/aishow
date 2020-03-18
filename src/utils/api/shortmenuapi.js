/* jshint esversion: 6 */
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/service/' : '/api';

const shortmenuapi = {
    // 获取菜单列表
    GetCommonMenuList(username, company_id) {
        return axios.get('/Menu/GetCommonMenuList.aspx?username='+username+"&company_id="+company_id+"&timespan="+new Date().getTime());
    },
    //设置菜单顺序
    SetCommonMenuIndex(username,indexs) {
        var now = new Date();
        return axios.get(`/Menu/SetCommonMenuIndex.aspx?username=` + username + "&indexs=" + indexs);
    }
    // 其他接口…………
}
export default shortmenuapi;
