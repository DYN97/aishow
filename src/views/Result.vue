<template>
  <div style="width:100%;overflow:hidden">
    <airshowCarousel :type="11"></airshowCarousel>
    <div v-if="type==1">
      <v-row>
        <v-col cols="12" style="text-align:center;height:150px" align-self="start">
          <span style="font-size:100px;color:green" class="icon iconfont icon-chenggong"></span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" style="text-align:center" align-self="center">
          <span style="font-size:20px;font-weight:bold">{{actionName}}成功</span>
        </v-col>
      </v-row>
      <div v-if="actionCode==1">
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
            <span v-html="'申请人　：'+clientName"></span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10" align-self="center">
            <span>联系电话：{{clientMobile}}</span>
          </v-col>
        </v-row>
      </div>
      <div v-if="actionCode==2">
        <v-row justify="center">
          <v-col cols="10" align-self="center">
            <span>观展日期：{{ticketDate}}</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10" align-self="center">
            <span>套餐类型：{{packageType}}</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10" align-self="center">
            <span>套餐档位：{{packageLevel}}</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10" align-self="center">
            <span v-html="'申请人　：'+clientName"></span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10" align-self="center">
            <span>联系电话：{{clientMobile}}</span>
          </v-col>
        </v-row>
      </div>
      <div v-if="actionCode==3">
        <v-row justify="center">
          <v-col cols="10" align-self="center">
            <span>观展日期：{{ticketDate}}</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10" align-self="center">
            <span>工作证类型：{{workcardType}}</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10" align-self="center">
            <span v-html="'申请人　：'+clientName"></span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10" align-self="center">
            <span>联系电话：{{clientMobile}}</span>
          </v-col>
        </v-row>
      </div>
      <div v-if="actionCode==4">
        <v-row justify="center">
          <v-col cols="10" style="text-align:center" align-self="center">
            <span>请注意查收</span>
          </v-col>
        </v-row>
      </div>
      <div v-if="actionCode==0">
        <v-row justify="center">
          <v-col cols="10" align-self="center">
            <span>观展日期：{{ticketDate}}</span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10" align-self="center">
            <span v-html="'申请人　：'+clientName"></span>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10" align-self="center">
            <span>联系电话：{{clientMobile}}</span>
          </v-col>
        </v-row>
      </div>
      <v-row v-if="actionCode!=4&&actionCode!=0" justify="space-around">
        <v-col cols="4" style="text-align:center" align-self="center">
          <v-btn block color="green" @click="reOrder">继续购买</v-btn>
        </v-col>
        <v-col cols="4" style="text-align:center" align-self="center">
          <v-btn block color="primary" @click="toRoute('OrderList')">我的订单</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="actionCode==0" justify="space-around">
        <v-col cols="4" style="text-align:center" align-self="center">
          <v-btn block color="error" @click="reOrder">继续申请</v-btn>
        </v-col>
        <v-col cols="4" style="text-align:center" align-self="center">
          <v-btn block color="primary" @click="toRoute('OrderList')">我的订单</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="actionCode==4" justify="space-around">
        <v-col cols="4" style="text-align:center" align-self="center">
          <v-btn block color="error" @click="toRoute('MailList')">返回</v-btn>
        </v-col>
        <v-col cols="4" style="text-align:center" align-self="center">
          <v-btn block color="primary" @click="toRoute('OrderList')">我的订单</v-btn>
        </v-col>
      </v-row>
    </div>
    <div v-else-if="type==0">
      <v-row>
        <v-col cols="12" style="text-align:center;height:150px" align-self="start">
          <span style="font-size:100px;color:red" class="icon iconfont icon-shanchu1"></span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" style="text-align:center" align-self="center">
          <span style="font-size:20px;font-weight:bold">{{actionName}}提交失败</span>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" style="text-align:center" align-self="center">
          <span>{{message}}</span>
        </v-col>
      </v-row>

      <v-row justify="space-around">
        <v-col cols="4" style="text-align:center" align-self="center">
          <v-btn block color="error" @click="back">返回</v-btn>
        </v-col>
        <v-col cols="4" style="text-align:center" align-self="center">
          <v-btn block color="primary" @click="toRoute('OrderList')">我的订单</v-btn>
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
          <span style="font-size:20px;font-weight:bold">{{actionName}}支付失败</span>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="10" style="text-align:center" align-self="center">
          <span>请点击继续完成支付</span>
        </v-col>
      </v-row>

      <v-row justify="space-around">
        <v-col cols="4" style="text-align:center" align-self="center">
          <v-btn block color="error" @click="payAgain">继续支付</v-btn>
        </v-col>
        <v-col cols="4" style="text-align:center" align-self="center">
          <v-btn block color="primary" @click="toRoute('OrderList')">我的订单</v-btn>
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
    var result = this.$route.params.result;
    if (result == "success") {
      me.type = 1;
    } else if (result == "payfail") {
      me.type = 2;
    } else {
      me.type = 0;
    }
    me.actionCode = this.$route.query.type;
    me.ordercode = this.$route.query.order_code;
    me.message = this.$route.query.message;
    me.exhibition_id = this.$route.query.exhibition_id;
    me.total_fee = this.$route.query.total_fee;
    me.way = this.$route.query.way;
    switch (me.actionCode) {
      case "0":
        me.actionName = "门票申请";
        me.$api.orderapi.GetOrderInfo(me.ordercode).then(res => {
          if (res.data.statusCode == "200") {
            let detail = res.data.data.details[0];
            me.ticketDate = detail.ticket_date.substring(0, 10);
            me.ticketType = "电子门票";
            me.clientName = detail.client_name;
            me.clientMobile = detail.client_phone;
          }
        });

        break;
      case "1":
        me.actionName = "门票付款";
        me.$api.orderapi.GetOrderInfo(me.ordercode).then(res => {
          if (res.data.statusCode == "200") {
            let detail = res.data.data.details[0];
            me.ticketDate = detail.ticket_date.substring(0, 10);
            me.ticketType = "电子门票";
            me.clientName = detail.client_name;
            me.clientMobile = detail.client_phone;
          }
        });

        break;
      case "2":
        me.actionName = "服务包购买";
        me.$api.orderapi.GetServerOrderInfo(me.ordercode).then(res => {
          if (res.data.statusCode == "200") {
            let detail = res.data.data.details[0];
            // me.ticketDate = detail.ticket_date.substring(0,10);

            me.packageType = detail.parentname;
            me.packageLevel = detail.pro_name;
            me.clientName = detail.client_name;
            me.clientMobile = detail.client_phone;
          }
        });

        break;
      case "3":
        me.actionName = "工作证购买";
        me.$api.orderapi.GetServerOrderInfo(me.ordercode).then(res => {
          if (res.data.statusCode == "200") {
            let detail = res.data.data.details[0];
            // me.ticketDate = detail.ticket_date.substring(0,10);
            me.workcardType = detail.pro_name;
            me.clientName = detail.client_name;
            me.clientMobile = detail.client_phone;
          }
        });
        break;
      case "4":
        me.actionName = "邮寄申请";
        break;
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
      type: 1,
      actionCode: "",
      exhibition_id: "",
      total_fee: "",
      message: "",
      way: "",
      ordercode: "",
      actionName: "",
      ticketDate: "",
      ticketType: "",
      clientName: "",
      clientMobile: "",
      packageType: "",
      packageLevel: "",
      workcardType: ""
    };
  },
  methods: {
    back() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push("/exhibitionList");
    },
    payAgain() {
      var me = this;
      window.location.href =
        "/appwxpay.aspx?token=" +
        me.$store.state.token +
        "&ordercode=" +
        me.ordercode +
        "&total_fee=" +
        me.total_fee +
        "&exhibition_id=" +
        me.exhibition_id;
    },
    toRoute(name) {
      this.$router.push({
        name: name
      });
    },
    reOrder() {
      if (this.way == "vip") {
        this.$router.push({
          name: "Invitation",
          params:{
            exhibitionCode:this.exhibition_id
          }
        });
      }else{
        this.$router.push({
          name: "TicketIndex",
          params:{
            exhibitionCode:this.exhibition_id
          }
        });
      }
    }
  }
};
</script>
<style scoped>
</style>