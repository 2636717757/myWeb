import React, { Component } from 'react';
import { Card } from 'antd';
import echartsTheme from './../customed';
//echarts按需加载
import echarts from 'echarts/lib/echarts';
//导入柱形图
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
/* 以组件的形式 */
import ReactEcharts from 'echarts-for-react';
export default class Line extends Component {
  componentWillMount() {
    /* 定义主题 */
    /* 第一个参数是主题的名称 */
    echarts.registerTheme('Imooc', echartsTheme);
  }
  /* 定义图表 */
  getOption = () => {
    let option = {
      title: {
        text: '用户骑行订单',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      yAxis: {
        type: 'value',
      },

      series: {
        name: 'OFO订单量',
        type: 'line',
        data: [1000, 1000, 2000, 1500, 3000, 2000, 1200],
      },
    };
    return option;
  };
  getOption2 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      yAxis: {
        type: 'value',
      },
      legend: {
        data: ['OFO订单量', '膜拜订单量'],
      },
      series: [
        {
          name: 'OFO订单量',
          type: 'line',
          data: [1000, 1000, 2000, 1500, 3000, 2000, 1200],
        },
        {
          name: '膜拜订单量',
          type: 'line',
          data: [1200, 800, 5401, 3102, 1202, 414, 2000],
        },
      ],
    };
    return option;
  };
  getOption3 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      },
      yAxis: {
        type: 'value',
      },

      series: {
        name: 'OFO订单量',
        type: 'line',
        data: [1000, 1000, 2000, 1500, 3000, 2000, 1200],
        areaStyle: {},
      },
    };
    return option;
  };
  render() {
    return (
      <div>
        <Card title="折线图表之一">
          <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: '500px' }} />
        </Card>
        <Card title="折线图表之二">
          <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: '500px' }} />
        </Card>
        <Card title="折线图表之三">
          <ReactEcharts option={this.getOption3()} theme="Imooc" style={{ height: '500px' }} />
        </Card>
      </div>
    );
  }
}
