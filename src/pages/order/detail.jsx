import React, { Component } from 'react';
import { Card } from 'antd';
import './less/detail.less';
import axios from 'axios';
import './../../mock/order_detail';
export default class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderInfo: {},
      map: null,
    };
  }
  componentDidMount() {
    /* 把传递过来的orderId值接收一下 */
    let orderId = this.props.match.params.orderId;
    /* 如果orderId有值得话 */
    if (orderId) {
      this.request(orderId);
    }
  }
  /* 数据 */
  request = orderId => {
    axios.get('order_detail.php').then(res => {
      // console.log(res.data.result);
      this.setState({
        orderInfo: res.data.result,
      });
      this.renderMap(res.data.result);
    });
  };
  /* 百度地图 */
  renderMap = result => {
    // 创建地图实例
    /* 把map定义到this上 */
    this.map = new window.BMapGL.Map('orderDetailMap', {
      enableMapClick: false,
    });
    // 创建点坐标

    /* 调用绘制行驶路线 */
    this.drawBikeRoute(result.position_list);
    /* 调用绘制服务区 */
    this.drawServiceArea(result.area);
    // var point = new window.BMapGL.Point(116.404, 39.915);
    // // 初始化地图，设置中心点坐标和地图级别
    // this.map.centerAndZoom(point, 10);
    this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    /* 调用添加地图控件 */
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
  /* 绘制用户的行驶路线 */
  drawBikeRoute = positionList => {
    let map = this.map;
    /* 定义起始坐标 */
    let startPoint = '';
    /* 定义终止坐标 */
    let endPoint = '';
    // console.log(positionList);
    if (positionList.length > 0) {
      let firstArr = positionList[0];
      // this.point = new window.BMapGL.Point(116.404, 39.915);
      startPoint = new window.BMapGL.Point(firstArr.lon, firstArr.lat);
      /* 添加起始图标，模板文件public里assets */
      let startIcon = new window.BMapGL.Icon(
        '/assets/start_point.png',
        /* 给当前图标的空间设置大小 */
        new window.BMapGL.Size(36, 42),
        {
          /* 给图片添加设置大小 */
          imageSize: new window.BMapGL.Size(36, 42),
          /* 设置位置 */
          anchor: new window.BMapGL.Size(36, 42),
        },
      );
      var Startmarker = new window.BMapGL.Marker(startPoint, {
        icon: startIcon,
      });

      /* 添加起点，并给icon */
      map.addOverlay(Startmarker);

      /* 终止坐标 */
      let lastArr = positionList[positionList.length - 1];
      endPoint = new window.BMapGL.Point(lastArr.lon, lastArr.lat);
      /* 添加起始图标，模板文件public里assets */
      let endIcon = new window.BMapGL.Icon(
        '/assets/end_point.png',
        /* 给当前图标的空间设置大小 */
        new window.BMapGL.Size(36, 42),
        {
          /* 给图片添加设置大小 */
          imageSize: new window.BMapGL.Size(36, 42),
          /* 设置位置 */
          anchor: new window.BMapGL.Size(36, 42),
        },
      );
      var endMarker = new window.BMapGL.Marker(endPoint, { icon: endIcon });

      map.addOverlay(endMarker);

      /* 连接路线图 */
      let trackPoint = [];
      positionList.map(point => trackPoint.push(new window.BMapGL.Point(point.lon, point.lat)));
      // console.log("trackPoint=", trackPoint);
      var polyline = new window.BMapGL.Polyline(trackPoint, {
        strokeColor: '#1869ad',
        strokeWeight: 3,
        strokeOpacity: 1,
      });
      map.addOverlay(polyline);

      /* 调用绘制服务区 (要在最上面定义)*/
      // this.drawServiceArea();
      /* 定义地图中心点，也就是初始化 */
      var point = new window.BMapGL.Point(
        /* 定义中心点为地点和终点连线的中心点 */
        (lastArr.lon + firstArr.lon) / 2,
        (firstArr.lat + lastArr.lat) / 2,
      );
      this.map.centerAndZoom(point, 10);
    }
  };
  /* 绘制服务区 */
  drawServiceArea = area => {
    let map = this.map;
    let trackPoint = [];
    area.map(point => trackPoint.push(new window.BMapGL.Point(point.lon, point.lat)));
    /* 闭合地点和终点 */

    let polygon = new window.BMapGL.Polygon(trackPoint, {
      strokeColor: '#ce0000',
      strokeWeight: 4,
      strokeOpacity: 1,
      fillColor: 'ff8605',
      fillOpacity: 0.4,
    });
    map.addOverlay(polygon);
  };
  render() {
    return (
      <div>
        <Card>
          {/* 存放地图 */}
          <div id="orderDetailMap" className="order-map"></div>
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">
                  {this.state.orderInfo === 1 ? '服务区' : '停车点'}
                </div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content">{this.state.orderInfo.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">{this.state.orderInfo.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">{this.state.orderInfo.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">{this.state.orderInfo.mobile}</div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行驶起点</div>
                <div className="detail-form-content">{this.state.orderInfo.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行程终点</div>
                <div className="detail-form-content">{this.state.orderInfo.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶里程</div>
                <div className="detail-form-content">
                  {this.state.orderInfo.distance / 1000}公里
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    );
  }
}
