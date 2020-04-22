<template>
<div class="mapPoint">
    <div id="allmap" ref="allmap" style="height:600px;"></div>
    <div class="search-cont">
        <div id="r-result"><input type="text" id="suggestId" size="20" value="" placeholder="请输入搜索地址" /></div>
        <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
    </div>
    <div style="float:right;margin-top:10px"><span style="font-size:16px;color:red">可拖动红色图标确定园区位置</span></div>
</div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            map: {}, // 将map设置为全局变量
            newpoint: {},
            newpointname: "",
            selectpoint: {},
            selectname: ""
        };
    },
    props: {
        point: Object,
        pointname: String
    },
    created() {
        this.newpoint = this.point;
        this.selectname = this.pointname;
        console.log(this.pointname);
    },
    mounted() {
        var that = this;
        // 调用地图与绘图工具
        that.initmap();
        var ac = new BMap.Autocomplete({
            //建立一个自动完成的对象
            input: "suggestId",
            location: that.map
        });
        ac.addEventListener("onhighlight", function (e) {
            //鼠标放在下拉列表上的事件
            var str = "";
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1) {
                value =
                    _value.province +
                    _value.city +
                    _value.district +
                    _value.street +
                    _value.business;
            }
            str =
                "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
            console.log(value);
            value = "";

            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value =
                    _value.province +
                    _value.city +
                    _value.district +
                    _value.street +
                    _value.business;
            }
            str +=
                "<br />ToItem<br />index = " +
                e.toitem.index +
                "<br />value = " +
                value;
            document.getElementById("searchResultPanel").innerHTML = str;
            // this.G("searchResultPanel").innerHTML = str;
        });

        var myValue;
        ac.addEventListener("onconfirm", function (e) {
            //鼠标点击下拉列表后的事件
            var _value = e.item.value;
            myValue =
                _value.province +
                _value.city +
                _value.district +
                _value.street +
                _value.business;
            console.log(myValue);
            that.selectname = myValue;
            // this.setplace;
            document.getElementById("searchResultPanel").innerHTML =
                "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

            function aaa() {
                console.log(888);
            }

            function setplace() {
                var thismap = that.map;
                that.map.clearOverlays(); //清除地图上所有覆盖物
                function myFun() {
                    var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
                    var marker = new BMap.Marker(pp);
                    that.selectpoint = pp;
                    console.log(that.selectpoint)
                    var geoc = new BMap.Geocoder();
                    console.log(geoc)
                    that.map.centerAndZoom(pp, 18);
                    that.map.addOverlay(marker); //添加标注
                    marker.enableDragging(); // 可拖拽
                    marker.addEventListener("dragend", function (e) {
                        var x = e.point.lng; //经度
                        var y = e.point.lat; //纬度
                        // console.log("拖到的地点的经纬度：" + x + "，" + y);
                        // that.selectpoint = {
                        //   lng: x,
                        //   lat: y
                        // };
                        geoc.getLocation(new BMap.Point(x, y), function (rs) {
                            var addComp = rs.addressComponents;
                            that.selectpoint = new BMap.Point(x, y);
                            that.selectname = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                            console.log(that.selectpoint)
                            console.log(that.selectname)
                        });
                        // function selectPoint(rs){
                        //   console.log(rs)
                        //   var addComp = rs.addressComponents;
                        //   alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                        // }
                        // geoc.getLocation(that.selectpoint,function(rs){
                        //     //var that = thismap;
                        //     console.log(rs);
                        //     selectPoint(rs);
                        // });
                    });
                }
                var local = new BMap.LocalSearch(that.map, {
                    //智能搜索
                    onSearchComplete: myFun
                });
                local.search(myValue);
            }
            setplace();
        });
    },
    methods: {
        // 初始化地图
        initmap() {
            var _this = this;
            var lng = _this.newpoint.lng;
            var lat = _this.newpoint.lat;
            var point = new BMap.Point(lng, lat);
            _this.map = new BMap.Map("allmap", {
                enableMapClick: false
            }); // 创建Map实例
            console.log(_this.point)
            if (_this.point.lng && _this.point.lat) {
                console.log(_this.point);
                var marker = new BMap.Marker(_this.point);
                _this.selectpoint = _this.point;
                console.log(_this.selectpoint)
                var geoc = new BMap.Geocoder();
                console.log(geoc)
                _this.map.centerAndZoom(_this.point, 18);
                _this.map.addOverlay(marker); //添加标注
                marker.enableDragging(); // 可拖拽
                marker.addEventListener("dragend", function (e) {
                    var x = e.point.lng; //经度
                    var y = e.point.lat; //纬度
                    // console.log("拖到的地点的经纬度：" + x + "，" + y);
                    // _this.selectpoint = {
                    //   lng: x,
                    //   lat: y
                    // };
                    geoc.getLocation(new BMap.Point(x, y), function (rs) {
                        var addComp = rs.addressComponents;
                        _this.selectpoint = new BMap.Point(x, y);
                        _this.selectname = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                        console.log(_this.selectpoint)
                        console.log(_this.selectname)
                    });
                })
            } else {
                console.log(_this.point);
                _this.selectpoint = _this.point;
                console.log(_this.selectpoint)
                var geoc = new BMap.Geocoder();
                _this.map.centerAndZoom("深圳", 12); // 设置地图中心点与显示级别
                var marker = new BMap.Marker(new BMap.Point(114.033487, 22.537692));
                _this.map.addOverlay(marker); //添加标注
                marker.enableDragging(); // 可拖拽
                marker.addEventListener("dragend", function (e) {
                    var x = e.point.lng; //经度
                    var y = e.point.lat; //纬度
                    // console.log("拖到的地点的经纬度：" + x + "，" + y);
                    // _this.selectpoint = {
                    //   lng: x,
                    //   lat: y
                    // };
                    geoc.getLocation(new BMap.Point(x, y), function (rs) {
                        var addComp = rs.addressComponents;
                        _this.selectpoint = new BMap.Point(x, y);
                        _this.selectname = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                        console.log(_this.selectpoint)
                        console.log(_this.selectname)
                    });
                })
            }
            _this.map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
            // this.map.addControl(new BMap.NavigationControl()) // 添加默认缩放平移控件
            // this.map.addControl(new BMap.OverviewMapControl({ isOpen: true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT })) // 添加默认缩略地图控件;右下角，打开
            _this.map.enableInertialDragging(); // 启用地图惯性拖拽，默认禁用
            _this.map.enableContinuousZoom(); // 启用连续缩放效果，默认禁用
        }
        //给父组件传值
        // toParent:function(){
        //   this.$emit("getMapPoint", "子传父", true);
        // }
    }
};
</script>

<style lang="scss" scoped>
.mapPoint {
    position: relative;

    .search-cont {
        position: absolute;
        top: 10px;
        left: 40%;
        z-index: 10000000000;
        background-color: #fff;

        input {
            -webkit-appearance: none;
            background-color: #fff;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: 40px;
            line-height: 40px;
            outline: none;
            padding: 0 15px;
            transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
            width: 300px;
        }
    }
}
</style>
