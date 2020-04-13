import React, { Component } from 'react';
import { Card } from 'antd';
import echartsTheme from './../customed';
//echarts按需加载
import echarts from 'echarts/lib/echarts';
//导入柱形图
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
/* 以组件的形式 */
import ReactEcharts from 'echarts-for-react';
export default class Bar extends Component {
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
      series: [{ name: '订单量', type: 'bar', data: [1000, 2000, 1500, 3000, 2000, 1200, 800] }],
    };
    return option;
  };
  getOption2 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
      },
      legend: {
        data: ['OFO', '膜拜', '小蓝'],
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
      series: [
        { name: 'OFO', type: 'bar', data: [1000, 2000, 1400, 300, 2400, 1210, 1000] },
        { name: '膜拜', type: 'bar', data: [1550, 530, 1730, 3000, 2004, 1200, 2500] },
        { name: '小蓝', type: 'bar', data: [5000, 500, 100, 3000, 2000, 120, 4000] },
      ],
    };
    return option;
  };
  render() {
    return (
      <div>
        <Card title="柱形图表之一">
          <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: '500px' }} />
        </Card>
        <Card title="柱形图表之二">
          <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: '500px' }} />
        </Card>
      </div>
    );
  }
}
