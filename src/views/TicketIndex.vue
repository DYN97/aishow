<template>
  <div>
    <airshowCarousel :type="11"></airshowCarousel>

    <v-container class="listbox">
      <!-- <v-tabs grow v-model="tabIndex">
        <v-tab :key="0" @click="tabIndex=0">申请赠票</v-tab>
        <v-tab :key="1" @click="tabIndex=1">购买门票</v-tab>
        <v-tab :key="2" @click="tabIndex=2">观展服务</v-tab>
      </v-tabs> -->
      <div style="width:100%">
        <van-notice-bar
          left-icon="volume-o"
          :scrollable="false"
        >
          <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
            <van-swipe-item v-for="item in rollingNotice" :key="item.id" @click="ToOutLink(item.information_content,'通知')">{{item.information_title}}</van-swipe-item>
          </van-swipe>
        </van-notice-bar>
        <!-- <v-subheader isnet>{{action}}基本信息</v-subheader> -->
        <div v-if="tabIndex==2" style="margin-bottom:20px">
          <van-card
            v-for="item in playPackages"
            :key="item.pro_code"
            :price="item.selling_price"
            :desc="item.pro_desc"
            :title="item.pro_name"
            :thumb="item.thumb?item.thumb:'http://59.110.175.131:1111/upfiles/2019-04-08/微信图片_20190331135313_20190408220305477.jpg'"
            @click="OpenDetailPage(item)"
          />
        </div>
        <v-form style="background-color:white">
          <!-- <v-row height="46px" no-gutters>
            <div align-self="center" class="tag-name" for="doc-ipt-3">
              <i class="iconfont">&#xe650;</i>观展日期
            </div>
            <div class="am-u-sm-8 list-right">
              <select
                style="width:95%;height:46px;background: url('http://ourjs.github.io/static/2015/arrow.png') no-repeat scroll right center transparent;"
                v-model="form.applyDate"
              >
                <option value>请选择</option>
                <option
                  v-for="date in exhibitionDates"
                  :key="date.value"
                  :value="date.value"
                >{{date.label}}</option>
              </select>
            </div>
          </v-row> -->
          <v-row height="46px" no-gutters v-if="tabIndex==2">
            <v-col style="color:red" class="tag-name" for="doc-ipt-3">
              <i class="iconfont" style="color:red">&#xe60f;</i>不含观展门票，请另行购买。
            </v-col>
          </v-row>
          <v-row height="46px" no-gutters v-if="tabIndex==2">
            <div align-self="center" class="tag-name" for="doc-ipt-3">
              <i class="iconfont" style="font-size: 19px;font-weight: normal">&#xe619;</i>套餐类型
            </div>
            <div class="am-u-sm-8 list-right">
              <select
                style="width:95%;height:46px;background: url('http://ourjs.github.io/static/2015/arrow.png') no-repeat scroll right center transparent;"
                v-model="form.playPackage"
              >
                <option value>请选择</option>
                <option
                  v-for="item in playPackages"
                  :key="item.pro_code"
                  :value="item.pro_code"
                >{{item.pro_name}}</option>
              </select>
            </div>
          </v-row>

          <v-row height="46px" no-gutters v-if="tabIndex==2" v-show="!form.playPackage==''">
            <div align-self="center" class="tag-name" for="doc-ipt-3">
              <i class="iconfont" style="font-size: 18px">&#xe655;</i>套餐档位
            </div>
            <div class="am-u-sm-8 list-right">
              <select
                style="width:95%;height:46px;background: url('http://ourjs.github.io/static/2015/arrow.png') no-repeat scroll right center transparent;"
                v-model="form.packageLevel"
              >
                <option
                  v-for="item in packageLevels"
                  :key="item.pro_code"
                  :value="item.pro_code"
                >{{item.pro_name+'(￥'+item.selling_price+')'}}</option>
              </select>
            </div>
          </v-row>
          <v-row height="46px" no-gutters v-if="tabIndex==2" v-show="!form.playPackage==''">
            <div align-self="center" class="tag-name" for="doc-ipt-3">
              <i class="iconfont" style="font-size: 18px">&#xe61d;</i>包车类型
            </div>
            <div class="am-u-sm-8 list-right">
              <select
                style="width:95%;height:46px;background: url('http://ourjs.github.io/static/2015/arrow.png') no-repeat scroll right center transparent;"
                v-model="form.carcode"
              >
                <option value>请选择</option>
                <option
                  v-for="item in carList"
                  :key="item.pro_code"
                  :value="item.pro_code"
                >{{item.pro_name+'(￥'+item.selling_price+')'}}</option>
              </select>
            </div>
          </v-row>
          <v-row no-gutters v-if="tabIndex==2" v-show="!form.playPackage==''">
            <div align-self="center" class="tag-name" for="doc-ipt-3">
              <i class="iconfont" style="font-size: 18px;font-weight: normal">&#xe61f;</i>单间
            </div>
            <div class="am-u-sm-8 list-right" style="margin-top: 13px">
              <van-checkbox v-model="form.needRoom" type="checkbox" required>需要单间</van-checkbox>
            </div>
          </v-row>
          <v-row no-gutters v-if="tabIndex==2" v-show="!form.playPackage==''">
            <div align-self="center" class="tag-name" for="doc-ipt-3">
              <i class="iconfont" style="font-size: 18px;font-weight: normal">&#xe61d;</i>接送机
            </div>
            <div class="am-u-sm-8 list-right" style="margin-top: 13px">
              <van-checkbox-group v-model="jiesongji" direction="horizontal">
                <van-checkbox name="接机" type="checkbox" required>接机</van-checkbox>
                <van-checkbox name="送机" type="checkbox" required>送机</van-checkbox>
              </van-checkbox-group>
            </div>
          </v-row>
          <v-row height="46px" no-gutters v-if="tabIndex==1">
            <div align-self="center" class="tag-name" for="doc-ipt-3">
              <i class="iconfont" style="font-size: 18px;">&#xe61c;</i>门票类型
            </div>
            <div class="am-u-sm-8 list-right">
              <select
                style="width:95%;height:46px;background: url('http://ourjs.github.io/static/2015/arrow.png') no-repeat scroll right center transparent;"
                v-model="form.TicketCode"
                @change="changeTicket"
              >
                <option value>请选择</option>
                <option
                  v-for="item in tickets"
                  :key="item.ticket_code"
                  :value="item.ticket_code"
                >{{item.out_ticket_name+'(￥'+item.ticket_cost+')'}}</option>
              </select>
            </div>
          </v-row>
          <v-row height="46px" no-gutters>
            <div align-self="center" class="tag-name" for="doc-ipt-3">
              <i class="iconfont">&#xe63f;</i>
              <label v-html="'姓　　名'"></label>
            </div>
            <div class="am-u-sm-8 list-right">
              <v-text-field
                class="mainForm"
                v-model="form.fullname"
                label="姓名与证件号码一致"
                hide-details="auto"
                height="30"
                single-line
                regular
              ></v-text-field>
            </div>
          </v-row>
          <v-row no-gutters>
            <div align-self="center" class="tag-name" for="doc-ipt-3">
              <i class="iconfont">&#xe690;</i>证件类型
            </div>
            <div align-self="center" class="am-u-sm-8 list-right">
              <select
                style="width:95%;height:46px;background: url('http://ourjs.github.io/static/2015/arrow.png') no-repeat scroll right center transparent;"
                v-model="form.cardtype"
                disabled="disabled"
              >
                <option v-for="item in cardtypes" :value="item.com_value" :key="item.com_code">{{item.com_name}}</option>                
              </select>
            </div>
          </v-row>
          <v-row no-gutters v-if="tabIndex==2">
            <div align-self="center" class="tag-name" for="doc-ipt-3">
              <i class="iconfont">&#xe690;</i>性别
            </div>
            <div align-self="center" class="am-u-sm-8 list-right">
              <select
                style="width:95%;height:46px;background: url('http://ourjs.github.io/static/2015/arrow.png') no-repeat scroll right center transparent;"
                v-model="form.sex"
              >
                <option value="1">男</option>
                <option value="0">女</option>
              </select>
            </div>
          </v-row>
          <v-row no-gutters>
            <div align-self="center" class="tag-name" for="doc-ipt-3">
              <i class="iconfont">&#xe614;</i>证件号码
            </div>
            <div class="am-u-sm-8 list-right">
              <v-text-field
                v-model="form.cardnum"
                class="mainForm"
                label="证件号与姓名一致"
                hide-details="auto"
                height="30"
                single-line
                regular
              ></v-text-field>
            </div>
          </v-row>
          <v-row no-gutters>
            <div align-self="center" class="tag-name" for="doc-ipt-3">
              <i class="iconfont">&#xe659;</i>联系电话
            </div>
            <div class="am-u-sm-8 list-right">
              <v-text-field
                maxlength="11"
                onkeyup="this.value=this.value.replace(/\D/g,'')"
                v-model="form.mobile"
                class="mainForm"
                label="有效的联系电话"
                hide-details="auto"
                height="30"
                single-line
                regular
              ></v-text-field>
            </div>
          </v-row>
          <v-row height="46px" no-gutters style="position: relative">
            <div align-self="center" class="tag-name" for="doc-ipt-3">
              <i class="iconfont">&#xe605;</i>验证码
            </div>
            <div class="am-u-sm-8 list-right">
              <v-text-field
                style="padding-bottom:12px"
                v-model="form.yanzhengma"
                label
                hide-details="auto"
                class="mainForm"
                height="30"
                maxlength="6"
                single-line
                regular
              ></v-text-field>
            </div>
            <div
              class="am-u-sm-8"
              align-self="center"
              style="position: absolute;right: 20px;bottom: 18px;"
            >
              <v-btn
                text
                bottom
                small
                width="85"
                :loading="YZMloading"
                :disabled="YZMloading"
                @click="SendIdentifyingCode"
                class="get-code"
              >
                获取验证码
                <template v-slot:loader>
                  <span style="color: rgba(255,255,255,0.5) !important;">重新发送({{CountDown}})</span>
                </template>
              </v-btn>
            </div>
          </v-row>
          <v-row height="46px" no-gutters class="agree-box">
            <p class="cCommonAgreeBox" sta="0" @click="agreementPass=!agreementPass">
              <i class="iconfont agree-icon" :class="{'iCblue':agreementPass}">&#xe63c;</i>
              <a :class="{'iCblue':agreementPass}" @click="showAgreement = true">同意{{xieyi}}协议</a>
            </p>
          </v-row>
          <v-row justify="center" style="margin: 0">
            <v-col cols="8" style="padding: 0 0 20px 0;">
              <v-btn block rounded color="primary" @click="submit" large dark>确认提交</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
      <van-popup v-model="showAgreement" position="left" :style="{width:'100%'}">
        <agreementPage :type="xieyi" @closeChoseBox="showAgreement=false" @confirm="agree" />
      </van-popup>
      <van-popup v-model="showDetail" position="left" :style="{width:'100%',height:'100%'}">
        <AirIframe :src="packageLink" :title="packageName" @closeChoseBox="showDetail=false" />
      </van-popup>
      <van-popup v-model="showorderdetail" position="bottom">
        <van-collapse v-model="orderdetail">
          <van-collapse-item title="订单详情" name="1" disabled>
            <van-cell-group>
              <van-cell title="姓名" :value="form.fullname" />
              <van-cell title="证件号码" :value="form.cardnum" />
              <van-cell title="联系电话" :value="form.mobile" />
              <van-cell :title="'套餐('+levelName+')'" :value="'￥'+packageMoney" />
              <van-cell v-if="form.carcode" :title="'包车('+carName+')'" :value="'￥'+CarMoney" />
              <van-cell v-if="form.needRoom" title="单间" :value="'￥'+RoomMoney" />
              <van-cell v-if="jiesongji.length>0" title="接送机服务" :value="jiesongji.join(',')" />
            </van-cell-group>
            <van-cell-group>
              <van-cell title="总计" :value="'￥'+sumMoney" />
            </van-cell-group>
            <van-button type="primary" style="float:right;margin:20px 0" @click="SubmitForm">确认支付</van-button>
          </van-collapse-item>
        </van-collapse>
      </van-popup>
      <v-dialog v-model="workcardDialog" width="500">
        <v-card>
          <v-card-title class="headline">温馨提示</v-card-title>
          <v-card-text>{{workcardTips}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="workcardDialog = false">确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="zengpiaoDialog" width="500">
        <v-card>
          <v-card-title class="headline">赠票须知</v-card-title>
          <v-card-text>{{zengpiaoInfo}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="zengpiaoDialog = false">确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="goupiaoDialog" width="500">
        <v-card>
          <v-card-title class="headline">购票须知</v-card-title>
          <v-card-text>{{goupiaoInfo}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="goupiaoDialog = false">确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="guanzhanDialog" width="500">
        <v-card>
          <v-card-title class="headline">预购须知</v-card-title>
          <v-card-text>{{guanzhanInfo}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="guanzhanDialog = false">确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="growthDialog" width="500">
        <v-card>
          <v-card-title class="headline">温馨提示</v-card-title>
          <v-card-text>该档位于{{growth_date}}前为￥{{selling_price}}元,之后为￥{{growth_price}}元</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="growthDialog = false">确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>
<script>
import airshowCarousel from "../components/Carousel";
import AirIframe from "../components/AirIframe";
import agreementPage from "../components/agreementPage";
import {
  Card,
  Toast,
  Popup,
  NoticeBar,
  Cell,
  CellGroup,
  Collapse,
  Button,
  Checkbox,
  CheckboxGroup,
  Swipe,
  SwipeItem,
  CollapseItem,
} from "vant";
export default {
  name: "TicketIndex",
  data() {
    return {
      action: "赠票",
      xieyi: "赠票",
      showDetail: false,
      YZMloading: false,
      zengpiaoDialog: false,
      goupiaoDialog: false,
      guanzhanDialog: false,
      growthDialog: false,
      CountDown: 60,
      tabIndex: 0,
      packageName: "",
      levelName: "",
      carName: "",
      growth_date: "",
      growth_price: "",
      exhibition: {
        exhibition_code: "",
        exhibition_name: "",
        tickets: [],
        days: [],
      },
      zengpiaoInfo: "",
      goupiaoInfo: "",
      guanzhanInfo: "",
      orderdetail: ["1"],
      showorderdetail: false,
      tickets: [],
      lookUp: "0",
      exhibitionDates: [],
      ticketCost: 0,
      playPackages: [],
      packageLevels: [],
      carList: [],
      roomText: "",
      vifcode: "",
      workcards: [],
      packageLink: "",
      packageMoney: 0,
      jiesongji: [],
      selling_price: "",
      CarMoney: 0,
      RoomMoney: 0,
      showAgreement: false,
      agreementPass: false,
      workcardDialog: false,
      rollingNotice: [],
      cardtypes:[],
      firstGoupiao: true,
      firstGuanzhan: true,
      workcardTips: "",
      channel:"",
      form: {
        fullname: "",
        cardtype: 0,
        sex: 1,
        invite_code: "",
        cardnum: "",
        applyDate: "",
        mobile: "",
        company: "",
        duty: "",
        TicketCode: "",
        TicketName: "",
        playPackage: "",
        packageLevel: "",
        carcode: "",
        needRoom: "",
        roomcode: "",
        workcard: "",
        yanzhengma: ""
      },
    };
  },
  activated() {
    if (!this.$route.meta.isBack) {
      this.form = {
        fullname: "",
        cardtype: 0,
        invite_code: "",
        cardnum: "",
        applyDate: "",
        sex: 1,
        mobile: "",
        company: "",
        duty: "",
        TicketCode: "",
        TicketName: "",
        playPackage: "",
        packageLevel: "",
        carcode: "",
        needRoom: "",
        workcard: "",
        yanzhengma: "",
      };
      this.agreementPass = false;
      this.jiesongji = [];
    }
  },
  watch: {
    $route(to, from) {
      // 如果要to(进入)的页面是需要keepAlive缓存的，把name push进include数组中
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      // 如果 要 form(离开) 的页面是 keepAlive缓存的，
      // 再根据 deepth 来判断是前进还是后退
      // 如果是后退：
      if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
        const index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    },
    YZMloading(val) {
      if (val) {
        let cd = setInterval(() => {
          this.CountDown -= 1;
          if (this.CountDown == 0) {
            clearInterval(cd);
            this.YZMloading = false;
            this.CountDown = 60;
          }
        }, 1000);
      }
    },
    tabIndex(val) {
      this.agreementPass = false;
      if (val == 0) {
        this.action = "赠票";
        this.xieyi = "赠票";
      } else if (val == 1) {
        this.action = "购票";
        this.xieyi = "购票";
        if (this.firstGoupiao) {
          this.goupiaoDialog = true;
          this.firstGoupiao = false;
        }
      } else if (val == 2) {
        if (this.firstGuanzhan) {
          this.guanzhanDialog = true;
          this.firstGuanzhan = false;
        }
        this.action = "观展服务";
        this.xieyi = "购买";
      }
      this.form = {
        fullname: "",
        cardtype: 0,
        invite_code: "",
        cardnum: "",
        applyDate: "",
        sex: 1,
        mobile: "",
        company: "",
        duty: "",
        TicketCode: "",
        TicketName: "",
        playPackage: "",
        packageLevel: "",
        carcode: "",
        needRoom: "",
        workcard: "",
        yanzhengma: ""
        
      };
    },
    "form.playPackage": function (val) {
      this.GetServiceItems("level", val);
      console.log(val);
    },
    "form.packageLevel": function (val) {
      var chose = this.packageLevels.find((t) => t.pro_code == val);
      this.growth_date = chose.growth_date ? chose.growth_date : "";
      this.growth_price = chose.growth_price ? chose.growth_price : "";
      this.selling_price = chose.selling_price ? chose.selling_price : "";
      this.levelName = chose.pro_name;
      this.GetServiceItems("room", val);
      if (new Date(this.growth_date) < new Date()) {
        this.packageMoney = parseInt(this.growth_price);
      } else {
        this.packageMoney = parseInt(this.selling_price);
      }
      if (this.tabIndex == 2 && !this.guanzhanDialog) this.growthDialog = true;
    },
    "form.carcode": function (val) {
      var choseCar = this.carList.find((t) => t.pro_code == val);
      this.CarMoney = choseCar.selling_price;
      this.carName = choseCar.pro_name;
    },
  },
  computed: {
    sumMoney() {
      var mon = this.CarMoney + this.RoomMoney + this.packageMoney;
      return mon;
    },
  },
  mounted() {
    var me = this;
    let exhibition_code = this.$route.params.exhibitionCode;
    this.channel = localStorage.getItem("channel");
    this.tabIndex = 1;
    this.$api.commonapi.GetRollingInformation().then((res) => {
      if (res.data.statusCode == "200") {
        me.rollingNotice = res.data.data;
      }
    });
    this.$api.commonapi.GetInfos().then((res) => {
      if (res.data.statusCode == "200") {
        me.zengpiaoInfo = res.data.data.find(
          (t) => t.com_code == "1401"
        ).com_value;
        me.zengpiaoDialog = this.tabIndex == 0 ? true : false;
        me.goupiaoInfo = res.data.data.find(
          (t) => t.com_code == "1402"
        ).com_value;
        me.guanzhanInfo = res.data.data.find(
          (t) => t.com_code == "1403"
        ).com_value;
        
      }
    });
    this.$api.commonapi.GetCards().then(res=>{
      if (res.data.statusCode == "200") {
        me.cardtypes = res.data.data;
      }
    });
    this.$api.exhibitionapi
      .GetExhibitionDetaile(exhibition_code)
      .then((res) => {
        if (res.status == "200") {
          if (res.data.statusCode == "200") {
            me.exhibition = res.data.data;
            me.exhibitionDates = [];
            me.exhibition.days.forEach((t) => {
              var data = t.split("|");
              me.exhibitionDates.push({
                label: data[0] + "(" + data[1] + ")",
                value: data[0],
              });
            });
            me.tickets = res.data.data.tickets.filter((t) => t.apple_type == 0);
            me.form.applyDate = me.exhibitionDates[0].value;
            me.form.TicketCode = me.tickets[0].ticket_code;
            me.ticketCost = me.tickets[0].ticket_cost;
          }
        }
      });
    me.GetServiceItems("package", "FW1102");
  },
  methods: {
    GetServiceItems(type, code) {
      let exhibition_code = this.$route.params.exhibitionCode;
      var me = this;
      this.$api.orderapi.GetServiceItems(code, exhibition_code).then((res) => {
        if (res.status == "200") {
          if (res.data.statusCode == "200") {
            if (type == "package") {
              me.playPackages = res.data.data;
              if (res.data.data && res.data.data.length > 0) {
                me.form.playPackage = res.data.data[0].pro_code;
              }
            } else if (type == "level") {
              me.packageLevels = res.data.data.filter(
                (t) => t.com_code == "1102"
              );
              me.GetServiceItems(
                "car",
                res.data.data.find((t) => t.com_code == "11").pro_code
              );
              me.form.packageLevel = me.packageLevels[0].pro_code;
              me.packageMoney = me.packageLevels[0].selling_price;
            } else if (type == "car") {
              if (res.data.data && res.data.data.length > 0) {
                me.carList = res.data.data;
              }
            } else {
              me.form.roomcode = res.data.data[0].pro_code;
              me.RoomMoney = res.data.data[0].selling_price;
            }
          }
        }
      });
    },
    OpenDetailPage(item) {
      this.$router.push({
        name: "outHtml",
        query: {
          url: item.pro_detail_url,
          title: item.pro_name,
        },
      });
      // this.showDetail = true;
      // this.packageName = item.pro_name;
      // this.packageLink = item.pro_detail_url;
    },
    SendIdentifyingCode() {
      if (!this.isPhone(this.form.mobile)) {
        Toast("请填写正确的手机号码！");
        return false;
      }
      var charactors = "1234567890";
      var value = "",
        i,
        j;
      for (j = 1; j <= 6; j++) {
        i = parseInt(10 * Math.random());
        value = value + charactors.charAt(i);
      }
      this.vifcode = value;
      this.YZMloading = true;
      this.$api.commonapi
        .SendIdentifyingCode(this.form.mobile, this.vifcode)
        .then((res) => {
          if (res.data.statusCode == "200") {
            Toast("发送成功，请注意查收！");
          } else {
            console.log(res.data);
          }
        });
    },
    ToOutLink(url, title) {
      this.$router.push({
        name: "outHtml",
        query: {
          url: url,
          title: title,
        },
      });
      // this.showDetail = true;
      // this.packageName = title;
      // this.packageLink = url;
    },
    agree() {
      this.showAgreement = false;
      this.agreementPass = true;
    },
    isPhone: function (phone) {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
        return false;
      } else {
        return true;
      }
    },
    isIDCard: function (idnumber) {
      if (!idnumber || idnumber.length < 0) return false;
      if (idnumber.length == 15) return false;
      if (idnumber.length != 18) return false;
      idnumber = idnumber.toUpperCase();
      if (!/^\d{17}([\dx])$/i.test(idnumber)) return false;
      var address =
        "11x22x35x44x53x12x23x36x45x54x13x31x37x46x61x14x32x41x50x62x15x33x42x51x63x21x34x43x52x64x65x71x81x82x91";
      var twostr = idnumber.substr(0, 2);
      if (address.indexOf(twostr) < 0) return false;
      var year = idnumber.substr(6, 4);
      if (year <= 1900 || year >= new Date().getFullYear()) return false;
      var m = idnumber.substr(10, 2) * 1;
      if (m < 1 || m > 12) return false;
      var d = idnumber.substr(12, 2) * 1;
      if (d < 1 || d > 31) return false;
      var arrVarifyCode = "1,0,X,9,8,7,6,5,4,3,2".split(",");
      var Wi = "7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2".split(",");
      var sum = 0;
      for (var i = 0; i < 17; i++) {
        var num = idnumber.substr(i, 1) * 1;
        sum += Wi[i] * 1 * num;
      }
      var n = sum % 11;
      if (arrVarifyCode[n] != idnumber.substr(17, 1)) return false;
      return true;
    },
    changeTicket() {
      var me = this;
      var choseTicket = this.exhibition.tickets.find(
        (t) => t.ticket_code == me.form.TicketCode
      );
      this.ticketCost = choseTicket.ticket_cost;
      me.showCardDetail("ticket", choseTicket.remark);
    },
    async CheckCode() {},
    showCardDetail(type, text) {
      var me = this;
      if (type == "card") {
        var info = this.workcards.find((t) => t.pro_code == me.form.workcard);
        me.workcardTips = info.purchase_tips;
      }
      if (text) {
        me.workcardTips = text;
      }

      me.workcardDialog = true;
    },
    async submit() {
      var me = this;
      let _name = this.form.fullname,
        // _applyDate = this.form.applyDate,
        _TicketCode = this.form.TicketCode,
        _playPackage = this.form.playPackage,
        _tel = this.form.mobile,
        _idcard = this.form.cardnum,
        cardtype = this.form.cardtype,
        yanzhengma = this.form.yanzhengma;

      if (_name.length < 2) {
        Toast("请填写姓名！");
        this.once = true;
        return;
      }
      if (!this.agreementPass) {
        Toast("请阅读免责声明！");
        this.once = true;
        return;
      }
      if (_idcard.length == 0) {
        Toast("请填写证件号码！");
        this.once = true;
        return;
      }
      // if (_applyDate == "") {
      //   Toast("请选择观展日期！");
      //   this.once = true;
      //   return;
      // }
      if (cardtype == 0 && (_idcard.length != 18 || !this.isIDCard(_idcard))) {
        Toast("请填写正确的身份证号！");
        this.once = true;
        return;
      }
      if (_tel.length < 11 || !this.isPhone(_tel)) {
        Toast("请填写有效的联系电话！");
        this.once = true;
        return;
      }
      if (this.tabIndex == "1" && _TicketCode == "") {
        Toast("请选择门票类型！");
        this.once = true;
        return;
      }
      if (this.tabIndex == "2" && _playPackage == "") {
        Toast("请选择套餐类型！");
        this.once = true;
        return;
      }
      if (!yanzhengma || yanzhengma.length < 4) {
        Toast("请输入正确的验证码");
        this.once = true;
        return;
      } else {
        var result = await this.$api.commonapi.CheckCode(
          this.vifcode,
          this.form.yanzhengma
        );

        if (result.data.statusCode != "200") {
          Toast("请输入正确的验证码");
          this.once = true;
          return;
        }
      }
      if (this.tabIndex != 2) {
        let params = {
          persons: JSON.stringify([
            {
              Name: this.form.fullname,
              Idcard: this.form.cardnum,
              CardType: this.form.cardtype,
              Mobile: this.form.mobile,
              TicketDate: this.form.applyDate,
              Type: this.tabIndex,
              TicketCode: this.form.TicketCode,
              Sex: this.form.sex,
              TicketCost: this.ticketCost,
            },
          ]),
          type: this.tabIndex,
          exhibition_id: this.exhibition.exhibition_code,
          channel:this.channel
        };
        this.$api.orderapi.CreateOrder(params).then((res) => {
          if (res.data.statusCode == "200") {
            if (this.tabIndex == 0) {
              this.$router.push({
                name: "Result",
                params: {
                  result: "success",
                },
                query: {
                  type: "0",
                  order_code: res.data.data.ordercode,
                  exhibition_id: this.exhibition.exhibition_code,
                },
              });
            } else {
              window.location.href =
                "/appwxpay.aspx?token=" +
                me.$store.state.token +
                "&ordercode=" +
                res.data.data.ordercode +
                "&type=" +
                this.tabIndex +
                "&total_fee=" +
                res.data.data.money +
                "&exhibition_id=" +
                me.exhibition.exhibition_code +
                "&way=Normal";
            }
          } else {
            this.$router.push({
              name: "Result",
              params: {
                result: "fail",
              },
              query: {
                type: this.tabIndex,
                exhibition_id: this.exhibition.exhibition_code,
                message: res.data.message,
              },
            });
          }
        });
      } else {
        this.showorderdetail = true;
      }
    },
    SubmitForm() {
      var me = this;
      var is_tran = 0;
      if (this.jiesongji.length == 2) {
        is_tran = 3;
      } else {
        if (this.jiesongji.indexOf("接机") > -1) {
          is_tran = 1;
        }
        if (this.jiesongji.indexOf("送机") > -1) {
          is_tran = 2;
        }
      }
      let params = {
        client_name: this.form.fullname,
        client_idcard: this.form.cardnum,
        cliend_cardtype: this.form.cardtype,
        sex: this.form.sex,
        use_type: 2,
        client_phone: this.form.mobile,
        pro_code: this.form.packageLevel,
        exhibition_date: this.form.applyDate,
        buy_num: 1,
        jiesongji: is_tran,
      };
      var other = [];
      if (this.form.needRoom) {
        other.push(this.form.roomcode);
      }
      if (this.form.carcode != "") {
        other.push(this.form.carcode);
      }
      params.other = JSON.stringify(other);
      this.$api.orderapi.CreateProductOrder(params).then((res) => {
        if (res.data.statusCode == "200") {
          window.location.href =
            "/appwxpay.aspx?token=" +
            me.$store.state.token +
            "&ordercode=" +
            res.data.data.ordercode +
            "&type=" +
            this.tabIndex +
            "&total_fee=" +
            res.data.data.money +
            "&exhibition_id=" +
            me.exhibition.exhibition_code +
            "&way=Normal";
        } else {
          this.$router.push({
            name: "Result",
            params: {
              result: "fail",
            },
            query: {
              type: this.tabIndex,
              message: res.data.message,
              exhibition_id: this.exhibition.exhibition_code,
            },
          });
        }
      });
    },
  },
  components: {
    airshowCarousel,
    agreementPage,
    AirIframe,
    [Card.name]: Card,
    [Button.name]: Button,
    [NoticeBar.name]: NoticeBar,
    [Cell.name]: Cell,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [CellGroup.name]: CellGroup,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Popup.name]: Popup,
  },
};
</script>
<style scoped>
.van-card__title {
  color: #0f9ae0;
  font-size: 14px;
}
.van-card__content {
  padding: 10px 0 5px;
}
.cCommonAgreeBox .agree-icon {
  position: unset;
  font-size: 18px;
  padding: 0 8px 0 10px;
  line-height: 20px;
  vertical-align: text-bottom;
  color: #999;
}

.iCblue {
  color: #5eafee !important;
}
.cCommonAgreeBox a {
  color: #888;
  text-decoration: underline;
  font-size: 14px;
}
.ad {
  color: rgba(255, 255, 255, 0.4);
  position: absolute;
  bottom: 20px;
  right: 10px;
  font-size: 10px;
}
.mainForm {
  padding-bottom: 12px;
  width: 95%;
  margin: 0;
  padding-top: 8px;
}
.listbox {
  height: calc(100vh - 150px);
  overflow-y: auto;
  overflow-x: hidden;
}
.v-input {
  margin: 0 !important;
}
.v-subheader {
  background: #eef7ff;
  color: #333;
}
.listbox .tag-name .iconfont {
  /*position: absolute;*/
  /*left: 5px;*/
  /*top: 14px;*/
  line-height: 16px;
  color: #0f9ae0;
  font-size: 16px;
  font-weight: bold;
  margin-right: 5px;
}
.container {
  width: calc(100% - 24px);
  /* padding: 12px; */
  box-shadow: 1px 1px 5px #ddd;
  margin: 12px auto;
  padding: 0;
  height: calc(100vh - 180px);
  background: #fff;
}
.agree-box {
  border-top: #ddd solid 1px;
  padding-top: 15px;
}
.tag-name {
  position: relative;
  font-size: 16px;
  color: #666;
  width: 120px;
  height: 46px;
  line-height: 46px;
  overflow: hidden;
  text-indent: 12px;
}
.get-code {
  background: #ff9000;
  color: #fff !important;
  display: block;
  height: 26px;
  line-height: 26px;
  border-radius: 4px;
  padding: 0 5px !important;
  margin: 0 auto;
  box-sizing: border-box;
}
.list-right {
  width: calc(100% - 130px);
}
 .notice-swipe {
    height: 25px;
    line-height: 25px;
  }
</style>
