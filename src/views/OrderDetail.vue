<template>
  <div class="detailBox">
    <airshowCarousel :type="15"></airshowCarousel>
    <ul class="detailList listbox">
      <!--<li class="clearfix"><b class="name">订单编号:</b><span class="text">{{order_code}}</span></li>-->
      <li class="clearfix">
        <b class="name">门票类型</b>
        <span class="text">{{order_type_name}}</span>
      </li>
      <li class="clearfix" style="text-align:center" v-if="apply_status==2">
        <vue-qr
          :text="qrurl"
          :margin="0"
          colorDark="#000000"
          colorLight="#fff"
          :logoScale="0.3"
          :size="180"
          style="margin:0 auto"
        ></vue-qr>
      </li>
      <li class="clearfix">
        <b class="name">门票日期</b>
        <span class="text">{{ticket_date}}</span>
      </li>
      <li class="clearfix">
        <b class="name" v-html="'申请人　'"></b>
        <span class="text">{{client_name}}</span>
      </li>
      <li class="clearfix">
        <b class="name">{{client_cardtype}}</b>
        <span class="text">{{client_idcard}}</span>
      </li>
      <li class="clearfix">
        <b class="name">联系电话</b>
        <span class="text">{{client_phone}}</span>
      </li>
      <li class="clearfix">
        <b class="name">支付金额</b>
        <span class="text">{{ticket_cost}}元</span>
      </li>
      <li class="clearfix">
        <b class="name">订单状态</b>
        <span class="text">{{statusText}}</span>
      </li>
    </ul>
    <ul class="detailPersonList" v-if="ismail&&apply_status==3">
      <li class="clearfix">
        <b class="name">领取方式</b>
        <span class="text">{{receive_type_name}}</span>
      </li>
      <li class="clearfix">
        <b class="name">领取时间</b>
        <span class="text">{{receive_time}}</span>
      </li>
      <li class="clearfix">
        <b class="name">快递单号</b>
        <span
          class="text"
          style="color:cornflowerblue;text-decoration:underline"
          id="mailDetail"
        >{{mail_serial_num}}</span>
      </li>
      <li class="clearfix">
        <b class="name">收件信息</b>
        <div class="text">
          <p>{{addressee}} {{addressee_phone}}</p>
          <p style="padding-top: 10px;font-size: 14px;color: #999">{{addre}}</p>
        </div>
      </li>
    </ul>
    <div>
      <v-row justify="center">
        <v-col cols="4" v-if="apply_status==2">
          <van-button type="primary" block @click="mailList">门票邮寄</van-button>
        </v-col>
        <v-col cols="4" v-if="apply_status==0&&pay_status==1&&ticket_cost>0">
          <van-button type="warning" block @click="dialog = true">申请退款</van-button>
        </v-col>
        <v-col cols="4" v-if="apply_status==-1&&pay_status==0">
          <van-button type="primary" block @click="payAgain">重新支付</van-button>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">提示</v-card-title>

        <v-card-text>是否要退款</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">取消</v-btn>

          <v-btn color="green darken-1" text @click="refundMoney">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import vueQr from "vue-qr";
