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
              <input id="name" placeholder="填写姓名" type="text" v-model="form.addressee" required />
              <i class="must-icon iconfont">&#xe652;</i>
            </div>
          </li>
          <li>
            <div class="left">
              <i class="iconfont" style="color:#2779EA;">&#xe63f;</i>身份证号
            </div>
            <div class="right">
              <input id="idcard" placeholder="填写身份证号" v-model="form.idcard" type="text" required />
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
                v-model="form.addressee_phone"
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
            <div style="margin-right: 4px;" class="right toAddressPop">
              <span
                class="addressCheck"
                id="address"
                @click="showPicker=true"
              >{{areacode?form.province+','+form.city+','+form.area:'选择地区'}}</span>
              <i class="row-icon iconfont">&#xe68d;</i>
            </div>
          </li>
          <li style="padding-right: 0">
            <div class="left">
              <i class="iconfont" style="color:#24A749;">&#xe612;</i>详细地址
            </div>
            <div class="right" style="margin-right: 0">
              <textarea
                id="full-address"
                v-model="form.detailed_address"
                required
                placeholder="填写所在街道及详细信息"
              ></textarea>
            </div>
          </li>
        </ul>
      </form>
      <p class="cCommonAgreeBox" sta="0">
        <i class="iconfont agree-icon" :class="{'iCblue':agreementPass}">&#xe63c;</i>
        <a :class="{'iCblue':agreementPass}" @click="showAgreement = true">同意邮寄协议</a>
      </p>
      <van-popup v-model="showPicker" position="bottom">
        <van-area
          :area-list="areaList"
          :value="areacode"
          :columns-placeholder="['请选择', '请选择', '请选择']"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>

      <van-popup v-model="showAgreement" position="left" :style="{width:'100%'}">
        <agreementPage :type="'mail'" @closeChoseBox="showAgreement=false" @confirm="agree" />
      </van-popup>
    </div>
    <button type="button" id="submitBtn" @click="submit">确 认 邮 寄</button>
  </div>
</template>

<script>
import { Picker, Toast, Popup, Area } from "vant";
import areaList from "../utils/area";
import airshowCarousel from "../components/Carousel";
import agreementPage from "../components/agreementPage";
export default {
  name: "ConsigneeText",
  data() {
    return {
      imgs: [
        {
          src: "",
          //"http://59.110.175.131:1111/upfiles/2019-07-31/h5_20190731205844240.jpg",
          isguanggao: true
        },
        {
          src: "",
          //"http://59.110.175.131:1111/upfiles/2019-07-31/h7_20190731205944651.jpg",
          isguanggao: false
        }
      ],
      showAgreement: false,
      showPicker: false,
      once: true,
      agreementPass: false,
      areaList: areaList,
      mailIds:[],
      form: {
        orders: "",
        province: "",
        city: "",
        area: "",
        receivable: 18,
        addressee: "",
        detailed_address: "",
        one_money: 20,
        idcard: "",
        addressee_phone: ""
      },

      areacode: ""
    };
  },
  mounted(){
      var me = this;
      me.mailIds = me.$route.query.id?me.$route.query.id.split(','):[];
      me.form.orders = JSON.stringify(me.mailIds);
      me.$api.orderapi.GetOrderDetail(me.mailIds[0]).then(res=>{
          if(res.data.statusCode=="200"){
              me.form.addressee=res.data.data.client_name;
              me.form.addressee_phone=res.data.data.client_phone;
              me.form.idcard=res.data.data.client_card_type==0?res.data.data.client_idcard:''
          }
      }); 
  },
  components: {
    airshowCarousel,
    agreementPage,
    [Picker.name]: Picker,
    [Area.name]: Area,
    [Popup.name]: Popup,
    [Toast.name]: Toast
  },
  methods: {
    onConfirm(result) {
      this.form.province = result[0].name;
      this.form.city = result[1].name;
      this.form.area = result[2].name;
      if (this.form.province && this.form.city && this.form.area) {
        this.areacode = result[2].code;
        this.showPicker = false;
      }
    },
    agree() {
      this.showAgreement = false;
      this.agreementPass = true;
    },
    isPhone: function(phone) {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
        return false;
      } else {
        return true;
      }
    },
    isIDCard: function(idnumber) {
      if (!idnumber || idnumber.length < 0) return false;
      if (idnumber.length == 15) return false;
      if (idnumber.length != 18) return false;
      idnumber = idnumber.toUpperCase();
      if (!/^\d{17}([\dx])$/i.test(idnumber)) return false;
      var address =
        "11x22x35x44x53x12x23x36x45x54x13x31x37x46x61x14x32x41x50x62x15x33x42x51x63x21x34x43x52x64x65x71x81x82x91";
      var twostr = idnumber.substr(0, 2);
      if (address.indexOf(twostr) < 0) return false;
      var year = idnumber.substr(6, 4);
      if (year <= 1900 || year >= new Date().getFullYear()) return false;
      var m = idnumber.substr(10, 2) * 1;
      if (m < 1 || m > 12) return false;
      var d = idnumber.substr(12, 2) * 1;
      if (d < 1 || d > 31) return false;
      var arrVarifyCode = "1,0,X,9,8,7,6,5,4,3,2".split(",");
      var Wi = "7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2".split(",");
      var sum = 0;
      for (var i = 0; i < 17; i++) {
        var num = idnumber.substr(i, 1) * 1;
        sum += Wi[i] * 1 * num;
      }
      var n = sum % 11;
      if (arrVarifyCode[n] != idnumber.substr(17, 1)) return false;
      return true;
    },
    submit() {
      if (!this.once) {
        return false;
      }
      this.once = false;
      let _name = this.form.addressee,
        _tel = this.form.addressee_phone,
        _address = this.areacode,
        _full_address = this.form.detailed_address,
        _idcard = this.form.idcard,
        _agree_sta = this.agreementPass;

      if (_name.length < 2) {
        Toast("请填写姓名");
        this.once = true;
        return;
      }
      if (_idcard.length != 18 || !this.isIDCard(_idcard)) {
        Toast("请填写正确的身份证号");
        this.once = true;
        return;
      }
      if (_tel.length < 11 || !this.isPhone(_tel)) {
        Toast("请填写有效的联系电话");
        this.once = true;
        return;
      }
      if (!_address) {
        Toast("请选择省市区");
        this.once = true;
        return;
      }
      if (_full_address.length < 2) {
        Toast("请填写详细地址");
        this.once = true;
        return;
      }
      if (!_agree_sta) {
        Toast("请同意邮递须知");
        this.once = true;
        return;
      }
      if (_full_address.indexOf("#") > -1)
        _full_address = _full_address.replace(/#/g, "栋");

        this.$api.orderapi.CreateMailOrder(this.form).then(res=>{
            if(res.data.statusCode==200){
                window.location.href = "/appwxpay.aspx?ordercode=" + res.data.data.ordercode + "&type=4&total_fee=" + res.data.data.money+"&token="+this.$store.state.token;
            }else{
                Toast("下单失败！");
                this.once = true;
                return;
            }
        });
    }
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
  bottom: 0;
  height: 50px;
  line-height: 50px;
  color: #fff;
  background: #5eafee;
  font-size: 18px;
  width: 100%;
  border: 0;
  outline: none;
}
.iCblue {
  color: #5eafee !important;
}
</style>