<template>
  <div>
    <airshowCarousel :imgs="imgs"></airshowCarousel>

    <v-container  class="listbox">
      <v-tabs grow v-model="tabIndex">
        <v-tab :key="0" @click="tabIndex=0">申请赠票</v-tab>
        <v-tab :key="1"  @click="tabIndex=1">购买门票</v-tab>
        <v-tab :key="2"  @click="tabIndex=2">观展套餐</v-tab>
      </v-tabs>
      <div style="width:100%;border:1px #ccc solid;">
        <v-subheader isnet>{{action}}基本信息：</v-subheader>
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
                <option  v-for="date in exhibition.days" :key="date">{{date}}</option>
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
            ><label v-html="'姓　　名:'"></label></v-col>
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
      exhibition:{

        "exhibition_code":"","exhibition_name":"","tickets":[{"ticket_code":"ZH000320001","exhibition_code":"ZH00032","ticket_name":"A区门票","out_ticket_name":"A区门票","ticket_type":0,"row_num":"","column_num":"","ticket_cost":0.00,"remark":"赠票","deleted":0,"modifier":"","modify_time":""},{"ticket_code":"ZH000320002","exhibition_code":"ZH00032","ticket_name":"B区门票","out_ticket_name":"B区门票","ticket_type":0,"row_num":"","column_num":"","ticket_cost":0.00,"remark":"赠票","deleted":0,"modifier":"","modify_time":""},{"ticket_code":"ZH000320003","exhibition_code":"ZH00032","ticket_name":"东嘉宾区17日","out_ticket_name":"17日东嘉宾","ticket_type":1,"row_num":10,"column_num":100,"ticket_cost":0.00,"remark":"赠票","deleted":0,"modifier":"U000001","modify_time":"2019-10-07 16:12:10"},{"ticket_code":"ZH000320004","exhibition_code":"ZH00032","ticket_name":"西嘉宾区17日","out_ticket_name":"17日西嘉宾","ticket_type":1,"row_num":10,"column_num":100,"ticket_cost":0.00,"remark":"赠票","deleted":0,"modifier":"U000001","modify_time":"2019-10-07 16:13:02"},{"ticket_code":"ZH000320005","exhibition_code":"ZH00032","ticket_name":"东观礼台","out_ticket_name":"东观礼台","ticket_type":1,"row_num":9,"column_num":65,"ticket_cost":0.00,"remark":"赠票","deleted":0,"modifier":"U000001","modify_time":"2019-10-07 16:13:34"},{"ticket_code":"ZH000320006","exhibition_code":"ZH00032","ticket_name":"西观礼台","out_ticket_name":"西观礼台","ticket_type":1,"row_num":9,"column_num":65,"ticket_cost":0.00,"remark":"赠票","deleted":0,"modifier":"U000001","modify_time":"2019-10-07 16:13:48"},{"ticket_code":"ZH000320007","exhibition_code":"ZH00032","ticket_name":"东嘉宾区18-21","out_ticket_name":"18-21东嘉宾","ticket_type":1,"row_num":16,"column_num":125,"ticket_cost":0.00,"remark":"赠票","deleted":0,"modifier":"U000001","modify_time":"2019-10-07 16:15:30"},{"ticket_code":"ZH000320008","exhibition_code":"ZH00032","ticket_name":"西嘉宾区18-21","out_ticket_name":"18-21西嘉宾","ticket_type":1,"row_num":16,"column_num":125,"ticket_cost":0.00,"remark":"赠票","deleted":0,"modifier":"","modify_time":""},{"ticket_code":"ZH000320009","exhibition_code":"ZH00032","ticket_name":"东嘉宾区14日","out_ticket_name":"14日东嘉宾","ticket_type":1,"row_num":10,"column_num":100,"ticket_cost":0.00,"remark":"14日坐票","deleted":0,"modifier":"","modify_time":""},{"ticket_code":"ZH000320010","exhibition_code":"ZH00032","ticket_name":"西嘉宾区14日","out_ticket_name":"14日西嘉宾","ticket_type":1,"row_num":10,"column_num":100,"ticket_cost":0.00,"remark":"14日坐票","deleted":0,"modifier":"","modify_time":""},{"ticket_code":"ZH000320011","exhibition_code":"ZH00032","ticket_name":"东观礼台14日","out_ticket_name":"14日东观礼台","ticket_type":1,"row_num":9,"column_num":65,"ticket_cost":0.00,"remark":"","deleted":0,"modifier":"","modify_time":""},{"ticket_code":"ZH000320012","exhibition_code":"ZH00032","ticket_name":"西观礼台14日","out_ticket_name":"14日西观礼台","ticket_type":1,"row_num":9,"column_num":65,"ticket_cost":0.00,"remark":"","deleted":0,"modifier":"","modify_time":""}],"days":["2019-10-17","2019-10-18","2019-10-20","2019-10-21"]
      },
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
  mounted(){
    var me =this;
    let exhibition_code = this.$route.query.exhibition_code;
    this.$api.exhibitionapi.GetExhibitionDetaile(exhibition_code).then(res=>{
      if(res.status=="200"){
        if(res.data.statusCode=="200"){
          me.exhibition = res.data.data;
          me.form.applyDate = res.data.data.days[0];
        }
      }
      console.log(res);
    });
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