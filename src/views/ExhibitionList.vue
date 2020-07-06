<template>
  <div>
    <airshowCarousel :type="12"></airshowCarousel>
    <v-list three-line class="listbox">
      <template v-for="(item, index) in items">
        <v-divider v-if="index>0" :key="index" :inset="item.inset"></v-divider>
        <v-list-item
          @click="toDetail(item.exhibition_code,item.exhibition_type,item.jump_url)"
          :key="item.title"
        >
          <v-list-item-avatar :size="80">
            <v-img :src="item.cover_photo"></v-img>
          </v-list-item-avatar>
          <v-list-item-content style="margin-left:20px">
            <v-list-item-title
              style="white-space:unset;font-size:18px"
              v-html="item.exhibition_name"
            ></v-list-item-title>
            <v-list-item-subtitle>{{item.begin_time}}-{{item.end_time}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline" style="text-align:center">温馨提示</v-card-title>
        <v-card-actions>
          <v-card-text>服务准备中，敬请期待！</v-card-text>
          <v-btn color="green darken-1" text @click="dialog = false">返回</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import airshowCarousel from "../components/Carousel";
export default {
  name: "ExhibitionList",
  data() {
    return {
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
      items: [],
      dialog: false,
      type:"normal"
    };
  },
  components:{
    airshowCarousel
  },
  mounted() {
    var me = this;
    me.type = me.$route.query.type;   
    this.$api.exhibitionapi.GetExhibitionList().then(res => {
      if (res.status == "200") {
        if (res.data.statusCode == "200") {
          if (res.data.data && res.data.data.length > 0) {
            me.items = res.data.data;
          }
        }
      }
    });
  },
  methods: {
    toDetail(exhibition_code, type, url) {
      switch (type) {
        case 0:
          var path = "TicketIndex";
          if(this.type=="vip"){
            path = "Invitation"
          } else if(this.type=="carTicket"){
            path = "ApplyCarTicket";
          }             
          this.$router.push({
            name: path,
            params: { exhibitionCode: exhibition_code }
          });
          break;
        case 1:
          this.dialog = true;
          break;
        case 2:
          location.href = url;
          break;
      }
    }
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
.listbox {
  height: calc(100vh - 150px);
  overflow: auto;
}
</style>