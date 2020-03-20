<template>
  <div>
    <form
      class=" istBox"
      id="pass"
    >
      <v-row height="86px" no-gutters>
        <v-col align-self="center" style="font-size: 16px;color: #666;text-indent: 20px;" cols="4" for="doc-ipt-3" >姓　　名:</v-col>
        <v-col cols="8"  class="am-u-sm-8 list-right">
          <v-text-field label="姓名与证件号码一致" hide-details="auto"  height="30"   single-line outlined></v-text-field>
        </v-col>
      </v-row>
        <v-row no-gutters>
        <v-col align-self="center" style="font-size: 16px;color: #666;text-indent: 20px;" cols="4" for="doc-ipt-3" >
          证件类型:
        </v-col>
        <v-col align-self="center" cols="8" class="am-u-sm-8 list-right">
          <v-select
          v-model="cardType"
          :items="items"          
          outlined hide-details="auto" 
        ></v-select>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col align-self="center" style="font-size: 16px;color: #666;text-indent: 20px;" cols="4" for="doc-ipt-3" >
          证件号码:
        </v-col>
        <v-col cols="8"  class="am-u-sm-8 list-right">
          <v-text-field label="证件号与姓名一致" hide-details="auto"  height="30"  single-line outlined></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col align-self="center" style="font-size: 16px;color: #666;text-indent: 20px;" cols="4" for="doc-ipt-3" >
          联系电话:
        </v-col>
        <v-col cols="8"  class="am-u-sm-8 list-right">
            <v-text-field label="有效的联系电话" hide-details="auto"  height="30"  single-line outlined></v-text-field>
        </v-col>
      </v-row>
    </form>
  </div>
</template>
<script>
export default {
  name: "MainForm",

  data: () => ({
      items:[
          {value:"1",text:"身份证"},
          {value:"2",text:"护照"},
          {value:"3",text:"港澳通行证"}
      ],
      cardType:"1",




  })
};
</script>
<style scoped>
/* @import "../assets/iconfont/iconfont.css";
/* @import "../assets/amazeui.min.css"; */



</style>