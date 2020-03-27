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
          <span style="font-size:20px;font-weight:bold">门票支付成功</span>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" align-self="center">
          <span>观展日期：2020年11月10日</span>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" align-self="center">
          <span>门票类型：电子门票</span>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" align-self="center">
          <span>申请人：张三</span>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" align-self="center">
          <span>联系电话：13000000000</span>
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
      type: 0
    };
  }
};
</script>
<style scoped>
</style>