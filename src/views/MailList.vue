<template>
  <div class="mailListBox">
      <airshowCarousel :type="17"></airshowCarousel>
    <div v-if="hasData" class="listBox">
      <fieldset v-for="item in items" :key="item.exhibition_name">
        <legend style="margin-left:20px">{{item.exhibition_name}}</legend>
        <ul class="mailList">
          <li v-for="childItem in item.list" :key="childItem.order_detail_id">
            <a v-if="childItem.complate" @click="toMailDetail(childItem.mail_serial_num)">
              <div class="listRight">
                <div class="text-row">
                  <div :class="'sta cFRight '+childItem.class">{{childItem.status_name}}</div>
                  <span class="name">{{childItem.client_name}}</span>
                </div>
                <div class="text-row">
                  <div class="priceBox cFRight">
                    {{childItem.order_type_name}}:
                    <b class="price">￥{{childItem.ticket_cost}}</b>
                  </div>
                  <span class="code cPoint1">{{childItem.client_idcard}}</span>
                </div>
              </div>
            </a>
            <div
              v-else
              class="listRight check"
              @click="CheckMail(childItem.order_detail_id,item.exhibition_name)"
            >
              <i class="iconfont left-icon">{{childItem.checked?'&#xe60a;':'&#xe6d0;'}}</i>
              <div class="text-row">
                <div :class="'sta cFRight '+childItem.class">{{childItem.status_name}}</div>
                <span class="name">{{childItem.client_name}}</span>
              </div>
              <div class="text-row">
                <div class="priceBox cFRight">
                  {{childItem.order_type_name}}:
                  <b class="price">￥{{childItem.ticket_cost}}</b>
                </div>
                <span class="code cPoint1">{{childItem.client_idcard}}</span>
              </div>
            </div>
          </li>
        </ul>
      </fieldset>
      <a id="mailBtn">
        确认邮寄（
        <span class="totalNumber">{{checkNum}}</span>份）
      </a>
    </div>
    <div v-else>
      <ul class="mailList">
        <li class="clearfix" sta="0" style="text-align:center; ">暂无数据</li>
      </ul>
    </div>
  </div>
</template>
<script>
import airshowCarousel from "../components/Carousel";
export default {
  name: "MailList",
  data() {
    return {
      hasData: true,
      checkids: [],      
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
      checkNum: 0,
      items:[]
    };
  },
  methods: {
    toMailDetail(id) {
      this.$router.push({
        name: "MailDetail",
        params: {
          id: id
        }
      });
    },
    CheckMail(order_detail_id, exhibition_name) {
      var list = this.items.find(t => t.exhibition_name == exhibition_name)
        .list;
      var checkItem = list.find(t => t.order_detail_id == order_detail_id);

      this.$set(checkItem, "checked", !checkItem.checked);
      if (!checkItem.checked) {
          this.checkids=this.checkids.filter(t=>t==order_detail_id);
          this.checkNum--;
      } else {
          this.checkids.push(order_detail_id);
        this.checkNum++;
      }
    }
  },components: {
    airshowCarousel
  },mounted(){
    var me = this ;
    me.$api.orderapi.GetOrderList("2,3,4").then(res=>{
      if(res.data.statusCode=="200"){
        me.items = res.data.data.list;
      }
    });
  }
};
</script>
<style scoped>
.listBox {
  height: calc(100vh - 150px);
  overflow: auto;
  padding-bottom: 50px;
}
.cFRight {
  float: right;
}
.mailList {
  background: #fff;
}
.mailList {
  margin: 0;
  padding: 0;
}
.mailList li {
  border-bottom: #eee solid 1px;
  display: block;
  margin: 0 2%;
  padding: 13px;
}
.mailList li:last-child {
  border-bottom: 0;
}
.mailList li .left-icon {
  float: left;
  font-size: 1.1rem;
  padding-right: 4%;
  line-height: 40px;
  color: #b9b9b9;
}
.mailList li.on .left-icon {
  color: #5eafee;
}
.mailList .text-row {
  line-height: 22px;
  height: 22px;
  overflow: hidden;
}
.mailList .text-row .name {
  color: #666;
  font-size: 18px;
}
.mailList .text-row .sta {
  font-size: 14px;
}
.mailList .text-row .priceBox {
  font-size: 14px;
  color: #999;
}
.mailList .text-row .code {
  font-size: 14px;
  color: #999;
}
.mailList .text-row .price {
  color: #333;
  font-size: 16px;
  font-weight: normal;
  vertical-align: middle;
}
#mailBtn {
  position: fixed;
  bottom: 0;
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #5eafee;
  outline: none;
  color: #fff;
  font-size: 18px;
  text-align: center;
}
</style>