import airshowCarousel from "../components/Carousel";
import { Cell, CellGroup, Popup, NoticeBar, Button } from "vant";
export default {
  name: "OrderDetail",
  data() {
    return {
      action: "订票",
      imgs: [
        {
          src:
            "http://59.110.175.131:1111/upfiles/2019-07-31/h5_20190731205844240.jpg",
          isguanggao: true,
        },
        {
          src:
            "http://59.110.175.131:1111/upfiles/2019-07-31/h7_20190731205944651.jpg",
          isguanggao: false,
        },
      ],
      ismail: false,
      dialog: false,
      exhibition_name: "",
      exhibition_code: "",
      detail_id: "",
      client_name: "",
      client_idcard: "",
      client_phone: "",
      order_type_name: "",
      client_cardtype: "",
      ticket_date: "",
      ticket_cost: "",
      apply_time: "",
      receive_type_name: "",
      receive_time: "",
      addressee: "",
      mail_serial_num: "",
      addressee_phone: "",
      statusText: "",
      apply_status: "",
      pay_status: "",
      ordercode: "",
      qrurl: "",
      addre: "",
    };
  },
  components: {
    airshowCarousel,
    vueQr,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NoticeBar.name]: NoticeBar,
    [Button.name]: Button,
    [Popup.name]: Popup,
  },
  mounted() {
    var me = this;
    me.detail_id = this.$route.params.id;

    me.$api.orderapi.GetOrderDetail(me.detail_id).then((res) => {
      if (res.data.statusCode == "200") {
        me.exhibition_name = res.data.data.exhibition_name;
        me.exhibition_code = res.data.data.exhibition_code;
        me.qrurl = me.detail_id + "&_t=" + new Date().getTime();
        me.client_name = res.data.data.client_name;
        me.client_idcard = res.data.data.client_idcard;
        me.client_phone = res.data.data.client_phone;
        me.pay_status = res.data.data.pay_status;
        me.client_cardtype = "身份证";
        me.ordercode = res.data.data.ordercode;
        me.client_phone = res.data.data.client_phone;
        me.order_type_name = res.data.data.order_type_name;
        me.ticket_date = res.data.data.ticket_date;
        me.ticket_cost = res.data.data.ticket_cost;
        me.apply_time = res.data.data.apply_time;
        me.receive_type_name = res.data.data.receive_type_name;
        me.receive_time = res.data.data.receive_time;
        me.addressee = res.data.data.addressee;
        me.mail_serial_num = res.data.data.mail_serial_num;
        me.addressee_phone = res.data.data.addressee_phone;
        me.addre = res.data.data.addre;
        me.apply_status = res.data.data.apply_status;
        if (me.receive_type_name == "邮寄") {
          me.ismail = true;
        }
        switch (parseInt(me.apply_status)) {
          case -1:
            me.statusText = "待支付";
            break;
          case 2:
            me.statusText = "待领取";
            break;
          case 0:
            me.statusText = "待审核";
            break;
          case 1:
            me.statusText = "申请失败";
            break;
          case 3:
            var text = "已领取";
            if (me.ismail) {
              text = "已领取(" + me.mail_status_name + ")";
            }
            me.statusText = text;
            break;
          case 4:
            me.statusText = "已激活";
            break;
          case 5:
            me.statusText = "已退款";
            break;
        }
      }
    });
  },
  methods: {
    mailList() {
      this.$router.push({ name: "MailList" });
    },
    payAgain() {
      var me = this;
      window.location.href =
        "/appwxpay.aspx?token=" +
        me.$store.state.token +
        "&type=1" +
        "&ordercode=" +
        me.ordercode +
        "&total_fee=" +
        me.ticket_cost +
        "&exhibition_id=" +
        me.exhibition_id;
    },
    refundMoney() {
      let detail_id = this.$route.params.id;
      console.log(detail_id);
      this.$api.orderapi.RefundMoney(detail_id).then((res) => {
        if (res.data.statusCode == "200") {
          alert("退款成功!");
          window.location.reload();
        } else {
          alert("退款失败，请联系工作人员!");
          window.location.reload();
        }
      });
    },
  },
};
</script>


