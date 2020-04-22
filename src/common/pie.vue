<template>
  <div :id="this.id" :style="{width: '100%', height: '240px'}"></div>
</template>

<script type="text/ecmascript-6">
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "hello",
  data() {
    return {};
  },
  props: {
    id: Number,
    // color: String,
    detaildata: Array
  },
  mounted() {
    this.drawLine(this.id, this.detaildata);
  },
  watch: {
    detaildata: {
      handler(newQuestion, oldQuestion) {
        this.$nextTick(() => {
          this.drawLine(this.id, newQuestion);
        });
      },
      deep: true
    }
  },
  methods: {
    drawLine(id, bardata) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      let option = {
        color: [
          "#3691E0",
          "#E0A15A",
          "#7DDB8D",
          "#6A69E9",
          "#E76A64",
          "#f59a8f",
          "#cf9ef1"
        ],
        tooltip: {
          show: true,
          trigger: "item",
          confine:true,
          formatter:"{b}：{c}家({d}%)"
        },
        grid: {
          top: "5%",
          right: "6%",
          bottom: "10%",
          left: "6%"
        },
        series: [
          {
            name: "注册资本",
            type: "pie",
            radius: "68%",
            center: ["50%", "50%"],
            clockwise: false,
            data: this.detaildata,
            label: {
              normal: {
                textStyle: {
                  color: "#999",
                  fontSize: 14
                }
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 4,
                borderColor: "#ffffff"
              },
              emphasis: {
                borderWidth: 0,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
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
