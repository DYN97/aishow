<template>
  <div class="mailListBox">
      <airshowCarousel :imgs="imgs"></airshowCarousel>




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
      items:[{"exhibition_name":"中国国际航空航天博览会（珠海）","list":[{"order_detail_id":"59d1d779d72a4f43b86886c4f6ea03ea","client_name":"1","client_idcard":"1","apply_status":2,"ticket_cost":0.00,"ticket_date":"2019-10-17 00:00:00","order_type":1,"exhibition_name":"中国国际航空航天博览会（珠海）","mail_status":0,"mail_serial_num":"","order_type_name":"普票","mail_status_name":"未申请","icon":"xe615","class":"staCBlue","status_name":"待领取","receive_time":"","receive_type_name":"","remark":"","open_id":"oP2hQ1SmrKxIxadS5BMFsMR1gnXc"},{"order_detail_id":"0c201a22258545f9ababf08f2eaf0a8a","client_name":"哦哦","client_idcard":"333","apply_status":2,"ticket_cost":0.00,"ticket_date":"2019-10-17 00:00:00","order_type":1,"exhibition_name":"中国国际航空航天博览会（珠海）","mail_status":0,"mail_serial_num":"","order_type_name":"普票","mail_status_name":"未申请","icon":"xe615","class":"staCBlue","status_name":"待领取","receive_time":"","receive_type_name":"","remark":"","open_id":"oP2hQ1SmrKxIxadS5BMFsMR1gnXc"},{"order_detail_id":"bda41e054cbe419086670055df94c690","client_name":"董延楠","client_idcard":"220621199209071413","apply_status":2,"ticket_cost":0.00,"ticket_date":"2019-10-17 00:00:00","order_type":1,"exhibition_name":"中国国际航空航天博览会（珠海）","mail_status":0,"mail_serial_num":"","order_type_name":"普票","mail_status_name":"未申请","icon":"xe615","class":"staCBlue","status_name":"待领取","receive_time":"","receive_type_name":"","remark":"","open_id":"oP2hQ1SmrKxIxadS5BMFsMR1gnXc"}]},{"exhibition_name":"2019空军航空开放活动（长春）","list":[{"order_detail_id":"5cae7c96361444f4a90fe7e29b62973a","client_name":"董延楠","client_idcard":"220621199209071413","apply_status":2,"ticket_cost":0.00,"ticket_date":"2019-10-17 00:00:00","order_type":1,"exhibition_name":"2019空军航空开放活动（长春）","mail_status":0,"mail_serial_num":"","order_type_name":"普票","mail_status_name":"未申请","icon":"xe615","class":"staCBlue","status_name":"待领取","receive_time":"","receive_type_name":"","remark":"","open_id":"oP2hQ1SmrKxIxadS5BMFsMR1gnXc"},{"order_detail_id":"56357f050c454027b37179d9519c9a80","client_name":"董延楠","client_idcard":"220621199209071413","apply_status":2,"ticket_cost":0.00,"ticket_date":"2019-10-17 00:00:00","order_type":1,"exhibition_name":"2019空军航空开放活动（长春）","mail_status":0,"mail_serial_num":"","order_type_name":"普票","mail_status_name":"未申请","icon":"xe615","class":"staCBlue","status_name":"待领取","receive_time":"","receive_type_name":"","remark":"","open_id":"oP2hQ1SmrKxIxadS5BMFsMR1gnXc"},{"order_detail_id":"8c3281b7b6f8447a88a467997a67e3a2","client_name":"董延楠","client_idcard":"220621199209071413","apply_status":2,"ticket_cost":0.00,"ticket_date":"2019-10-17 00:00:00","order_type":1,"exhibition_name":"2019空军航空开放活动（长春）","mail_status":0,"mail_serial_num":"","order_type_name":"普票","mail_status_name":"未申请","icon":"xe615","class":"staCBlue","status_name":"待领取","receive_time":"","receive_type_name":"","remark":"","open_id":"oP2hQ1SmrKxIxadS5BMFsMR1gnXc"}]}],
  
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
      console.log(checkItem);

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