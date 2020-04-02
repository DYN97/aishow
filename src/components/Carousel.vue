<template>
  <v-carousel cycle :interval="2000" height="150" hide-delimiter-background :show-arrows="false">
    <v-carousel-item v-for="(img, i) in imgs" :key="i" :src="img.app_img_url" @click="gotoPage(img)">
      <span class="ad" v-if="img.ext1==1">广告</span>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  name: "airshowCarousel",
  data() {
    return {
      imgs: []
    };
  },
  props: {
    type: Number
  },
  methods: {
    gotoPage(item) {
      this.$api.commonapi.AddClickData(item.id);
      if (item.gotopage) {
        window.location.href = item.gotopage;
      }
    }
  },
  mounted() {
    var me = this;
    this.$api.commonapi.GetInformationList(this.type).then(res => {
      if (res.data.statusCode == "200") {        
          me.imgs = res.data.data.imgList;        
      }
    });
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
</style>