import React, { Component } from 'react';
import { Card } from 'antd';
import BaseForm from './../../components/BaseForm';
import './../../mock/map/bike_list';
import axios from 'axios';
export default class BikeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* 记录车辆的总数 */
      total_count: '',
    };
  }
  request = () => {
    axios.get('bike_list.php').then(res => {
      // console.log(res);
      if (res.data.code === 0) {
        // console.log(res.data.result);
        this.setState({
          total_count: res.data.result.total_count,
        });
        /* 创建百度地图 */
        this.renderMap(res.data.result);
      }
    });
  };
  componentDidMount() {
    this.request();
  }
  /* 创建百度地图 */
  renderMap = res => {
    let list = res.route_list;
    var map = new window.BMapGL.Map('container');
    let gps1 = list[0].split(',');
    let startPoint = new window.BMapGL.Point(gps1[0], gps1[1]);
    let gps2 = list[list.length - 1].split(',');
    let endPoint = new window.BMapGL.Point(gps2[0], gps2[1]);
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    map.centerAndZoom(endPoint, 10);

    let startIcon = new window.BMapGL.Icon(
      '/assets/start_point.png',
      /* 给当前图标的空间设置大小 */
      new window.BMapGL.Size(36, 42),
      {
        /* 给图片添加设置大小 */
        imageSize: new window.BMapGL.Size(36, 42),
        /* 设置位置 */
        anchor: new window.BMapGL.Size(18, 42),
      },
    );
    var Startmarker = new window.BMapGL.Marker(startPoint, {
      icon: startIcon,
    });

    /* 添加起点，并给icon */
    map.addOverlay(Startmarker);
    let endIcon = new window.BMapGL.Icon(
      '/assets/end_point.png',
      /* 给当前图标的空间设置大小 */
      new window.BMapGL.Size(36, 42),
      {
        /* 给图片添加设置大小 */
        imageSize: new window.BMapGL.Size(36, 42),
        /* 设置位置 */
        anchor: new window.BMapGL.Size(18, 42),
      },
    );
    var endMarker = new window.BMapGL.Marker(endPoint, { icon: endIcon });

    map.addOverlay(endMarker);

    //绘制行车路线
    let routeList = [];
    list.forEach(value => {
      let p = value.split(',');
      routeList.push(new window.BMapGL.Point(p[0], p[1]));
    });
    let polyLine = new window.BMapGL.Polyline(routeList, {
      strokeColor: '#ef4136',
      strokeWeight: 2,
      strokeOpacity: 1,
    });
    map.addOverlay(polyLine);

    //绘制服务区
    let servicePointList = [];
    let serviceList = res.service_list;
    serviceList.forEach(value => {
      servicePointList.push(new window.BMapGL.Point(value.lon, value.lat));
    });
    let polyServiceLine = new window.BMapGL.Polyline(servicePointList, {
      strokeColor: '#ef4136',
      strokeWeight: 3,
      strokeOpacity: 1,
    });
    map.addOverlay(polyServiceLine);

    //绘制自行车
    let bikeList = res.bike_list;
    let bikeIcon = new window.BMapGL.Icon(
      '/assets/bike.jpg',
      /* 给当前图标的空间设置大小 */
      new window.BMapGL.Size(36, 42),
      {
        /* 给图片添加设置大小 */
        imageSize: new window.BMapGL.Size(36, 42),
        /* 设置位置 */
        anchor: new window.BMapGL.Size(18, 42),
      },
    );
    bikeList.forEach(item => {
      let p = item.split(',');
      let point = new window.BMapGL.Point(p[0], p[1]);
      let bikeMarker = new window.BMapGL.Marker(point, { icon: bikeIcon });
      map.addOverlay(bikeMarker);
    });
  };
  /* 点击查询 */
  handleFilter = data => {
    /* 是要给后台的数据 */
    this.data = data;
    this.request();
  };
  formList = [
    {
      type: '城市',
      list: [
        { id: '0', name: '全部' },
        { id: '1', name: '北京' },
        { id: '2', name: '上海' },
        { id: '3', name: '深圳' },
        { id: '4', name: '杭州' },
      ],

      width: 120,
    },
    {
      type: '时间查询',
    },
    {
      type: 'SELECT',
      label: '订单状态',
      field: 'order_status',
      placeholder: '全部',
      initailValue: '0',
      list: [
        { id: '0', name: '全部' },
        { id: '1', name: '进行中' },
        { id: '2', name: '行程结束' },
      ],
    },
  ];
  render() {
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} handleFilter={this.handleFilter} />
        </Card>

        <Card style={{ marginTop: '10px' }}>
          <div>共{this.state.total_count}辆车</div>
          <div id="container" style={{ height: '500px' }}></div>
        </Card>
      </div>
    );
  }
}
