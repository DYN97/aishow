<template>
  <div>
    <airshowCarousel :type="17"></airshowCarousel>

    <v-container class="listbox">
      <v-row no-gutters>
        <v-col
          align-self="center"
          style="font-size: 16px;color: #666;text-indent: 20px;"
          cols="4"
          for="doc-ipt-3"
        >邀请码:</v-col>
        <v-col cols="8" class="am-u-sm-8 list-right">
          <v-text-field
            v-model="cardnum"
            class="mainForm"
            hide-details="auto"
            height="30"
            single-line
            regular
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="8">
          <v-btn block rounded color="primary" large dark @click="CheckInvitation">确认提交</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="passdialog" max-width="290">
      <v-card>
        <v-card-title class="headline" style="justify-content: center;">温馨提示</v-card-title>
        <v-card-text style="font-size:18px;margin-top:20px;text-align:center">
          该邀请码还可以使用
          <span style="color:red;font-size:20px">{{restCount}}</span>次
        </v-card-text>
        <v-card-actions style="justify-content: center;">
          <v-btn color="green darken-1" text @click="ToTicketIndex">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="faildialog" max-width="290">
      <v-card>
        <v-card-title class="headline" style="justify-content: center;">温馨提示</v-card-title>

        <v-card-text style="font-size:16px;margin-top:20px">{{errmessage}}</v-card-text>
        <v-card-actions style="justify-content: center;">
          <v-btn color="green darken-1" text @click="faildialog = false">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import airshowCarousel from "../components/Carousel";
export default {
  name: "Invitation",
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
      cardnum: "",
      restCount: 10,
      exhibitionCode:"",
      errmessage:"",
      faildialog: false,
      passdialog: false
    };
  },
  watch: {},
  mounted() {
   this.exhibitionCode= this.$route.params.exhibitionCode;
  },
  methods: {
    CheckInvitation(){
      var me = this;      
      me.$api.exhibitionapi.CheckInvitation(me.exhibitionCode,me.cardnum).then(res=>{
        if(res.data.statusCode=="200"){
          me.restCount = res.data.data.usable_qty;
          me.passdialog = true;
        }else{
          me.faildialog = true;
          me.errmessage = res.data.message;
        }
      });

    },
    ToTicketIndex(){
        this.$router.push({
            name: "VipTicketIndex",
            params: { exhibitionCode: this.exhibitionCode },
            query:{invite_code:this.cardnum}
          });

    }


  },
  components: {
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
.listbox {
  height: calc(100vh - 150px);
  overflow: auto;
}
</style>