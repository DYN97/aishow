
<template>
  <div class="agreementPage">
    <header>
      <div class="bgBox">
        <img src="../assets/i/bg-small-top.png" alt />
      </div>
      <div class="title" @click="onClose">
        <i class="iconfont"></i>
        {{title}}
      </div>
    </header>
    <div class="centerText">
      <h1>{{h1}}</h1>
      <div v-for="item in inner" :key="item.h2">
        <h2>{{item.h2}}</h2>
        <p v-for="(p,index) in item.p_box" :key="index">{{p}}</p>
      </div>
    </div>
    <div class="bottomTip">
      <p v-for="(p,index) in tip" :key="index">{{p}}</p>
    </div>
    <button id="agreePage-agreeBtn" @click="onPass">同 意 协 议</button>
  </div>
</template>
<script>
import agreement from "../utils/agreement";
export default {
  name: "agreementPage",
  props: ["type"],
  data() {
    return {
      title: "",
      h1: "",
      inner: [],
      tip: []
    };
  },
  mounted() {
    this.reloadPage();
  },
  methods: {
    onPass() {
      this.$emit("confirm");
    },
    onClose() {
      this.$emit("closeChoseBox");
    },
    reloadPage() {
      let typecode= "";
      switch(this.type){
        case "赠票":typecode= "zengpiao";break;
        case "订票":typecode= "goupiao";break;
        case "购票":typecode= "goupiao";break;
        case "购买":typecode= "goumai";break;
      }
      let agree = agreement[typecode];
      this.title = agree.title;
      this.h1 = agree.h1;
      this.tip = agree.tip;
      this.inner = agree.inner;
    }
  },
  watch: {
    type() {
      this.reloadPage();
    }
  }
};
</script>


<style scoped>
/*协议页面*/
.agreementPage {
  /* position: fixed; */
  background: #f2f2f2;
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
  height: 55px;
  line-height: 55px;
  padding: 0 30px;
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