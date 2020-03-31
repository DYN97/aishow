<template>
  <div style="width:100%;overflow:hidden">
    <airshowCarousel :imgs="imgs"></airshowCarousel>
    <div v-if="type==1">
      <v-row>
        <v-col cols="12" style="text-align:center;height:150px" align-self="start">
          <span style="font-size:100px;color:green" class="icon iconfont icon-chenggong"></span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" style="text-align:center" align-self="center">
          <span style="font-size:20px;font-weight:bold">{{actionName}}支付成功</span>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" align-self="center">
          <span>观展日期：{{ticketDate}}</span>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" align-self="center">
          <span>门票类型：{{ticketType}}</span>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" align-self="center">
          <span>申请人：{{clientName}}</span>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" align-self="center">
          <span>联系电话：{{clientMobile}}</span>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-col cols="5" style="text-align:center" align-self="center">
          <v-btn>继续购买</v-btn>
        </v-col>
        <v-col cols="5" style="text-align:center" align-self="center">
          <v-btn>我的订单</v-btn>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12" style="text-align:center;height:150px" align-self="start">
          <span style="font-size:100px;color:red" class="icon iconfont icon-shanchu1"></span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" style="text-align:center" align-self="center">
          <span style="font-size:20px;font-weight:bold">支付失败</span>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10"  style="text-align:center" align-self="center">
          <span>请到我的订单继续完成支付</span>
        </v-col>
      </v-row>
      
      <v-row justify="space-around">
        <v-col cols="5" style="text-align:center" align-self="center">
          <v-btn><label v-html="'返　　回'"></label></v-btn>
        </v-col>
        <v-col cols="5" style="text-align:center" align-self="center">
          <v-btn>我的订单</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import airshowCarousel from "../components/Carousel";
export default {
  name: "Success",
  components: {
    airshowCarousel
  },
  mounted() {
    var me = this;
    me.type = this.$route.params.result=="success"?1:0;
    me.actionCode = this.$route.query.type;
    me.ordercode = this.$route.query.order_code;
    switch(me.actionCode){
      case "0":me.actionName = "门票";
              me.$api.orderapi.GetOrderInfo(me.ordercode).then(res=>{
                if(res.data.statusCode=="200"){
                  let detail = res.data.data.details[0];
                  me.ticketDate = detail.ticket_date.substring(0,10);
                  me.ticketType = "电子门票";
                  me.clientName = detail.client_name;
                  me.clientMobile = detail.client_phone;
                }
              });
      
      
      break;
      case "1":me.actionName = "服务包";
              me.$api.orderapi.GetServerOrderInfo(me.ordercode).then(res=>{
                if(res.data.statusCode=="200"){
                  let detail = res.data.data.details[0];
                  console.log(detail);
                }
              });
      break;
      case "2":me.actionName = "工作证";
       me.$api.orderapi.GetServerOrderInfo(me.ordercode).then(res=>{
                if(res.data.statusCode=="200"){
                  let detail = res.data.data.details[0];
                  console.log(detail);
                }
              });break;  
    }

  },
  data() {
    return {
      imgs: [
        {
          src:
            "http://59.110.175.131:1111/upfiles/2019-07-31/h5_20190731205844240.jpg",
          isguanggao: true
        },
        {
          src:
            "http://59.110.175.131:1111/upfiles/2019-07-31/h7_20190731205944651.jpg",
          isguanggao: false
        }
      ],
      type: 0,
      actionCode:"",
      ordercode:"",
      actionName:"",
      ticketDate:"",
      ticketType:"",
      clientName:"",
      clientMobile:""
    };
  }
};
</script>
<style scoped>
</style>