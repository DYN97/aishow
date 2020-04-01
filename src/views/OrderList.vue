<template>
  <div>
    <airshowCarousel :imgs="imgs"></airshowCarousel>

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
                      <v-col cols="3">{{childItem.order_type_name}}</v-col>
                      <v-col style="text-align:center" cols="7">{{childItem.ticket_date}}</v-col>
                      <v-col cols="2">{{childItem.status_name}}</v-col>
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
      items:[{"exhibition_name":"中国国际航空航天博览会（珠海）","list":[{"order_detail_id":"59d1d779d72a4f43b86886c4f6ea03ea","client_name":"1","client_idcard":"1","apply_status":2,"ticket_cost":0.00,"ticket_date":"2019-10-17 00:00:00","order_type":1,"exhibition_name":"中国国际航空航天博览会（珠海）","mail_status":0,"mail_serial_num":"","order_type_name":"普票","mail_status_name":"未申请","icon":"xe615","class":"staCBlue","status_name":"待领取","receive_time":"","receive_type_name":"","remark":"","open_id":"oP2hQ1SmrKxIxadS5BMFsMR1gnXc"},{"order_detail_id":"0c201a22258545f9ababf08f2eaf0a8a","client_name":"哦哦","client_idcard":"333","apply_status":2,"ticket_cost":0.00,"ticket_date":"2019-10-17 00:00:00","order_type":1,"exhibition_name":"中国国际航空航天博览会（珠海）","mail_status":0,"mail_serial_num":"","order_type_name":"普票","mail_status_name":"未申请","icon":"xe615","class":"staCBlue","status_name":"待领取","receive_time":"","receive_type_name":"","remark":"","open_id":"oP2hQ1SmrKxIxadS5BMFsMR1gnXc"},{"order_detail_id":"bda41e054cbe419086670055df94c690","client_name":"董延楠","client_idcard":"220621199209071413","apply_status":2,"ticket_cost":0.00,"ticket_date":"2019-10-17 00:00:00","order_type":1,"exhibition_name":"中国国际航空航天博览会（珠海）","mail_status":0,"mail_serial_num":"","order_type_name":"普票","mail_status_name":"未申请","icon":"xe615","class":"staCBlue","status_name":"待领取","receive_time":"","receive_type_name":"","remark":"","open_id":"oP2hQ1SmrKxIxadS5BMFsMR1gnXc"}]},{"exhibition_name":"2019空军航空开放活动（长春）","list":[{"order_detail_id":"5cae7c96361444f4a90fe7e29b62973a","client_name":"董延楠","client_idcard":"220621199209071413","apply_status":2,"ticket_cost":0.00,"ticket_date":"2019-10-17 00:00:00","order_type":1,"exhibition_name":"2019空军航空开放活动（长春）","mail_status":0,"mail_serial_num":"","order_type_name":"普票","mail_status_name":"未申请","icon":"xe615","class":"staCBlue","status_name":"待领取","receive_time":"","receive_type_name":"","remark":"","open_id":"oP2hQ1SmrKxIxadS5BMFsMR1gnXc"},{"order_detail_id":"56357f050c454027b37179d9519c9a80","client_name":"董延楠","client_idcard":"220621199209071413","apply_status":2,"ticket_cost":0.00,"ticket_date":"2019-10-17 00:00:00","order_type":1,"exhibition_name":"2019空军航空开放活动（长春）","mail_status":0,"mail_serial_num":"","order_type_name":"普票","mail_status_name":"未申请","icon":"xe615","class":"staCBlue","status_name":"待领取","receive_time":"","receive_type_name":"","remark":"","open_id":"oP2hQ1SmrKxIxadS5BMFsMR1gnXc"},{"order_detail_id":"8c3281b7b6f8447a88a467997a67e3a2","client_name":"董延楠","client_idcard":"220621199209071413","apply_status":2,"ticket_cost":0.00,"ticket_date":"2019-10-17 00:00:00","order_type":1,"exhibition_name":"2019空军航空开放活动（长春）","mail_status":0,"mail_serial_num":"","order_type_name":"普票","mail_status_name":"未申请","icon":"xe615","class":"staCBlue","status_name":"待领取","receive_time":"","receive_type_name":"","remark":"","open_id":"oP2hQ1SmrKxIxadS5BMFsMR1gnXc"}]}],
  
    };
  },
  watch: {
   
  },
  mounted() {
   
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
</style>