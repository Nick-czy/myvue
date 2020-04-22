<template>
  <div :id="this.id" :style="{width: '100%', height: '240px'}"></div>
</template>

<script type="text/ecmascript-6">
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
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
    detaildata: Array,
    xAxisdata: Array
  },
  mounted() {
    // console.log(this.detaildata,this.xAxisdata);
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
    },
    xAxisdata: {
      handler(newQuestion, oldQuestion) {
        this.$nextTick(() => {
          this.xAxisdata = newQuestion;
        });
      },
      deep: true
    }
  },
  methods: {
    drawLine(id, bardata) {
      var totalNum = 0;
      bardata.forEach((item,index,array)=>{
          //执行代码
          totalNum += item
      })
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id));
      // 绘制图表
      var colorArray = [
        {
          top: "#12BDFE",
          bottom: "#1C9FFF"
        },
        {
          top: "#438FFF",
          bottom: "#6F75FE"
        },
        {
          top: "#FF622B",
          bottom: "#FE7305"
        },
        {
          top: "#EC6E79",
          bottom: "#E34B6B"
        },
        {
          top: "#448EFE",
          bottom: "#7175FF"
        },
        {
          top: "#7CD98B",
          bottom: "#6CBF7B"
        }
      ];
      let option = {
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type:"shadow"
          },
          confine:true,
          formatter:function(params){
            return params[0].name + "：<br>" + params[0].value + "家(" + (params[0].value/totalNum*100).toFixed(2) + "%)";
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "5%",
          containLabel: true
        },
        yAxis: {
          type: "category",
          data: this.xAxisdata,
          axisLine: {
            lineStyle: {
              color: "#dfe4eb"
            }
          },
          axisLabel: {
            color: "#787e85",
            interval: 0,
            formatter: function(params) {
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 8; //一行显示几个字
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = "";
                  var start = p * provideNumber;
                  var end = start + provideNumber;
                  if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    tempStr = params.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr;
                }
              } else {
                newParamsName = params;
              }
              return newParamsName;
            }
          }
        },
        xAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#dfe4eb"
            }
          },
          axisLabel: {
            color: "#787e85",
            rotate:20
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          }
        },
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: "16",
            label: {
              normal: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  let num = colorArray.length;
                  return {
                    type: "linear",
                    colorStops: [
                      {
                        offset: 0,
                        color: colorArray[params.dataIndex % num].bottom
                      },
                      {
                        offset: 1,
                        color: colorArray[params.dataIndex % num].top
                      }
                    ]
                    //globalCoord: false
                  };
                },
                barBorderRadius: [0, 30, 30, 0]
              }
            },
            data: this.detaildata
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
