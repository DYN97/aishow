/* jshint esversion: 6 */
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/service/' : '/api';

const orderapi = {
    // 获取菜单列表
    CreateOrder(params) {
        return axios.post('/newOrders/CreateOrder.aspx',qs.stringify(params));
    },
    //设置菜单顺序
    CreateProductOrder(params) {
        return axios.post(`/newOrders/CreateProductOrder.aspx`,qs.stringify(params));
    },
    GetServiceItems(productCode){
        return axios.get("/newOrders/GetServiceItems.aspx?productCode="+productCode);
    },
    GetOrderInfo(order_code){
        return axios.get("/newOrders/GetOrderInfo.aspx?order_code="+order_code);
    },
    GetServerOrderInfo(order_code){
        return axios.get("/newOrders/GetServerOrderInfo.aspx?order_code="+order_code);
    },
    GetOrderList(status){
        return axios.get("/newOrders/GetOrderList.aspx?status="+status);
    },
    GetOrderList0424(status){
        return axios.get("/newOrders/GetOrderList0424.aspx?status="+status);
    },
    GetOrderDetail(detail_id){
        return axios.get("/newOrders/GetOrderDetaile.aspx?detail_id="+detail_id);
    },
    CreateMailOrder(params){
        return axios.post(`/newOrders/CreateMailOrder.aspx`,qs.stringify(params));
    },
    RefundMoney(detail_id){
        return axios.get("/newOrders/RefundMoney.aspx?order_detail_id="+detail_id);
    }
    // 其他接口…………
}
export default orderapi;
