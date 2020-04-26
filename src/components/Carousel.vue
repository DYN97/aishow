<template>
  <van-swipe :autoplay="3000" height="150">
    <van-swipe-item v-for="(img, i) in imgs" :key="i" @click="gotoPage(img)">
      <img :src="img.app_img_url" width="100%" />
      <span class="ad" v-if="img.ext1==1">广告</span>
    </van-swipe-item>
  </van-swipe>
</template>
<script>
import { Swipe, SwipeItem, Lazyload } from "vant";
export default {
  name: "airshowCarousel",
  components: {
    [Swipe.name]: Swipe,
    [Lazyload.name]: Lazyload,
    [SwipeItem.name]: SwipeItem
  },
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