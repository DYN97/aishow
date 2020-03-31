<template>
  <div>
    <airshowCarousel :imgs="imgs"></airshowCarousel>
    <v-container class="listbox">
      <v-tabs grow v-model="tabIndex">
        <v-tab :key="0" @click="tabIndex=0">购买门票</v-tab>
        <v-tab :key="1" @click="tabIndex=1">观展套餐</v-tab>
        <v-tab :key="2" @click="tabIndex=2">工作证预订</v-tab>
      </v-tabs>
      <div style="width:100%;border:1px #ccc solid;">
        <v-subheader isnet>{{action}}基本信息：</v-subheader>
        <v-form style="background-color:white">
          <v-row no-gutters>
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            >邀请码:</v-col>
            <v-col cols="8" class="am-u-sm-8 list-right">
              <v-text-field
                v-model="form.invite_code"
                class="mainForm"
                hide-details="auto"
                disabled
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
            >观展日期:</v-col>
            <v-col cols="8" class="am-u-sm-8 list-right">
              <select style="width:95%;height:46px" v-model="form.applyDate">
                <option v-for="date in exhibition.days" :key="date">{{date}}</option>
              </select>
            </v-col>
          </v-row>
          <v-row height="46px" no-gutters v-if="tabIndex==1">
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
          <v-row height="46px" no-gutters v-if="tabIndex==1">
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
          <v-row no-gutters v-if="tabIndex==1">
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            >单独包车:</v-col>
            <v-col cols="8" class="am-u-sm-8 list-right">
               <v-checkbox
              v-model="needCar"
              :label="carText"
              type="checkbox"
              required
            ></v-checkbox>
            </v-col>
          </v-row>
          <v-row height="46px" no-gutters v-if="tabIndex==0">
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            >门票类型:</v-col>
            <v-col cols="8" class="am-u-sm-8 list-right">
              <select style="width:95%;height:46px" v-model="form.TicketCode">
                <option v-for="item in exhibition.tickets" :key="item.ticket_code" :value="item.ticket_code">{{item.out_ticket_name}}</option>
              </select>
            </v-col>
          </v-row>
          <v-row no-gutters v-if="tabIndex==2">
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            >证件类型:</v-col>
            <v-col align-self="center" cols="8" class="am-u-sm-8 list-right">
              <select style="width:95%;height:46px" v-model="form.workcard">
                <option v-for="item in workcards" :key="item.pro_code" :value="item.pro_code">{{item.pro_name}}</option>
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
          <v-row no-gutters>
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            >单位名称:</v-col>
            <v-col cols="8" class="am-u-sm-8 list-right">
              <v-text-field
                v-model="form.company"
                class="mainForm"
                label="填写单位名称"
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
            >
              <label v-html="'职　　务:'"></label>
            </v-col>
            <v-col cols="8" class="am-u-sm-8 list-right">
              <v-text-field
                v-model="form.duty"
                class="mainForm"
                label="填写职务"
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
              <v-btn block rounded color="primary" large dark @click="submit">确认提交</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-container>




  </div>
</template>
<script>
import airshowCarousel from "../components/Carousel";
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
      tabIndex: null,
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
          this.CountDown -= 10;
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
        this.action = "购票";
      } else if (val == 1) {
        this.action = "观展服务";
      } else {
        this.action = "工作证";
      }
    },
    "form.playPackage":function(val){
      //
      this.GetServiceItems("level",val);
    },
    "form.packageLevel":function(val){
      this.GetServiceItems("car",val);
    },
    "form.TicketCode":function(val){
      let choseTicket = this.exhibition.tickets.find(t=>t.pro_code==val);
      this.ticketCost = choseTicket.ticket_cost;
      this.form.TicketName = choseTicket.out_ticket_name;
      //this.GetServiceItems("car",val);
    }
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
            } else if(type=="car"){
              me.form.carcode = res.data.data[0].pro_code;
              me.carText = res.data.data[0].pro_name;
            }else {
              me.workcards = res.data.data;
              me.form.workcard = res.data.data[0].pro_code;
            }
          }
        }
      });
    },submit(){    
      var me = this;
      if(this.tabIndex==0){
        let params = {
          persons:JSON.stringify([{
            Name:this.form.fullname,
            Idcard:this.form.cardnum,
            CardType:this.form.cardtype,
            InviteCode:this.form.invite_code,
            Mobile:this.form.mobile,
            TicketDate:this.form.applyDate,
            Duty:this.form.duty,
            CompanyName:this.form.company,
            Type:"1",
            TicketCost:this.ticketCost
          }]),
          type:1,
          exhibition_id:this.exhibition.exhibition_code
        };
        this.$api.orderapi.CreateOrder(params).then(res=>{
          if(res.data.statusCode=="200"){
            window.location.href = "/appwxpay.aspx?ordercode=" + res.data.data.ordercode + "&total_fee=0.01&exhibition_id=" + me.exhibition.exhibition_code;

          }
        });

      }


    }
  },

  components: {
    airshowCarousel
  },
  mounted() {
    var me = this;
    let exhibition_code = this.$route.params.exhibitionCode;
    me.form.invite_code = this.$route.query.invite_code;
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
    me.GetServiceItems("workcard", "FW1101");
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