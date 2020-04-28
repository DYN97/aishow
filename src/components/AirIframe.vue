<template>
  <div  class="agreementPage">
    <header>
      <div class="title" @click="onClose">
        <i class="iconfont"></i>
        {{title}}
      </div>
    </header>
    <div class="iframe-container">
      <iframe :src="src" scrolling="auto" frameborder="0" class="frame"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "AirIframe",
  props: ["src", "title"],
  data() {
    return {};
  },
  methods: {
    // 获取路径
    onClose() {}
  },
  mounted() {}
};
</script>

<style lang="scss">
.iframe-container {
  position: absolute;
  top: 70px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin-top: -29px;
  .frame {
    position: relative;
    top: 0px;
    width: 100%;
    height: 100%;
  }
}
/*协议页面*/
.agreementPage {
  /* position: fixed; */
  background: #5eafee;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10000;
  height: 100vh;
}
/*布局*/
.agreementPage header {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}
.agreementPage .centerText {
  position: absolute;
  left: 5%;
  right: 5%;
  top: 55px;
  bottom: 105px;
  background: #fff;
  box-shadow: 1px 2px 5px #d0d0d0;
  overflow: auto;
  padding: 15px;
}
.agreementPage .bottomTip {
  position: absolute;
  left: 5%;
  right: 5%;
  bottom: 45px;
  height: 45px;
}
#agreePage-agreeBtn {
  display: block;
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  height: 45px;
  line-height: 45px;
  border: 0;
  background: #5eafee;
  color: #fff;
  font-size: 18px;
}

/*头部*/
.agreementPage .bgBox {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}
.agreementPage .bgBox img {
  display: block;
  width: 100%;
}
.agreementPage header .title {
  position: relative;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  font-size: 1.2em;
  color: #fff;
}
.agreementPage header .title i {
  font-size: 30px;
  padding-right: 10px;
  vertical-align: middle;
}

/*中心文字*/
.agreementPage .centerText h1 {
  color: #cf2a27;
  font-size: 16px;
  font-weight: normal;
  text-indent: 2em;
  line-height: 24px;
}
.agreementPage .centerText h2 {
  font-size: 16px;
  color: #333;
  line-height: 24px;
  padding-top: 15px;
}
.agreementPage .centerText p {
  font-size: 14px;
  color: #666;
  line-height: 24px;
}

/*底部提示*/
.agreementPage .bottomTip p {
  height: 15px;
  line-height: 15px;
  color: #cf2a27;
  font-size: 12px;
  text-indent: 5px;
}
</style>