<template>
    <div class="company-bar">
        <div class="chart-cont">
            <div v-for="(item,index) in baroptions" :key="index" class="chartbar">
                <div class="bar-title">{{item.name}}</div>
                <chartbar :id="index" :color="item.color" :detaildata="item.detaildata" :xAxisdata="item.xAxisdata"></chartbar>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import chartbar from "./bar";
export default {
  name: "",
  data() {
    return {
      baroptions: [
        {
          name: "行业分布",
          color: "#ff9343",
          detaildata: [],
          xAxisdata: []
        },
        {
          name: "注册资本",
          color: "#4068fd",
          detaildata: ["265", "122", "251", "118"],
          xAxisdata: [
            "100万以下",
            "100-300万",
            "300-500万",
            "500-1000万",
            "1000-3000万",
            "3000-5000万",
            "5000万以上"
          ]
        },
        {
          name: "成立时间",
          color: "#54c18a",
          detaildata: ["265", "122", "251", "118"],
          xAxisdata: [
            "1年以下",
            "1-3年",
            "3-5年",
            "5-8年",
            "8-12年",
            "12-20年",
            "20年以上"
          ]
        },
        {
          name: "公司规模",
          color: "#ff9343",
          detaildata: ["265", "122", "251", "118"],
          xAxisdata: ["大型", "中型", "小型", "微型"]
        },
        {
          name: "信用等级",
          color: "#ff9343",
          detaildata: ["265", "122", "251", "118"],
          xAxisdata: ["极高风险", "一般风险", "正常", "优质"]
        }
        // ,
        // {
        //   name: "租金承受力",
        //   color: "#ff9343",
        //   detaildata: ["0", "0", "0", "0"],
        //   xAxisdata: ["100以下", "100-300", "300-500", "500以上"]
        // },
        // {
        //   name: "知识产权",
        //   color: "#ff9343",
        //   detaildata: ["0", "0", "0", "0"],
        //   xAxisdata: ["100以下", "100-300", "300-500", "500以上"]
        // },
        // {
        //   name: "企业指数",
        //   color: "#ff9343",
        //   detaildata: ["0", "0", "0", "0"],
        //   xAxisdata: ["100以下", "100-300", "300-500", "500以上"]
        // }
      ]
    };
  },
  components: {
    chartbar
  },
  watch: {
    drawerData: {
      handler(newQuestion, oldQuestion) {
        // this.setNewData();
        this.$nextTick(() => {
        //   this.baroptions = newQuestion;
          this.setNewData();
        });
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.setNewData();
  },
  methods: {
    setNewData: function() {
      var dataArray = Object.values(this.drawerData);
      for (var i = 0; i < dataArray.length; i++) {
        if (dataArray[i] != "") {
          if (i == 0) {
            this.baroptions[i].xAxisdata = Object.keys(
              JSON.parse(dataArray[i])
            ).slice(0, 6);
            this.baroptions[i].detaildata = Object.values(
              JSON.parse(dataArray[i])
            );
          } else {
            this.baroptions[i].detaildata = Object.values(
              JSON.parse(dataArray[i])
            );
          }
        }
      }
    }
  },
  props: {
    drawerData: Object,
    params: String
  }
};
</script>

<style lang="scss">
.company-bar {
  .chart-cont {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .chartbar {
      background: #fff;
      width: 98%;
      margin: 10px 5px;
      box-shadow: 0 1px 3px 1px #ccc;
      .bar-title {
        padding: 5px;
        color: #006dfa;
        border-bottom: 3px solid #006dfa;
      }
    }
  }
}
</style>
