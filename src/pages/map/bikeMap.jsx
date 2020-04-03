import React, { Component } from "react";
import { Card } from "antd";
import BaseForm from "./../../components/BaseForm";
import "./../../mock/map/bike_list";
import axios from "axios";
export default class BikeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_count: ""
    };
  }
  request = () => {
    axios.get("bike_list.php").then(res => {
      // console.log(res);
      if (res.data.code === 0) {
        // console.log(res.data.result);
        this.setState({
          total_count: res.data.result.total_count
        });
        this.renderMap(res.data.result);
      }
    });
  };
  /* 渲染地图数据 */
  renderMap = result => {
    this.map = new window.BMapGL.Map("container", {
      enableMapClick: false
    });
    this.drawBikeRoute(result.service_list);
    // this.drawServiceArea(/* result.area */);
    // this.map.enableScrollWheelZoom(true);
    this.addMapControl();
  };
  /* 添加地图控件 */
  addMapControl = () => {
    let map = this.map;
    var scaleCtrl = new window.BMapGL.ScaleControl(); // 添加比例尺控件
    map.addControl(scaleCtrl);
    var zoomCtrl = new window.BMapGL.ZoomControl(); // 添加比例尺控件
    map.addControl(zoomCtrl);
  };
  drawBikeRoute = positionList => {
    let map = this.map;
    /* 定义起始坐标 */
    let startPoint = "";
    /* 定义终止坐标 */
    let endPoint = "";
    // console.log(positionList);
    if (positionList.length > 0) {
      let firstArr = positionList[0];
      // this.point = new window.BMapGL.Point(116.404, 39.915);
      startPoint = new window.BMapGL.Point(firstArr.lon, firstArr.lat);
      /* 添加起始图标，模板文件public里assets */
      let startIcon = new window.BMapGL.Icon(
        "/assets/start_point.png",
        /* 给当前图标的空间设置大小 */
        new window.BMapGL.Size(36, 42),
        {
          /* 给图片添加设置大小 */
          imageSize: new window.BMapGL.Size(36, 42),
          /* 设置位置 */
          anchor: new window.BMapGL.Size(36, 42)
        }
      );
      var Startmarker = new window.BMapGL.Marker(startPoint, {
        icon: startIcon
      });
      /* 添加起点，并给icon */
      map.addOverlay(Startmarker);
      /* 终止坐标 */
      let lastArr = positionList[positionList.length - 1];
      endPoint = new window.BMapGL.Point(lastArr.lon, lastArr.lat);
      /* 添加起始图标，模板文件public里assets */
      let endIcon = new window.BMapGL.Icon(
        "/assets/end_point.png",
        /* 给当前图标的空间设置大小 */
        new window.BMapGL.Size(36, 42),
        {
          /* 给图片添加设置大小 */
          imageSize: new window.BMapGL.Size(36, 42),
          /* 设置位置 */
          anchor: new window.BMapGL.Size(36, 42)
        }
      );
      var endMarker = new window.BMapGL.Marker(endPoint, { icon: endIcon });
      map.addOverlay(endMarker);
      /* 连接路线图 */
      let trackPoint = [];
      positionList.map(point =>
        trackPoint.push(new window.BMapGL.Point(point.lon, point.lat))
      );
      // console.log("trackPoint=", trackPoint);
      var polyline = new window.BMapGL.Polyline(trackPoint, {
        strokeColor: "#1869ad",
        strokeWeight: 3,
        strokeOpacity: 1
      });
      map.addOverlay(polyline);
      /* 调用绘制服务区 (要在最上面定义)*/
      // this.drawServiceArea();
      /* 定义地图中心点，也就是初始化 */
      var point = new window.BMapGL.Point(
        /* 定义中心点为地点和终点连线的中心点 */
        (lastArr.lon + lastArr.lon) / 2,
        (firstArr.lat + lastArr.lat) / 2
      );
      this.map.centerAndZoom(point, 10);
    }
  };
  /* 绘制服务区 */
  // drawServiceArea = area => {
  //   let map = this.map;
  //   let trackPoint = [];
  //   area.map(point =>
  //     trackPoint.push(new window.BMapGL.Point(point.lon, point.lat))
  //   );
  //   /* 闭合地点和终点 */
  //   let polygon = new window.BMapGL.Polygon(trackPoint, {
  //     strokeColor: "#ce0000",
  //     strokeWeight: 4,
  //     strokeOpacity: 1,
  //     fillColor: "ff8605",
  //     fillOpacity: 0.4
  //   });
  //   map.addOverlay(polygon);
  // };
  /* 点击查询 */
  handleFilter = data => {
    /* 是要给后台的数据 */
    this.data = data;
    this.request();
  };
  formList = [
    {
      type: "城市",
      list: [
        { id: "0", name: "全部" },
        { id: "1", name: "北京" },
        { id: "2", name: "上海" },
        { id: "3", name: "深圳" },
        { id: "4", name: "杭州" }
      ],

      width: 120
    },
    {
      type: "时间查询"
    },
    {
      type: "SELECT",
      label: "订单状态",
      field: "order_status",
      placeholder: "全部",
      initailValue: "0",
      list: [
        { id: "0", name: "全部" },
        { id: "1", name: "进行中" },
        { id: "2", name: "行程结束" }
      ]
    }
  ];
  render() {
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} handleFilter={this.handleFilter} />
        </Card>

        <Card style={{ marginTop: "10px" }}>
          <div>共{this.state.total_count}辆车</div>
          <div id="container" style={{ height: "500px" }}></div>
        </Card>
      </div>
    );
  }
}
