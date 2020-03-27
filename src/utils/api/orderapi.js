/* jshint esversion: 6 */
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/service/' : '/api';

const orderapi = {
    // 获取菜单列表
    CreateOrder(params) {
        return axios.post('/Orders/CreateOrder.aspx',qs.stringify(params));
    },
    //设置菜单顺序
    CreateProductOrder(params) {
        return axios.post(`/Orders/CreateProductOrder.aspx`,qs.stringify(params));
    },
    GetServiceItems(productCode){
        return axios.get("/orders/GetServiceItems.aspx?productCode="+productCode);
    }
    // 其他接口…………
}
export default orderapi;
