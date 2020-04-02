<template>
  <div class="mailListBox">
    <airshowCarousel :type="110"></airshowCarousel>
    <ul class="result-list listbox" id="list" style="padding:0">
      <li v-for="item in maildata" :key="item">
        <div class="col1">
          <dl>
            <dt>{{item.date}}</dt>
            <dd>{{item.time}}</dd>
          </dl>
        </div>
        <div class="col2">
          <span></span>
        </div>
        <div class="col3">{{item.remark}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
import airshowCarousel from "../components/Carousel";
export default {
  name: "MailDetail",
  data() {
    return {
      maildata: [],
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
  },
  mounted() {
    var mail_no = this.$route.params.id;
    this.$api.commonapi.GetYunDaExpressInfo(mail_no).then(res => {
      if (res.data.statusCode == "200") {
        if (res.data.data.steps) {
          for (var i = 0; i <  res.data.data.steps.length; i++) {
            var thistime = res.data.data.steps[i].time;
            res.data.data.steps[i].date = thistime.substr(0, 10);
            res.data.data.steps[i].time = thistime.substr(11, 5);
          }
          this.maildata = res.data.data.steps;
        }
      }
    });
  }
};
</script>
<style scoped>
.listbox {
  height: calc(100vh - 150px);
  overflow: auto;
}
.result-list {
  border-top: 0.0625rem solid #e6e6e6;
}

.result-list li {
  display: -webkit-box;
  -webkit-box-align: center;
  overflow: hidden;
  color: #828282;
  border-bottom: 0.0625rem solid #e6e6e6;
}

.result-list li.last {
  color: #ff7800;
}

.result-list li .col1,
.result-list li .col2,
.result-list li .col3 {
  position: relative;
  display: block;
}

.result-list .col3:before {
  content: "";
  position: absolute;
  top: -2rem;
  bottom: -2rem;
  left: -12px;
  border-left: 1px solid #e6e6e6;
}

.result-list .col2 span {
  border: 1px solid #e6e6e6;
  border-radius: 50%;
  position: absolute;
  left: -3px;
  top: 50%;
  margin-top: -0.5rem;
  width: 1rem;
  height: 1rem;
  background: #fff;
  z-index: 2;
  color: #e6e6e6;
}

.result-list .last .col2 span {
  border-color: #ff7800;
  color: #ff7800;
}

.result-list .last.finish .col2 span {
  background: #f00;
}

.result-list .last.finish .col2 span:before {
  width: 8px;
  height: 4px;
  margin-top: -2px;
  border: 0;
  border-left: 1px solid #fff;
  border-bottom: 1px solid #fff;
  -webkit-transform: translate(-50%, -50%) rotate(-45deg);
  transform: translate(-50%, -50%) rotate(-45deg);
}

.result-list .col2 span:before {
  position: absolute;
  top: 50%;
  left: 50%;
  content: "";
  width: 6px;
  height: 6px;
  margin-top: -2px;
  border-left: 1px solid;
  border-bottom: 1px solid;
  -webkit-transform: translate(-50%, -50%) rotate(-45deg);
  transform: translate(-50%, -50%) rotate(-45deg);
}

.result-list.sortup .col2 span:before {
  border: 0;
  border-right: 1px solid;
  border-top: 1px solid;
  margin-top: 2px;
}

.result-list li:first-child .col3:before {
  top: 50%;
}

.result-list li .col1 {
  padding: 0.625rem;
  text-align: center;
  font-size: 0.75rem;
  font-weight: bold;
  font-family: Helvetica, Arial, sans-serif;
}

.result-list li .col2 {
  width: 1.05rem;
  position: relative;
}

.result-list li .col3 {
  -webkit-box-flex: 1;
  padding: 0.625rem;
  font-size: 0.875rem;
  line-height: 1.375rem;
}

.result-list li .col3 a {
  color: #3278e6 !important;
  font-weight: bold;
}

.result-list li .col1 dd {
  margin-top: 0.25rem;
}

li.last .sortdown .col2 {
  border: solid 1px #ff7800;
}

.result-list li.last a {
  color: #ff7800;
  font-weight: bold;
}

.bgBox {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}
.bgBox img {
  display: block;
  width: 100%;
}
header .title {
  position: relative;
  height: 55px;
  line-height: 55px;
  padding: 0 30px;
  font-size: 1.2em;
  color: #fff;
}
header .title i {
  font-size: 30px;
  padding-right: 10px;
  vertical-align: middle;
}
</style>