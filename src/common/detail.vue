<template>
  <div class>
    <div class="big-cont-title1">
      <span class="left-border"></span>基础信息
    </div>
    <div class="row-item flex-cont">
      <span>法定代法定代表人：</span>
      <p>{{data.legalPerson | isNull}}</p>
    </div>
    <div class="row-item flex-cont">
      <span>经营状态：</span>
      <p>{{data.statusDescription | isNull}}</p>
    </div>
    <div class="row-item flex-cont">
      <span>统一社会信用代码：</span>
      <p>{{data.socialNo | isNull}}</p>
    </div>
    <div class="row-item flex-cont">
      <span>所属地区：</span>
      <p>{{data.areaCode | isNull}}</p>
    </div>
    <div class="row-item flex-cont">
      <span>注册资本：</span>
      <p>{{data.regMoney | isNull}}</p>
    </div>
    <div class="row-item flex-cont">
      <span>成立日期：</span>
      <p>{{data.beginDate | isNull |subString}}</p>
    </div>
    <div class="row-item flex-cont">
      <span>所属行业：</span>
      <p>{{data.field1 | isNull}}</p>
    </div>
    <div class="row-item flex-cont">
      <span>营业期限：</span>
      <p>{{ data.termStart | isNull |subString}} 至 {{data.termEnd | isNull |subString}}</p>
    </div>
    <div class="row-item flex-cont">
      <span>社保人数：</span>
      <p>{{data.num?data.num:0 | isNull}}</p>
    </div>
    <div class="row-item flex-cont">
      <span>注册地址：</span>
      <p>{{data.regAddress | isNull}}</p>
    </div>
    <div class="row-item flex-cont">
      <span>经营范围：</span>
      <p>{{data.bScope | isNull}}</p>
    </div>
    <div class="big-cont-title1">
      <span class="left-border"></span>评测结果
    </div>
    <div class="row-item flex-cont">
      <span>实体类型：</span>
      <p>{{data.companyType | isNull}}</p>
    </div>
    <div class="row-item flex-cont">
      <span>企业规模：</span>
      <p>{{data.companyscale | isNull|scaleLevel}}</p>
    </div>
    <div class="row-item flex-cont">
      <span>所属产业链：</span>
      <p>{{data.industryChain?data.industryChain:'' | isNull}}</p>
    </div>
    <div class="row-item flex-cont">
      <span>租金承受力：</span>
      <p>{{data.rentLevel | isNull}}</p>
    </div>
    <div class="row-item flex-cont">
      <span>企业指数：</span>
      <p>{{data.developScore | isNull}}</p>
    </div>
    <div class="row-item flex-cont">
      <span>信用等级：</span>
      <p>{{data.creditScore | creditLevel}}</p>
    </div>
    <!--
        <div class="big-cont-title1">
            <span class="left-border"></span>联系方式
        </div>
        <div class="row-item flex-cont">
            <span>联系人：</span>
            <p>张三</p>
        </div>
        <div class="row-item flex-cont">
            <span>座机：</span>
            <p>010-28501234</p>
        </div>
        <div class="row-item flex-cont">
            <span>邮箱：</span>
            <p>123456@qq.com</p>
        </div>
        <div class="row-item flex-cont">
            <span>手机：</span>
            <p>13700110011</p>
    </div>-->
  </div>
</template>

<script type="text/ecmascript-6">
import qs from "qs";
export default {
  name: "",
  data() {
    return {
      addressName: ""
    };
  },
  props: {
    data: Object,
    address: Array
  },
  methods: {},
  filters: {
    creditLevel(val) {
      if (val) {
        let num = parseInt(val);
        if (num >= 90) {
          return "优质";
        } else if (num >= 80 && num < 90) {
          return "正常";
        } else if (num >= 60 && num < 80) {
          return "一般风险";
        } else {
          return "极高风险";
        }
      } else {
        return "-";
      }
    },
    scaleLevel(val) {
      if (val) {
        let num = parseInt(val);
        if (num == 1) {
          return "微型";
        } else if (num == 2) {
          return "小型";
        } else if (num == 3) {
          return "中型";
        } else if (num == 4) {
          return "大型";
        }
      } else {
        return "-";
      }
    },
    isNull(val) {
      if (val) {
        return val;
      } else {
        return "-";
      }
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.big-cont-title1 {
  margin-top: 10px;
  background-color: #fff;
  line-height: 30px;
}
.row-item {
  line-height: 30px;
  span {
    width: 130px;
    text-align: right;
    color: #808080;
  }
  p {
    flex: 1;
  }
}
</style>
