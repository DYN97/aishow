<template>
  <div>
    <airshowCarousel :type="14"></airshowCarousel>
    <v-tabs grow v-model="tabIndex">
        <v-tab :key="0" @click="tabIndex=0">门票</v-tab>
        <v-tab :key="1" @click="tabIndex=1">工作(车辆)证</v-tab>
        <v-tab :key="2" @click="tabIndex=2">服务产品</v-tab>
    </v-tabs>
    <div style="width:100%;border:1px #ccc solid;" class="listbox">
      <v-container v-if="tabIndex==0">

         <v-list three-line v-if="ticketitems.length==0" style="text-align:center">
           暂无数据
          </v-list>
        <fieldset v-else v-for="item in ticketitems" :key="item.exhibition_name" >
          <legend style="margin-left:20px">{{item.exhibition_name}}</legend>

          <v-list three-line>

            <template v-for="(childItem, index) in item.list">
              <v-divider v-if="index>0" :key="index"></v-divider>
              <v-list-item :key="childItem.order_detail_id" @click="toOrderDetail(childItem.order_detail_id)">
                <v-list-item-content style>
                  <v-list-item-title style="white-space:unset;font-size:16px">
                    <v-row no-gutters justify="space-between">
                      <v-col cols="3" style="color: #0f9ae0">{{childItem.order_type_name}}</v-col>
                      <v-col style="text-align:center" cols="7">{{childItem.ticket_date}}</v-col>
                      <v-col cols="2" class="list-sta">{{childItem.status_name}}</v-col>
                    </v-row>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-row no-gutters justify="space-between">
                      <v-col cols="3">{{childItem.client_name}}</v-col>
                      <v-col style="text-align:center" cols="7">{{childItem.client_idcard}}</v-col>
                      <v-col cols="2">￥{{childItem.ticket_cost}}</v-col>
                    </v-row>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </fieldset>
      </v-container>
       <v-container v-else-if="tabIndex==1">
         <v-list three-line v-if="carditems.length==0" style="text-align:center">
           暂无数据
          </v-list>
        <fieldset  v-else  v-for="item in carditems" :key="item.exhibition_name" >
          <legend style="margin-left:20px">{{item.exhibition_name}}</legend>

          <v-list three-line>
            <template v-for="(childItem, index) in item.list">
              <v-divider v-if="index>0" :key="index"></v-divider>
              <v-list-item :key="childItem.order_detail_id" @click="toCardDetail(childItem.order_detail_id)">
                <v-list-item-content style>
                  <v-list-item-title style="white-space:unset;font-size:16px">
                    <v-row no-gutters justify="space-between">
                      <v-col cols="3" style="color: #0f9ae0">{{childItem.order_type_name}}</v-col>
                      <v-col style="text-align:center" cols="7">{{childItem.ticket_date}}</v-col>
                      <v-col cols="2" class="list-sta">{{childItem.status_name}}</v-col>
                    </v-row>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-row no-gutters justify="space-between">
                      <v-col cols="2">{{childItem.client_name}}</v-col>
                      <v-col style="text-align:center" cols="7">{{childItem.client_idcard}}</v-col>
                      <v-col cols="2">￥{{childItem.ticket_cost}}</v-col>
                    </v-row>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </fieldset>
      </v-container>
      <v-container v-else>
        <v-list three-line v-if="sqitems.length==0" style="text-align:center">
           暂无数据
          </v-list>
        <fieldset   v-else v-for="item in sqitems" :key="item.exhibition_name" >
          <legend style="margin-left:20px">{{item.exhibition_name}}</legend>

          <v-list three-line>
            <template v-for="(childItem, index) in item.list">
              <v-divider v-if="index>0" :key="index"></v-divider>
              <v-list-item :key="childItem.order_detail_id" @click="toSqDetail(childItem.order_detail_id)">
                <v-list-item-content style>
                  <v-list-item-title style="white-space:unset;font-size:16px">
                    <v-row no-gutters justify="space-between">
                      <v-col cols="3" style="color: #0f9ae0">{{childItem.order_type_name}}</v-col>
                      <v-col style="text-align:center" cols="6">{{childItem.ticket_date}}</v-col>
                      <v-col cols="3" class="list-sta">{{childItem.status_name}}</v-col>
                    </v-row>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-row no-gutters justify="space-between">
                      <v-col cols="2">{{childItem.client_name}}</v-col>
                      <v-col style="text-align:center" cols="6">{{childItem.client_idcard}}</v-col>
                      <v-col cols="3">￥{{childItem.ticket_cost}}</v-col>
                    </v-row>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </fieldset>
      </v-container>
    </div>
  </div>
</template>
<script>
import airshowCarousel from "../components/Carousel";
export default {
  name: "OrderList",
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
      ticketitems:[],
      sqitems:[],
      carditems:[],
      tabIndex:0
    };
  },
  watch: {
   
  },
  mounted() {
    var me = this ;
    me.tabIndex = parseInt(this.$route.query.type); 
    me.$api.orderapi.GetOrderList0424("").then(res=>{
      if(res.data.statusCode=="200"){
        me.ticketitems = res.data.data.ticketlist;
        me.sqitems = res.data.data.sqlist;
        me.carditems = res.data.data.cardlist;
      }
    });
  },
  methods: {
    toCardDetail(detail_id){
      this.$router.push({
        name:"CardDetail",
        params:{
          id:detail_id
        }
      });
    },
    toSqDetail(detail_id){
      this.$router.push({
        name:"SqDetail",
        params:{
          id:detail_id
        }
      });
    },
    toOrderDetail(detail_id){
      this.$router.push({
        name:"OrderDetail",
        params:{
          id:detail_id
        }
      });
    },
    GetStatusName(type,status){
      switch(status){
        case "0":return "待审核";
        case "1":return type=="ticket"?"带零钱": "待审核";
        case "2":return "待领取";
        case "3":return "已领取";
        case "4":return type=="ticket"?"已激活": "申请失败";
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
.container{
  background: #fff;
}
fieldset{
  background: #fff;
  margin-bottom: 20px;
}
legend{
  color: #ff9000;
  padding: 0 10px;
}
  .list-sta{
    background: rgb(15, 154, 224);
    font-size: 14px;
    text-align: center;
    height:20px;
    line-height: 20px;
    border-radius: 2px;
    color: #fff;
  }
</style>