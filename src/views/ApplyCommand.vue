<template>
  <v-form style="background-color:white" class="listbox">
    <v-row height="46px" no-gutters>
      <div align-self="center" class="tag-name" for="doc-ipt-3">
        <i class="iconfont">&#xe63f;</i>
        <label v-html="'姓　　名'"></label>
      </div>
      <div class="am-u-sm-8 list-right">
        <v-text-field
          class="mainForm"
          v-model="form.apply_name"
          label="请填写姓名"
          hide-details="auto"
          height="30"
          single-line
          regular
        ></v-text-field>
      </div>
    </v-row>
    <v-row height="46px" no-gutters>
      <div align-self="center" class="tag-name" for="doc-ipt-3">
        <i class="iconfont">&#xe63f;</i>
        <label v-html="'部　　门'"></label>
      </div>
      <div class="am-u-sm-8 list-right">
        <v-text-field
          class="mainForm"
          v-model="form.dept_name"
          label="请填写部门"
          hide-details="auto"
          height="30"
          single-line
          regular
        ></v-text-field>
      </div>
    </v-row>
    <v-row no-gutters>
      <div align-self="center" class="tag-name" for="doc-ipt-3">
        <i class="iconfont">&#xe690;</i>用途
      </div>
      <div align-self="center" class="am-u-sm-8 list-right">
        <select
          style="width:95%;height:46px;background: url('http://ourjs.github.io/static/2015/arrow.png') no-repeat scroll right center transparent;"
          v-model="form.use_type"
        >
          <option value="0">进门校验</option>
          <option value="1">门票信息跟踪</option>
        </select>
      </div>
    </v-row>

    <v-row justify="center" style="margin: 0">
      <v-col cols="8" style="padding: 0 0 20px 0;">
        <v-btn block rounded color="primary" @click="submit" large dark>确认提交</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import { Toast, DatetimePicker, Popup, Field } from "vant";
export default {
  name: "ApplyCommand",
  data() {
    return {
      form: {
        apply_name: "",
        dept_name: "",
        use_type: 0
      },
      once: true,
      choseDate: "",
      showPicker: false
    };
  },
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Field.name]: Field
  },
  methods: {
    submit() {
      var me = this;
      if (!me.once) return false;
      me.once = false;
      if (me.form.apply_name === "") {
        Toast("请填写姓名！");
        this.once = true;
        return;
      }
      if (me.form.dept_name === "") {
        Toast("请填写部门！");
        this.once = true;
        return;
      }
      if (me.form.use_type === "") {
        Toast("请选择用途！");
        this.once = true;
        return;
      }
      me.$api.userapi.ApplyCommand(me.form).then(res => {
        if (res.data.statusCode == "200") {
          Toast("申请成功！");
          me.once = true;
          me.form = {
            apply_name: "",
            dept_name: "",
            use_type: 0
          };
          return;
        } else {
          Toast(res.data.message);
          me.once = true;
          me.form = {
            apply_name: "",
            dept_name: "",
            use_type: 0
          };
        }
      });
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    }
  }
};
</script>
<style scoped>
.van-card__title {
  color: #0f9ae0;
  font-size: 14px;
}
.van-card__content {
  padding: 10px 0 5px;
}
.cCommonAgreeBox .agree-icon {
  position: unset;
  font-size: 18px;
  padding: 0 8px 0 10px;
  line-height: 20px;
  vertical-align: text-bottom;
  color: #999;
}

.iCblue {
  color: #5eafee !important;
}
.cCommonAgreeBox a {
  color: #888;
  text-decoration: underline;
  font-size: 14px;
}
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
  margin: 0;
  padding-top: 8px;
}
.listbox {
  height: calc(100vh);
  overflow-y: auto;
  overflow-x: hidden;
}
.v-input {
  margin: 0 !important;
}
.v-subheader {
  background: #eef7ff;
  color: #333;
}
.listbox .tag-name .iconfont {
  /*position: absolute;*/
  /*left: 5px;*/
  /*top: 14px;*/
  line-height: 16px;
  color: #0f9ae0;
  font-size: 16px;
  font-weight: bold;
  margin-right: 5px;
}
.container {
  width: calc(100% - 24px);
  /* padding: 12px; */
  box-shadow: 1px 1px 5px #ddd;
  margin: 12px auto;
  padding: 0;
  height: calc(100vh - 180px);
  background: #fff;
}
.agree-box {
  border-top: #ddd solid 1px;
  padding-top: 15px;
}
.tag-name {
  position: relative;
  font-size: 16px;
  color: #666;
  width: 120px;
  height: 46px;
  line-height: 46px;
  overflow: hidden;
  text-indent: 12px;
}
.get-code {
  background: #ff9000;
  color: #fff !important;
  display: block;
  height: 26px;
  line-height: 26px;
  border-radius: 4px;
  padding: 0 5px !important;
  margin: 0 auto;
  box-sizing: border-box;
}
.list-right {
  width: calc(100% - 130px);
}
</style>