<style scoped>
body {
  background: #fff;
}
.listbox {
  /*height: calc(100vh - 150px);*/
  overflow: auto;
}
input,
a,
textarea {
  text-decoration: none;
  background-color: inherit;
  outline: none;
  color: inherit;
}
.clearfix:after {
  clear: both;
  display: block;
  visibility: hidden;
  height: 0;
  line-height: 0;
  content: "";
}
li,
ol {
  list-style: none;
}
.fullBody {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fff;
}
.cFRight {
  float: right;
}
.cFLeft {
  float: left;
}
.cDnone {
  display: none;
}
.iCYellow {
  color: #ecac47;
}
.iCOrigin {
  color: #f57d58;
}
.iCGreen {
  color: #75bc4a;
}
.iCBlue {
  color: #5eafee !important;
}
.iCPink {
  color: #e38bbf;
}
.staCBlue {
  color: #5eafee;
}
.staCOrigin {
  color: #ff9000;
}
.staCRed {
  color: #e84335;
}
.staCGreen {
  color: #4ec33a;
}
.cCTip {
  color: #b13a06;
}
/*background*/
.cBBlue {
  background: #5eafee;
}
.cBOrigin {
  background: #ff9000;
}
.cBRed {
  background: #e84335;
}
.cBGreen {
  background: #4ec33a;
}
/*font-size*/
.cFS13 {
  font-size: 13px;
}
.cFS14 {
  font-size: 14px !important;
}
.cFS18 {
  font-size: 18px !important;
}
/*width*/
.cCPoint {
  cursor: pointer;
}
.cPoint1 {
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.cPoint2 {
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.cCommonTip {
  line-height: 80px;
  border: 0 !important;
  text-align: center;
  color: #999;
  font-size: 16px;
  background: unset !important;
}
.empty-content {
  background: transparent !important;
  border: 0 !important;
}
.empty-content .empty-img {
  display: block;
  width: 100%;
}
.empty-content .empty-tip {
  text-align: center;
  line-height: 18px;
  font-size: 18px;
  color: #666;
  padding-bottom: 30px;
}
/*globeljs*/
.cCommonAlert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.cCommonAlert .pop-main {
  position: fixed;
  width: 80%;
  top: 40%;
  left: 50%;
  margin-left: -40%;
  background: #fff;
  border-radius: 5px;
  text-align: center;
  padding-bottom: 15px;
}

.cCommonAlert .tip {
  padding: 15px;
  line-height: 24px;
  color: #333;
}

.cCommonAlert .c-white-btn {
  display: inline-block;
  width: 100px;
  margin: 0 10px;
}

.c-white-btn {
  height: 35px;
  line-height: 35px;
  border: #ff547b solid 1px;
  border-radius: 5px;
  color: #ff547b;
  text-align: center;
  background: #fff;
  font-size: 16px;
}

.cart-tip-pop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  width: 80%;
  height: 50px;
  text-align: center;
  margin: auto auto;
  border-radius: 6px;
  z-index: 200;
}

.cart-tip-pop .cart-tip-shadow {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #000;
  opacity: 0.5;
}

.cart-tip-pop .cart-tip {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: #fff;
  font-size: 18px;
  line-height: 50px;
  margin: 0;
  padding: 0;
}

.h5-loading {
  width: 45px;
  height: 40px;
  margin: 5px auto 0;
}

.h5-loading > div {
  background-color: #67cf22;
  height: 30px;
  width: 5px;
  margin: 0 2px;
  display: inline-block;
  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}

.h5-loading .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.h5-loading .rect3 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.h5-loading .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.h5-loading .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes stretchdelay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.3);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}

@keyframes stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.3);
    -webkit-transform: scaleY(0.3);
  }
  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}

body {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
li,
ol {
  list-style: none;
}
.detailHeader {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100px;
  width: 100%;
  text-indent: 50px;
  color: #fff;
  font-size: 26px;
  font-weight: normal;
  line-height: 100px;
}
.detailHeader i {
  font-size: 5.6rem;
  padding-right: 23px;
  vertical-align: middle;
}
.detailBox {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: auto;
  background: #fff;
}
.detailBox .tip {
  padding-top: 35px;
  color: #e84335;
  font-size: 16px;
  text-indent: 12%;
}
.detailList {
  padding: 0 10%;
  margin: 15px 0 30px;
}
.detailList li {
  box-sizing: unset;
  padding: 13px 0;
  line-height: 20px;
  color: #666;
}
.detailList li:first-child {
  /*padding-top: 0;*/
}
.detailList li .name {
  display: block;
  float: left;
  width: 80px;
}
.detailList li .text {
  display: block;
  margin-left: 80px;
  margin-right: 20px;
}
.detailPersonList {
  border-top: #ccc solid 1px;
  padding-top: 20px;
  padding-left: 50px;
  margin-bottom: 20px;
}
.detailPersonList li {
  box-sizing: unset;
  padding: 13px 0;
  line-height: 20px;
  color: #666;
}
.detailPersonList li .name {
  display: block;
  float: left;
  width: 80px;
}
.detailPersonList li .text {
  display: block;
  margin-left: 80px;
  margin-right: 20px;
}
.detailList li .sta-content i {
  font-size: 22px;
  margin-right: 10px;
}
.detailList li .sta-content span {
  font-size: 20px;
}
.paybtnBox .blueBtn {
  background: #5eafee;
  color: #fff;
}
</style>