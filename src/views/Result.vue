<template>
  <div style="width:100%;overflow:hidden">
    <airshowCarousel :type="11"></airshowCarousel>
    <div v-if="type==1">
      <v-row>
        <v-col cols="12" style="text-align:center" align-self="center">
          <span
            style="font-size: 40px;margin-top: 10px;color: rgb(95, 195, 100);position: relative;top: 7px;"
            class="icon iconfont iconfont-chenggong1"
          ></span>
          <span
            style="font-size:20px;font-weight:bold;line-height:40px;height:40px;display:inline-block"
          >{{actionName}}成功</span>
        </v-col>
      </v-row>
      <div
        style="width:80vw;margin:0 auto;box-shadow: 0px 6px 9.4px 0.6px rgba(4, 0, 0, 0.07);border-radius:6px;background:#ffffff"
      >
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
          <v-row justify="center">
            <v-col cols="10" align-self="center">
              <span  v-html="client_cardtype+'：'+client_idcard"></span>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="10" align-self="center">
              <span>支付金额：{{ticket_cost}}元</span>
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
              <span  v-html="client_cardtype+'：'+client_idcard"></span>
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
              <span  v-html="client_cardtype+'：'+client_idcard"></span>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="10" align-self="center">
              <span>支付金额：{{ticket_cost}}元</span>
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
        <div v-if="actionCode==5">
          <v-row justify="center">
            <v-col cols="10" style="text-align:center" align-self="center">
              <span>请等待审核</span>
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
      </div>

      <v-row v-if="actionCode!=4&&actionCode!=0" justify="space-around">
        <v-col cols="4" style="text-align:center" align-self="center">
          <v-btn block color="green" @click="reOrder(2)">{{way=='vip'?'继续购买':'观展服务'}}</v-btn>
        </v-col>
         <v-col cols="4" style="text-align:center" align-self="center" v-if="way=='vip'">
          <v-btn block color="green" @click="reOrder(1)">继续购买</v-btn>
        </v-col>
        <v-col cols="4" style="text-align:center" align-self="center">
          <v-btn block color="primary" @click="toRoute('OrderList')">我的订单</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="actionCode==0" justify="space-around">
        <v-col cols="4" style="text-align:center" align-self="center">
          <v-btn block color="error" @click="reOrder(0)">继续申请</v-btn>
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
          <span style="font-size:100px;color:red" class="icon iconfont iconfont-shanchu1"></span>
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
    console.log(result);
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
            me.ticketDate = detail.aticket_date.substring(0, 10);
            me.ticketType = "赠票";
           me.clientName = detail.client_name.substring(0,1)+'XX';
            me.clientMobile = detail.client_phone.substring(0,3)+'XXXX'+detail.client_phone.substring(7);
             me.client_idcard =detail.client_idcard.length=="18"?detail.client_idcard.substring(0,6)+"xxxxxxxx"+detail.client_idcard.substring(14):detail.client_idcard;
            switch (detail.aclient_card_type) {
              case 0:
                me.client_cardtype = "身份证　";
                break;
              case 1:
                me.client_cardtype = "护　照　";
                break;
              case 2:
                me.client_cardtype = "港澳通行证";
                break;
            }
          }
        });

        break;
      case "1":
        me.actionName = "门票付款";
        me.$api.orderapi.GetOrderInfo(me.ordercode).then(res => {
          if (res.data.statusCode == "200") {
            console.log(res);
            let detail = res.data.data.details[0];
            me.ticketDate = detail.aticket_date.substring(0, 10);
            me.ticketType = detail.bticket_name;
             me.clientName = detail.client_name.substring(0,1)+'XX';
            me.clientMobile = detail.client_phone.substring(0,3)+'XXXX'+detail.client_phone.substring(7);
             me.client_idcard =detail.client_idcard.length=="18"?detail.client_idcard.substring(0,6)+"xxxxxxxx"+detail.client_idcard.substring(14):detail.client_idcard;
            switch (detail.aclient_card_type) {
              case 0:
                me.client_cardtype = "身份证　";
                break;
              case 1:
                me.client_cardtype = "护　照　";
                break;
              case 2:
                me.client_cardtype = "港澳通行证";
                break;
            }
            me.ticket_cost = res.data.data.receivable_money;
          }
        });

        break;
      case "2":
        me.actionName = "服务包购买";
        me.$api.orderapi.GetServerOrderInfo(me.ordercode).then(res => {
          if (res.data.statusCode == "200") {
            let detail = res.data.data.details[0];
            me.ticketDate = detail.exhibition_date.substring(0, 10);

            me.packageType = res.data.data.parentname;
            var list = res.data.data.pro_name.split('-');
            me.packageLevel =list[list.length-1];
            me.clientName = detail.client_name.substring(0,1)+'XX';
            me.clientMobile = detail.client_phone.substring(0,3)+'XXXX'+detail.client_phone.substring(7);
             me.client_idcard =res.data.data.client_idcard.length=="18"?res.data.data.client_idcard.substring(0,6)+"xxxxxxxx"+res.data.data.client_idcard.substring(14):res.data.data.client_idcard;
            switch (res.data.data.cliend_cardtype) {
             case 0:
                me.client_cardtype = "身份证　";
                break;
              case 1:
                me.client_cardtype = "护　照　";
                break;
              case 2:
                me.client_cardtype = "港澳通行证";
                break;
            }
          }
        });

        break;
      case "3":
        me.actionName = "工作证购买";
        me.$api.orderapi.GetServerOrderInfo(me.ordercode).then(res => {
          if (res.data.statusCode == "200") {
            let detail = res.data.data.details[0];
            me.ticketDate = detail.exhibition_date.substring(0, 10);
            me.workcardType = detail.pro_name;
           me.clientName = detail.client_name.substring(0,1)+'XX';
            me.clientMobile = detail.client_phone.substring(0,3)+'XXXX'+detail.client_phone.substring(7);
             me.client_idcard =detail.client_idcard.length=="18"?detail.client_idcard.substring(0,6)+"xxxxxxxx"+detail.client_idcard.substring(14):detail.client_idcard;
            switch (detail.aclient_card_type) {
              case 0:
                me.client_cardtype = "身份证　";
                break;
              case 1:
                me.client_cardtype = "护　照　";
                break;
              case 2:
                me.client_cardtype = "港澳通行证";
                break;
            }
          }
          me.ticket_cost = res.data.data.receivable_money;
        });
        break;
      case "4":
        me.actionName = "邮寄申请";
        break;
      case "5":
        me.actionName = "车辆通行证申请";
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
      client_idcard: "",
      ticket_cost: "",
      client_cardtype: "",
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
        "&type=" +
        me.actionCode +
        "&ordercode=" +
        me.ordercode +
        "&total_fee=" +
        me.total_fee +
        "&exhibition_id=" +
        me.exhibition_id;
    },
    toRoute(name) {
      this.$router.push({
        name: name,
        query: {
          type: this.actionCode
        }
      });
    },
    reOrder(tab) {
      if (this.way == "vip") {
        this.$router.push({
          name: "Invitation",
          params: {
            exhibitionCode: this.exhibition_id
          }
        });
      } else {
        this.$router.push({
          path: "/TicketIndex/" + this.exhibition_id,
          query: {
            tabIndex: tab
          }
        });
      }
    }
  }
};
</script>
<style scoped>
</style>