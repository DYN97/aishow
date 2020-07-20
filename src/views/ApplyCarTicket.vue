<template>
  <div>
    <airshowCarousel :type="11"></airshowCarousel>

    <v-container class="listbox">
      <div style="width:100%">
        <van-notice-bar
          left-icon="volume-o"
          scrollable
          :text="rollingNotice.information_title"
          @click="ToOutLink(rollingNotice.information_content,'通知')"
        />
        
        <!-- <v-subheader isnet>{{action}}基本信息</v-subheader> -->
        <v-form style="background-color:white">
          <v-row height="46px" no-gutters>
            <div align-self="center" class="tag-name" for="doc-ipt-3">
              <i class="iconfont">&#xe63f;</i>
              <label v-html="'申请人'"></label>
            </div>
            <div class="am-u-sm-8 list-right">
              <v-text-field
                class="mainForm"
                v-model="form.fullname"
                label="填写申请人"
                hide-details="auto"
                height="30"
                single-line
                regular
              ></v-text-field>
            </div>
          </v-row>
           <v-row no-gutters >
             <div align-self="center" class="tag-name" for="doc-ipt-3">
              <i class="iconfont">&#xe614;</i>申请单位
            </div>
            <div class="am-u-sm-8 list-right">
              <v-text-field
                v-model="form.company"
                class="mainForm"
                label="申请单位"
                hide-details="auto"
                height="30"
                single-line
                regular
              ></v-text-field>
            </div>
          </v-row>
           <v-row no-gutters>
            <div align-self="center" class="tag-name" for="doc-ipt-3">
              <i class="iconfont">&#xe690;</i>申请类型
            </div>
            <div align-self="center" class="am-u-sm-8 list-right">
              <select
                style="width:95%;height:46px;background: url('http://ourjs.github.io/static/2015/arrow.png') no-repeat scroll right center transparent;"
                v-model="form.workcard"
              >
                 <option
                  v-for="item in workcards"
                  :key="item.pro_code"
                  :value="item.pro_code"
                >{{item.pro_name}}</option>
              </select>
            </div>
          </v-row>
          
          <v-row no-gutters>
            <div align-self="center" class="tag-name" for="doc-ipt-3">
              <i class="iconfont">&#xe614;</i>车牌号码
            </div>
            <div class="am-u-sm-8 list-right">
              <v-text-field
                v-model="form.carnum"
                class="mainForm"
                label="车牌号码"
                hide-details="auto"
                height="30"
                single-line
                regular
              ></v-text-field>
            </div>
          </v-row>
          <v-row height="88px" no-gutters>
            <div align-self="center" class="tag-name" for="doc-ipt-3" style="height:88px;line-height:88px">
              <i class="iconfont">&#xe650;</i>车头照片
            </div>
            <div class="am-u-sm-8 list-right">
              <van-uploader v-model="fileList" multiple :max-count="1" />
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
            <v-row no-gutters >
             <div align-self="center" class="tag-name" for="doc-ipt-3">
              <i class="iconfont">&#xe614;</i>备注
            </div>
            <div class="am-u-sm-8 list-right">
              <v-text-field
                v-model="form.other"
                class="mainForm"
                label="备注"
                hide-details="auto"
                height="30"
                single-line
                regular
              ></v-text-field>
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
    </v-container>
  </div>
