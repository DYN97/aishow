<template>
  <div>
    <airshowCarousel :type="11"></airshowCarousel>

    <v-container class="listbox">
      <v-tabs grow v-model="tabIndex">
        <v-tab :key="0" @click="tabIndex=0">申请赠票</v-tab>
        <v-tab :key="1" @click="tabIndex=1">购买门票</v-tab>
        <v-tab :key="2" @click="tabIndex=2">观展套餐</v-tab>
      </v-tabs>
      <div style="width:100%;border:1px #ccc solid;">
        <v-subheader isnet>{{action}}基本信息：</v-subheader>
        <div v-if="tabIndex==2" style="margin-bottom:20px">
          <van-card
            v-for="item in playPackages"
            :key="item.pro_code"
            :price="item.selling_price"
            :desc="item.pro_desc"
            :title="item.pro_name"
            thumb="http://59.110.175.131:1111/upfiles/2019-04-08/微信图片_20190331135313_20190408220305477.jpg"
          />
        </div>
        <v-form style="background-color:white">
          <v-row height="46px" no-gutters>
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            >观展日期:</v-col>
            <v-col cols="8" class="am-u-sm-8 list-right">
              <select style="width:95%;height:46px" v-model="form.applyDate">
                <option v-for="date in exhibition.days" :key="date">{{date}}</option>
              </select>
            </v-col>
          </v-row>
          <v-row height="46px" no-gutters v-if="tabIndex==2">
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            >套餐类型:</v-col>
            <v-col cols="8" class="am-u-sm-8 list-right">
              <select style="width:95%;height:46px" v-model="form.playPackage">
                <option
                  v-for="item in playPackages"
                  :key="item.pro_code"
                  :value="item.pro_code"
                >{{item.pro_name}}</option>
              </select>
            </v-col>
          </v-row>
          <v-row height="46px" no-gutters v-if="tabIndex==2">
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            >套餐档位:</v-col>
            <v-col cols="8" class="am-u-sm-8 list-right">
              <select style="width:95%;height:46px" v-model="form.packageLevel">
                <option
                  v-for="item in packageLevels"
                  :key="item.pro_code"
                  :value="item.pro_code"
                >{{item.pro_name}}</option>
              </select>
            </v-col>
          </v-row>
          <v-row no-gutters v-if="tabIndex==2">
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            >单独包车:</v-col>
            <v-col cols="8" class="am-u-sm-8 list-right">
              <v-checkbox v-model="form.needCar" :label="carText" type="checkbox" required></v-checkbox>
            </v-col>
          </v-row>
          <v-row height="46px" no-gutters v-if="tabIndex==1">
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            >门票类型:</v-col>
            <v-col cols="8" class="am-u-sm-8 list-right">
              <select style="width:95%;height:46px" v-model="form.TicketCode">
                <option
                  v-for="item in exhibition.tickets"
                  :key="item.ticket_code"
                  :value="item.ticket_code"
                >{{item.out_ticket_name}}</option>
              </select>
            </v-col>
          </v-row>
          <v-row height="46px" no-gutters>
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            >
              <label v-html="'姓　　名:'"></label>
            </v-col>
            <v-col cols="8" class="am-u-sm-8 list-right">
              <v-text-field
                class="mainForm"
                v-model="form.fullname"
                label="姓名与证件号码一致"
                hide-details="auto"
                height="30"
                single-line
                regular
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            >证件类型:</v-col>
            <v-col align-self="center" cols="8" class="am-u-sm-8 list-right">
              <select style="width:95%;height:46px" v-model="form.cardtype">
                <option value="0">身份证</option>
                <option value="1">护照</option>
                <option value="2">港澳通行证</option>
              </select>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            >证件号码:</v-col>
            <v-col cols="8" class="am-u-sm-8 list-right">
              <v-text-field
                v-model="form.cardnum"
                class="mainForm"
                label="证件号与姓名一致"
                hide-details="auto"
                height="30"
                single-line
                regular
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            >联系电话:</v-col>
            <v-col cols="8" class="am-u-sm-8 list-right">
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
            </v-col>
          </v-row>
          <v-row height="46px" no-gutters>
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            >验证码:</v-col>
            <v-col cols="4" class="am-u-sm-8 list-right">
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
            </v-col>
            <v-col cols="4" class="am-u-sm-8 list-right" align-self="center">
              <v-btn
                text
                style="width:80%"
                bottom
                small
                :loading="YZMloading"
                :disabled="YZMloading"
                @click="YZMloading = true"
              >
                获取手机验证码
                <template v-slot:loader>
                  <span>重新发送({{CountDown}})</span>
                </template>
              </v-btn>
            </v-col>
          </v-row>
          <v-row height="46px" no-gutters>
            <v-checkbox
              v-model="lookUp"
              value="1"
              label="订票须知及免责协议"
              type="checkbox"
              required
              style="margin-left:20px"
            ></v-checkbox>
          </v-row>
          <v-row justify="center">
            <v-col cols="8">
              <v-btn block rounded color="primary" large dark>确认提交</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-container>
  </div>
