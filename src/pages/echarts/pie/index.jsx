import React, { Component } from 'react';
import { Card } from 'antd';
import echartsTheme from './../customed';
//echarts按需加载
import echarts from 'echarts/lib/echarts';
//导入柱形图
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
/* 以组件的形式 */
import ReactEcharts from 'echarts-for-react';
export default class Pie extends Component {
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
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c}({d}%)',
      },
      legend: {
        /* 位置 */
        orient: 'vertical',
        right: 10,
        top: 20,
        button: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周七'],
      },
      series: {
        name: '订单量',
        type: 'pie',
        data: [
          {
            value: 1000,
            name: '周一',
          },
          {
            value: 1000,
            name: '周二',
          },
          {
            value: 2000,
            name: '周三',
          },
          {
            value: 1500,
            name: '周四',
          },
          {
            value: 3000,
            name: '周五',
          },
          {
            value: 2000,
            name: '周六',
          },
          {
            value: 1200,
            name: '周日',
          },
        ],
      },
    };
    return option;
  };
  getOption2 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c}({d}%)',
      },
      legend: {
        /* 位置 */
        orient: 'vertical',
        right: 10,
        top: 20,
        button: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周七'],
      },
      series: {
        name: '订单量',
        type: 'pie',
        radius: ['50%', '60%'],
        center: ['30%', '60%'],
        data: [
          {
            value: 1000,
            name: '周一',
          },
          {
            value: 1000,
            name: '周二',
          },
          {
            value: 2000,
            name: '周三',
          },
          {
            value: 1500,
            name: '周四',
          },
          {
            value: 3000,
            name: '周五',
          },
          {
            value: 2000,
            name: '周六',
          },
          {
            value: 1200,
            name: '周日',
          },
        ],
      },
    };
    return option;
  };
  getOption3 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c}({d}%)',
      },
      legend: {
        /* 位置 */
        orient: 'vertical',
        right: 10,
        top: 20,
        button: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周七'],
      },
      series: {
        name: '订单量',
        type: 'pie',
        center: ['30%', '60%'],
        roseType: 'radius',
        data: [
          {
            value: 1000,
            name: '周一',
          },
          {
            value: 1000,
            name: '周二',
          },
          {
            value: 2000,
            name: '周三',
          },
          {
            value: 1500,
            name: '周四',
          },
          {
            value: 3000,
            name: '周五',
          },
          {
            value: 2000,
            name: '周六',
          },
          {
            value: 1200,
            name: '周日',
          },
        ].sort((a, b) => {
          return a.value - b.value;
        }),
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function(idx) {
          return Math.random() * 200;
        },
      },
    };
    return option;
  };
  render() {
    return (
      <div>
        <Card title="饼图表之一">
          <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: '500px' }} />
        </Card>
        <Card title="饼图表之二">
          <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: '500px' }} />
        </Card>
        <Card title="饼图表之三">
          <ReactEcharts option={this.getOption3()} theme="Imooc" style={{ height: '500px' }} />
        </Card>
      </div>
    );
  }
}
