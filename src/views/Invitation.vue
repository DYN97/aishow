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
      <v-row justify="center">
        <v-col cols="24" style="text-align:center;color:red" >邀请码使用说明</v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="16" style="text-align:center">{{invitecodeInfomation}}</v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="passdialog" max-width="290">
      <v-card>
        <v-card-title class="headline" style="justify-content: center;">温馨提示</v-card-title>
        <v-card-text style="font-size:18px;margin-top:20px;text-align:center">
          <v-row v-for="item in restData" :key="item.id"><v-col>{{changeName(item.type)}}剩余次数:{{item.usable_qty}}</v-col></v-row>
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
      cardnum: "",
      restCount: 10,
      exhibitionCode: "",
      type:"",
      invitecodeInfomation:"",
      errmessage: "",
      faildialog: false,
      passdialog: false,
      restData:[]
    };
  },
  watch: {},
  mounted() {
    this.exhibitionCode = this.$route.params.exhibitionCode;
    this.type = this.$route.query.type;
    this.$api.commonapi.GetInfos().then(res => {
      if (res.data.statusCode == "200") {
        this.invitecodeInfomation = res.data.data.find(
          t => t.com_code == "1404"
        ).com_value;
      }
    });
  },
  methods: {
    changeName(type){
      switch(type){
        case 0:return "门票";
        case 1:return "工作证";
        case 2:return "观展服务";
        case 3:return "车证";
      }
    },
    CheckInvitation() {
      var me = this;
      me.$api.exhibitionapi
        .CheckInvitation(me.exhibitionCode, me.cardnum)
        .then(res => {
          if (res.data.statusCode == "200") {
            me.restData = res.data.data.detail;
            me.passdialog = true;
          } else {
            me.faildialog = true;
            me.errmessage = res.data.message;
          }
        });
    },
    ToTicketIndex() {
      if (this.type == "carTicket") {
        this.$router.push({
          name: "ApplyCarTicket",
          params: { exhibitionCode: this.exhibitionCode }
        });
      } else {
        this.$router.push({
          name: "VipTicketIndex",
          params: { exhibitionCode: this.exhibitionCode },
          query: { invite_code: this.cardnum }
        });
      }
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