<template>
  <div>
    <airshowCarousel :type="14"></airshowCarousel>
    <!-- <v-tabs grow v-model="tabIndex">
        <v-tab :key="0" @click="tabIndex=0">门票</v-tab>
        <v-tab :key="1" @click="tabIndex=1">观展套餐</v-tab>
        <v-tab :key="2" @click="tabIndex=2">工作证</v-tab>
    </v-tabs>-->
    <div style="width:100%;border:1px #ccc solid;" class="listbox">
      <v-container>
        <fieldset v-for="item in items" :key="item.exhibition_name">
          <legend style="margin-left:20px">{{item.exhibition_name}}</legend>

          <v-list three-line>
            <template v-for="(childItem, index) in item.list">
              <v-divider v-if="index>0" :key="index"></v-divider>
              <v-list-item :key="childItem.order_detail_id" @click="toOrderDetail(childItem.order_detail_id)">
                <v-list-item-content style>
                  <v-list-item-title style="white-space:unset;font-size:16px">
                    <v-row no-gutters justify="space-between">
                      <v-col cols="3" style="color: #0f9ae0">{{childItem.order_type_name}}</v-col>
                      <v-col style="text-align:center" cols="7">{{childItem.ticket_date.subtring(0,10)}}</v-col>
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
      items:[]
    };
  },
  watch: {
   
  },
  mounted() {
    var me = this ;
    me.$api.orderapi.GetOrderList("").then(res=>{
      if(res.data.statusCode=="200"){
        me.items = res.data.data.list;
      }
    });
  },
  methods: {
    toOrderDetail(detail_id){
      this.$router.push({
        name:"OrderDetail",
        params:{
          id:detail_id
        }
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
    line-height: 20px;
    border-radius: 2px;
    color: #fff;
  }
</style>