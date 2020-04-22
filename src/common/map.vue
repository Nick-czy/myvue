<template>
    <div style="height:100%;">
        <div class="Overlay" style="margin:10px 0;position:absolute;top:50px;left:10px;z-index:1;">
            <el-button type="primary" @click="deleteCircle">删除圆</el-button>
            <el-button type="primary" @click="deletePolygon">删除多边形</el-button>
        </div>
        <div id="allmap" ref="allmap" style="height:100%;"></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      // center: { lng: 0, lat: 0 },
      // zoom: 3,
      map: {}, // 将map设置为全局变量
      circle: null,
      circleCenter: [],
      circleRadius: "",
      circleArea: "",
      polygonArea: "",
      pointArr: [],
      circleArr: [],
      polylineArr: [],
      polygonArr: [],
      rectangleArr: [],
      drawer: false
    };
  },
  mounted() {
    // 调用地图与绘图工具
    this.initmap();
    this.initdrawingManager();
  },
  methods: {
    // 初始化地图
    initmap() {
      this.map = new BMap.Map("allmap", { enableMapClick: false }); // 创建Map实例
      // const point = new BMap.Point(116.404, 39.915)
      this.map.centerAndZoom("深圳", 12); // 设置地图中心点与显示级别
      this.map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
      // this.map.addControl(new BMap.NavigationControl()) // 添加默认缩放平移控件
      // this.map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT })) // 添加默认缩略地图控件;右下角，打开
      this.map.enableInertialDragging(); // 启用地图惯性拖拽，默认禁用
      this.map.enableContinuousZoom(); // 启用连续缩放效果，默认禁用
    },
    // 初始化绘图工具
    initdrawingManager() {
      this.deleteAll();
      var styleOptions = {
        strokeColor: "blue", // 边线颜色。
        fillColor: "skyblue", // 填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3, // 边线的宽度，以像素为单位。
        strokeOpacity: 0.5, // 边线透明度，取值范围0 - 1。
        fillOpacity: 0.4, // 填充的透明度，取值范围0 - 1。
        strokeStyle: "solid" // 边线的样式，solid或dashed。
      };
      // 实例化鼠标绘制工具
      this.drawingManager = new BMapLib.DrawingManager(this.map, {
        isOpen: false, // 是否开启绘制模式
        enableDrawingTool: true, // 是否显示工具栏
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_LEFT, // 工具栏显示位置
          offset: new BMap.Size(10, 5) // 偏离值
        },
        circleOptions: styleOptions, // 圆的样式
        polylineOptions: styleOptions, // 线的样式
        polygonOptions: styleOptions, // 多边形的样式
        rectangleOptions: styleOptions // 矩形的样式
      });
      // 给绘图工具添加监听事件
      this.drawingManager.addEventListener(
        "overlaycomplete",
        this.overlaycomplete.bind(this)
      );
    },
    overlaycomplete(e) {
      // 存放绘图工具绘制结果
      if (e.drawingMode === "circle") {
        // 圆
        this.clearData();
        this.circleArr.push(e.overlay);
        this.drawer = true;
        // 删除选中圆
        var removeCircle = (e, ee, circle) => {
          // 这里以及下面右键删除中的circle只是一个参数，如何命名都无所谓
          this.map.removeOverlay(circle);
        };
        var circleMenu = new BMap.ContextMenu();
        circleMenu.addItem(
          new BMap.MenuItem("删除圆", removeCircle.bind(e.overlay))
        );
        e.overlay.addContextMenu(circleMenu);
      } else if (e.drawingMode === "marker") {
        // 点
        this.clearData();
        this.pointArr.push(e.overlay);

        // 点的右键删除菜单
        var removeMarker = (e, ee, marker) => {
          this.map.removeOverlay(marker);
        };
        var markerMenu = new BMap.ContextMenu();
        markerMenu.addItem(
          new BMap.MenuItem("删除点", removeMarker.bind(e.overlay))
        );
        e.overlay.addContextMenu(markerMenu);
      } else if (e.drawingMode === "polyline") {
        // 线
        this.clearData();
        this.polylineArr.push(e.overlay);

        // 删除选中线
        var removePolyline = (e, ee, circle) => {
          this.map.removeOverlay(circle);
        };
        var polylineMenu = new BMap.ContextMenu();
        polylineMenu.addItem(
          new BMap.MenuItem("删除线", removePolyline.bind(e.overlay))
        );
        e.overlay.addContextMenu(polylineMenu);
      } else if (e.drawingMode === "polygon") {
        // 多边形
        this.clearData();
        this.polygonArr.push(e.overlay);
        this.drawer = true;
        // 删除选中多边形
        var removePolygon = (e, ee, circle) => {
          this.map.removeOverlay(circle);
        };
        var polygonMenu = new BMap.ContextMenu();
        polygonMenu.addItem(
          new BMap.MenuItem("删除多边形", removePolygon.bind(e.overlay))
        );
        e.overlay.addContextMenu(polygonMenu);
      } else {
        //  矩形
        this.clearData();
        this.rectangleArr.push(e.overlay);

        // 删除选中矩形
        var removeRectangle = (e, ee, circle) => {
          this.map.removeOverlay(circle);
        };
        var rectangleMenu = new BMap.ContextMenu();
        rectangleMenu.addItem(
          new BMap.MenuItem("删除矩形", removeRectangle.bind(e.overlay))
        );
        e.overlay.addContextMenu(rectangleMenu);
      }
    },
    clearData() {
      this.circleRadius = "";
      this.circleArea = "";
      this.polygonArea = "";
    },
    // 删除全部圆
    deleteCircle() {
      this.circleArr.forEach(e => {
        this.map.removeOverlay(e);
      });
      this.circleArr = [];
    },
    // 删除全部点
    deletePoint() {
      this.pointArr.forEach(e => {
        this.map.removeOverlay(e);
      });
      this.pointArr = [];
    },
    // 删除全部线
    deletePolyline() {
      this.polylineArr.forEach(e => {
        this.map.removeOverlay(e);
      });
      this.polylineArr = [];
    },
    // 删除全部多边形
    deletePolygon() {
      this.polygonArr.forEach(e => {
        this.map.removeOverlay(e);
      });
      this.polygonArr = [];
    },
    // 删除全部矩形
    deleteRectangle() {
      this.rectangleArr.forEach(e => {
        this.map.removeOverlay(e);
      });
      this.rectangleArr = [];
    },
    // 删除全部
    deleteAll() {
      this.clearData();
      this.map.clearOverlays(); // 删除地图上所有覆盖物
    }
  }
  // methods: {
  //   handler({ BMap, map }) {
  //     console.log(BMap, map);
  //     this.center.lng = 116.404;
  //     this.center.lat = 39.915;
  //     this.zoom = 15;
  //   }
  // }
};
</script>

<style>
/* .bm-view {
  width: 100%;
  height: 100%;
} */
.BMapLib_hander,
.BMapLib_hander_hover,
.BMapLib_marker,
.BMapLib_polyline,
.BMapLib_rectangle {
  display: none;
}
</style>