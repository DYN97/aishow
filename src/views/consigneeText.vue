<template>
  <div>
    <airshowCarousel :imgs="imgs"></airshowCarousel>
    <div class="listBox">
      <form
        class="am-form am-form-horizontal"
        data-am-validator
        novalidate="novalidate"
        action="return false;"
        id="pass"
      >
        <ul class="ListBox">
          <li>
            <div class="left">
              <i class="iconfont" style="color:#2779EA;">&#xe63f;</i>姓名
            </div>
            <div class="right">
              <input id="name" placeholder="填写姓名" type="text" required />
              <i class="must-icon iconfont">&#xe652;</i>
            </div>
          </li>
          <li>
            <div class="left">
              <i class="iconfont" style="color:#2779EA;">&#xe63f;</i>身份证号
            </div>
            <div class="right">
              <input id="idcard" placeholder="填写身份证号" type="text" required />
              <i class="must-icon iconfont">&#xe652;</i>
            </div>
          </li>
          <li>
            <div class="left">
              <i class="iconfont" style="color:#ff9000;">&#xe611;</i>联系电话
            </div>
            <div class="right">
              <input
                id="tel"
                placeholder="填写有效的联系电话"
                required
                type="tel"
                maxlength="11"
                onkeyup="this.value=this.value.replace(/\D/g,'')"
              />
              <i class="must-icon iconfont">&#xe652;</i>
            </div>
          </li>
          <li>
            <div class="left">
              <i class="iconfont" style="color:#B77FF0;">&#xe60e;</i>省市区
            </div>
            <div
              style="margin-right: 4px;"
              class="right toAddressPop"
              onclick="_globel.addressPop()"
            >
              <span class="addressCheck" id="address">选择地区</span>
              <i class="row-icon iconfont">&#xe68d;</i>
            </div>
          </li>
          <li style="padding-right: 0">
            <div class="left">
              <i class="iconfont" style="color:#24A749;">&#xe612;</i>详细地址
            </div>
            <div class="right" style="margin-right: 0">
              <textarea id="full-address" required placeholder="填写所在街道及详细信息"></textarea>
            </div>
          </li>
        </ul>
      </form>
      <p class="cCommonAgreeBox" sta="0">
        <i class="iconfont agree-icon">&#xe63c;</i>
        <a onclick="_globel.agreementPage('mail',$(this).closest('.cCommonAgreeBox'))">同意邮寄协议</a>
      </p>
     
    </div>
     <button type="button" id="submitBtn">确 认 邮 寄</button>
  </div>
</template>

<script>
import airshowCarousel from "../components/Carousel";
export default {
  name: "ConsigneeText",
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
      ]
    };
  },
  components: {
    airshowCarousel
  }
};
</script>


<style scoped>
.cCommonAgreeBox .agree-icon {
    font-size: 18px;
    padding: 0 8px 0 20px;
    line-height: 20px;
    vertical-align: text-bottom;
    color: #999;
}
.cCommonAgreeBox a {
    color: #888;
    text-decoration: underline;
    font-size: 14px;
}
.listBox {
  height: calc(100vh - 150px);
  overflow: auto;
  padding-bottom: 50px;
}
.topBox {
  z-index: 2;
}
.BottomBox {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.ListBox {
  padding: 0;
}
.ListBox li {
  list-style: none;
  position: relative;
  background: #fff;
  border-top: #e5e5e5 solid 1px;
  border-bottom: #e5e5e5 solid 1px;
  margin-bottom: 5px;
  padding: 12px 20px;
}
.ListBox li:first-child {
  border-top: 0;
}
.ListBox li .left {
  float: left;
  width: 100px;
  line-height: 25px;
  font-size: 16px;
  /*height: 30px;*/
  color: #666;
}
.ListBox li .left i {
  font-size: 20px;
  padding-right: 5px;
  vertical-align: bottom;
}
.ListBox li .right {
  margin-left: 100px;
  margin-right: 15px;
  min-height: 25px;
  border-left: #e5e5e5 solid 1px;
}
.ListBox li .right input {
  border: 0;
  height: 25px;
  outline: none;
  font-size: 16px;
  border-bottom: #fff 1px solid;
  margin-left: 10px;
  padding: 0;
}
.ListBox li textarea {
  display: block;
  width: calc(100% - 20px);
  padding: 0;
  margin: 0 10px;
  border: 0;
  font-size: 16px;
  height: 100px;
  box-sizing: border-box;
  border-bottom: #fff 1px solid;
  resize: none;
  padding-top: 3px;
}
.ListBox li .right input::-webkit-input-placeholder,
.ListBox li textarea::-webkit-input-placeholder {
  color: #999999;
}
.ListBox li .right input:focus,
.ListBox li textarea:focus {
  box-shadow: none;
}
.ListBox li .must-icon {
  position: absolute;
  right: 10px;
  top: 0;
  color: #bc1616;
  font-size: 18px;
  line-height: 50px;
}
.ListBox li .row-icon {
  position: absolute;
  right: 10px;
  top: 0;
  color: #ddd;
  font-size: 18px;
  line-height: 50px;
}
.ListBox li .addressCheck {
  display: block;
  color: #999;
  line-height: 25px;
  border-bottom: #fff solid 1px;
  margin-left: 10px;
}
#submitBtn {
    position: fixed;
    bottom:0;
  height: 50px;
  line-height: 50px;
  color: #fff;
  background: #5eafee;
  font-size: 18px;
  width: 100%;
  border: 0;
  outline: none;
}
</style>