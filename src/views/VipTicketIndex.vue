<template>
  <div >
    <airshowCarousel :imgs="imgs"></airshowCarousel>

    <v-container  class="listbox">
      <v-tabs grow v-model="tabIndex">
        <v-tab :key="0" @click="tabIndex=0">申请赠票</v-tab>
        <v-tab :key="1"  @click="tabIndex=1">购买门票</v-tab>
        <v-tab :key="2"  @click="tabIndex=2">观展套餐</v-tab>
      </v-tabs>
      <div  style="width:100%;border:1px #ccc solid;">
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
          <v-row height="46px" no-gutters>
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            >观展日期:</v-col>
            <v-col cols="8" class="am-u-sm-8 list-right">
              <select style="width:95%;height:46px" v-model="form.applyDate">
                <option>2020-05-05</option>
                <option>2020-05-06</option>
                <option>2020-05-07</option>
              </select>
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
              <select style="width:95%;height:46px" v-model="form.ticketType">
                <option>电子门票（350元）</option>
                <option>实体门票（500元）</option>
                <option>VIP同票（2000元）</option>
              </select>
            </v-col>
          </v-row>
          <v-row height="46px" no-gutters>
            <v-col
              align-self="center"
              style="font-size: 16px;color: #666;text-indent: 20px;"
              cols="4"
              for="doc-ipt-3"
            ><label v-html="'姓　　名:'"></label>:</v-col>
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
            ><label v-html="'职　　务:'"></label></v-col>
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
import airshowCarousel from  "../components/Carousel";
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
      tabIndex:null,
      lookUp:"0",
      form: {
        fullname: "",
        cardtype: 0,
        cardnum: "",
        applyDate: "2020-05-05",
        mobile: "",
        ticketType: "电子门票（350元）",
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
    tabIndex(val){
      if(val==0){
        this.action = "赠票";
      }else if(val==1){
        this.action = "购票";
      }else{
        this.action = "观展服务";
      }
    }
  },
  components:{
      airshowCarousel
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
.listbox{
  height: calc(100vh - 150px);
  overflow: auto;
}
</style>