</template>
<script>
import airshowCarousel from "../components/Carousel";
import { Card, Toast } from "vant";
export default {
  name: "TicketIndex",
  data() {
    return {
      action: "订票",
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
      YZMloading: false,
      CountDown: 60,
      tabIndex: 0,
      exhibition: {
        exhibition_code: "",
        exhibition_name: "",
        tickets: [],
        days: []
      },
      lookUp: "0",
      ticketCost: 0,
      playPackages: [],
      packageLevels: [],
      carText: "",
      workcards: [],
      form: {
        fullname: "",
        cardtype: 0,
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
        needCar: "",
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
    },
    tabIndex(val) {
      if (val == 0) {
        this.action = "赠票";
      } else if (val == 1) {
        this.action = "购票";
      } else {
        this.action = "观展服务";
      }
    },
    "form.playPackage": function(val) {
      this.GetServiceItems("level", val);
    },
    "form.packageLevel": function(val) {
      this.GetServiceItems("car", val);
    }
  },
  computed: {},
  mounted() {
    var me = this;
    let exhibition_code = this.$route.params.exhibitionCode;
    this.$api.exhibitionapi.GetExhibitionDetaile(exhibition_code).then(res => {
      if (res.status == "200") {
        if (res.data.statusCode == "200") {
          me.exhibition = res.data.data;
          me.form.applyDate = res.data.data.days[0];
          me.form.TicketCode = res.data.data.tickets[0].ticket_code;
        }
      }
    });
    me.GetServiceItems("package", "FW1102");
  },
  methods: {
    GetServiceItems(type, code) {
      var me = this;
      this.$api.orderapi.GetServiceItems(code).then(res => {
        if (res.status == "200") {
          if (res.data.statusCode == "200") {
            if (type == "package") {
              me.playPackages = res.data.data;
              me.form.playPackage = res.data.data[0].pro_code;
            } else if (type == "level") {
              me.packageLevels = res.data.data;
              me.form.packageLevel = res.data.data[0].pro_code;
            } else if (type == "car") {
              me.form.carcode = res.data.data[0].pro_code;
              me.carText = res.data.data[0].pro_name;
            }
          }
        }
      });
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
    submit() {
      var me = this;
      let _name = this.form.fullname,
        _tel = this.form.mobile,
        _idcard = this.form.Idcard,
        cardtype = this.form.cardtype,
        yanzhengma = this.form.yanzhengma;

      if (_name.length < 2) {
        Toast("请填写姓名！");
        this.once = true;
        return;
      }
      if (_idcard.length == 0) {
        Toast("请填写证件号码！");
        this.once = true;
        return;
      }
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
      if (!yanzhengma || yanzhengma.length < 4) {
        Toast("请输入正确的验证码");
        this.once = true;
        return;
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
              TicketCost: this.ticketCost
            }
          ]),
          type: this.tabIndex,
          exhibition_id: this.exhibition.exhibition_code
        };
        this.$api.orderapi.CreateOrder(params).then(res => {
          if (res.data.statusCode == "200") {
            if (this.tabIndex == 0) {
              this.$router.push({
                name: "Result",
                params: {
                  result: "success"
                },
                query: {
                  type: 0
                }
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
                me.exhibition.exhibition_code+"&way=Normal";
            }
          }
          else
          {
            this.$router.push({
                name: "Result",
                params: {
                  result: "fail"
                },
                query: {
                  type: this.tabIndex,
                  message:res.data.message
                }
              });
          }
        });
      } else {
        let params = {
          client_name: this.form.fullname,
          client_idcard: this.form.cardnum,
          cliend_cardtype: this.form.cardtype,
          client_phone: this.form.mobile,
          pro_code: this.form.packageLevel,
          buy_num: 1
        };

        if (this.form.needCar) {
          params.other = [];
          params.other.push(this.form.carcode);
        }

        this.$api.orderapi.CreateProductOrder(params).then(res => {
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
              me.exhibition.exhibition_code+"&way=Normal";
          } else
          {
             this.$router.push({
                name: "Result",
                params: {
                  result: "fail"
                },
                query: {
                  type: this.tabIndex,
                  message:res.data.message
                }
              });
          }
        });
      }
    }
  },
  components: {
    airshowCarousel,
    [Card.name]: Card
  }
};
</script>
<style scoped>
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
}
.listbox {
  height: calc(100vh - 150px);
  overflow: auto;
}
</style>