</template>
<script>
import airshowCarousel from "../components/Carousel";
import agreementPage from "../components/agreementPage";
import { Card, Toast, Popup, NoticeBar,Uploader  } from "vant";
export default {
  name: "ApplyCarTicket",
  data() {
    return {
      action: "车辆通行证",
      xieyi: "车辆通行证",
      showDetail: false,
      YZMloading: false,
      CountDown: 60,
      tabIndex: 0,
      packageName: "",
      exhibition: {
        exhibition_code: "",
        exhibition_name: "",
        tickets: [],
        days: []
      },
      fileList:[],
      tickets: [],
      lookUp: "0",
      ticketCost: 0,
      playPackages: [],
      packageLevels: [],
      carList: [],
      roomText: "",
      vifcode: "",
      workcards: [],
      packageLink: "",
      showAgreement: false,
      agreementPass: false,
      workcardDialog: false,
      rollingNotice: [],
      workcardTips: "",
      
      form: {
        fullname: "",
        cardtype: 0,
        sex: 1,
        invite_code: "",
        cardnum: "",
        carnum:"",
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
      }
    };
  },
  watch: {
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
    }
  },
  computed: {},
  mounted() {
    var me = this;
    let exhibition_code = this.$route.params.exhibitionCode;
    this.exhibition.exhibition_code = exhibition_code;
    this.$api.commonapi.GetInformationList(31).then(res => {
      if (res.data.statusCode == "200") {
        me.rollingNotice = res.data.data;
      }
    });
    this.$api.exhibitionapi.GetExhibitionDetaile(exhibition_code).then(res => {
      if (res.status == "200") {
        if (res.data.statusCode == "200") {
          me.exhibition = res.data.data;
          me.form.applyDate = res.data.data.days[0];
        }
      }
    });
    me.GetServiceItems("package", "FW120103");


  },
  methods: {
    OpenDetailPage(item) {
      this.showDetail = true;
      this.packageName = item.pro_name;
      this.packageLink = item.pro_detail_url;
    },
    GetServiceItems(type, code) {
      var me = this;
      let exhibition_code = this.$route.params.exhibitionCode;
      this.$api.orderapi.GetServiceItems(code, exhibition_code).then(res => {
        if (res.status == "200") {
         
              if (res.data.data && res.data.data.length > 0) {
                me.form.workcard = res.data.data[0].pro_code;
                me.workcards =  res.data.data;
              }
            } 
            
          
        
      });
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
      for (j = 1; j <= 4; j++) {
        i = parseInt(10 * Math.random());
        value = value + charactors.charAt(i);
      }
      this.vifcode = value;
      this.YZMloading = true;
      this.$api.commonapi
        .SendIdentifyingCode(this.form.mobile, this.vifcode)
        .then(res => {
          if (res.data.statusCode == "200") {
            Toast("发送成功，请注意查收！");
          } else {
            console.log(res.data);
          }
        });
    },
    ToOutLink(url, title) {
      this.showDetail = true;
      this.packageName = title;
      this.packageLink = url;
    },
    agree() {
      this.showAgreement = false;
      this.agreementPass = true;
    },
    isPhone: function(phone) {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
        return false;
      } else {
        return true;
      }
    },
    isIDCard: function(idnumber) {
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
    async submit() {
      let _name = this.form.fullname,
        _applyDate = this.form.applyDate,
        _tel = this.form.mobile,
        _company = this.form.company,
        carnum = this.form.carnum,
        yanzhengma = this.form.yanzhengma;

      if (_name.length < 2) {
        Toast("请填写姓名！");
        this.once = true;
        return;
      }
       if (_company.length < 2) {
        Toast("请填写单位名称！");
        this.once = true;
        return;
      }
      if (!this.agreementPass) {
        Toast("请阅读免责声明！");
        this.once = true;
        return;
      }
      if (carnum.length == 0) {
        Toast("请填写车牌号码！");
        this.once = true;
        return;
      }
      if (_applyDate == "") {
        Toast("请选择观展日期！");
        this.once = true;
        return;
      }
      if (_tel.length < 11 || !this.isPhone(_tel)) {
        Toast("请填写有效的联系电话！");
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
        let params = {
          client_name: this.form.fullname,
          client_idcard: this.form.cardnum,
          carnum: this.form.carnum,
          cliend_cardtype: this.form.cardtype,
          rec_company:this.form.company,
          sex: this.form.sex,
          use_type: 3,
          client_phone: this.form.mobile,
          pro_code: this.form.workcard,
          exhibition_date: this.form.applyDate,
          buy_num: 1,
          photo:this.fileList[0].content
        };
        this.$api.orderapi.CreateProductOrder(params).then(res => {
          if (res.data.statusCode == "200") {
             this.$router.push({
                name: "Result",
                params: {
                  result: "success"
                },
                query: {
                  type: "5",
                  order_code: res.data.data.ordercode,
                  exhibition_id: this.exhibition.exhibition_code
                }
              });
          } else {
            this.$router.push({
              name: "Result",
              params: {
                result: "fail"
              },
              query: {
                type: "5",
                message: res.data.message,
                  exhibition_id: this.exhibition.exhibition_code
              }
            });
          }
        });
      }
    
  },
  components: {
    airshowCarousel,
    agreementPage,
    [Card.name]: Card,
    [NoticeBar.name]: NoticeBar,
    [Uploader.name]: Uploader,
    [Popup.name]: Popup
  }
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
</style>
