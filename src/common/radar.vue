<template>
  <div :id="this.id" :style="{width: '100%', height: '240px'}"></div>
</template>

<script type="text/ecmascript-6">
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入雷达图组件
require("echarts/lib/chart/radar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "hello",
  data() {
    return {
      // id:'',
      // chartdata:''
    };
  },
  props: {
    id: Number,
    chartdata: Array,
    data: Object,
    color:String
  },
  mounted() {
    this.drawLine(this.id, this.chartdata);
  },
  watch: {
    chartdata: {
      handler(newQuestion, oldQuestion) {
        this.$nextTick(() => {
          this.drawLine(this.id, newQuestion);
        });
      },
      deep: true
    }
  },
  methods: {
    drawLine(id, chartdata) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id));
      let data = this.data;
      // 绘制图表
      let option = {
        color: [this.color],
        tooltip: {
          trigger: "item"
        },
        grid: {
          top: "23%"
        },
        backgroundColor: "#eff4f2",
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#17212c"
            }
          },
          radius: "70%",
          center: ["50%", "53%"],
          indicator: [
            {
              name: "产业匹配",
              max: 100
            },
            //{
              //name: "政策匹配",
              //max: 100
            //},
            {
              name: "风险分析",
              max: 100
            },
            {
              name: "交通匹配",
              max: 100
            },
            {
              name: "企业规模",
              max: 100
            },
            {
              name: "租金匹配",
              max: 100
            },
            {
              name: "成长性",
              max: 100
            },
            {
              name: "联系路径",
              max: 100
            }
          ]
        },
        series: [
          {
            name: "雷达图",
            type: "radar",
            label: {
              show: true
            },
            areaStyle: {
              color: "#fff"
            },
            data: [
              {
                value: [
                  data.fieldScore ? data.fieldScore : 0,
                  //data.policyScore ? data.policyScore : 0,
                  data.creditScore ? data.creditScore : 0,
                  data.traficScore?data.traficScore:0,
                  data.scaleScore?data.scaleScore:0,
                  data.rentScore?data.rentScore:0,
                  data.developScore?data.developScore:0,
                  data.relationScore?data.relationScore:0
                ],
                name: "",
                areaStyle: {
                  normal: {
                    color: this.color
                  }
                }
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
</style>
