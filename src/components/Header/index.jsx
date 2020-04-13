/* 
jsonp(url,opts,fn):
url:请求地址,
opts:选项，参数({param:"默认callback"}或{timeout:"默认60000"}或{prefix:"默认__jp"}或{name:"默认prefix+incremented counter"}),
fn:回调函数
*/
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './index.less';
import Util from './../../utils/utils';
import axios from 'axios';
import { connect } from 'react-redux';
//统一管理jsonp
// import axios from "./../../axios/index";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'tom',
      sysTime: '',
      dayPictureUrl: '',
      weather: '',
      error: '',
    };
  }
  componentDidMount() {
    setInterval(() => {
      let sysTime = Util.formateDate(new Date().getTime());
      this.setState({
        sysTime,
      });
    }, 1000);
    //配置代理
    let city = 'beijing';
    let weatherUrl = 'location=' + city + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2';
    axios
      .get('/weather?' + weatherUrl)
      .then(res => {
        console.log(res.data);
        if (res.data.status === 'success') {
          let data = res.data.results[0].weather_data[0];
          this.setState({
            dayPictureUrl: data.dayPictureUrl,
            weather: data.weather,
          });
        } else {
          this.setState({
            error: <span style={{ color: '#ff0000' }}>{res.data.message}</span>,
          });
        }
      })
      .catch(e => {});
    /*  //统一管理josnp
    this.getWeatherAPIData(); */
  }
  /*  //统一管理josnp
  getWeatherAPIData() {
    let city = "beijing";
    
    axios
      .jsonp({
        url:
          "http://api.map.baidu.com/telematics/v3/weather?location=" +
          city +
          "&output=json&ak=3p49MVra6urFRGOT9s8UBWr2"
      })
      .then(res => {
        if (res.status === "success") {
          let data = res.results[0].weather_data[0];
          this.setState({
            //  天气图片 
            dayPictureUrl: data.dayPictureUrl,
            // 天气 
            weather: data.weather
          });
        }
      });
  } */
  render() {
    /* Common组件传过来的属性menuType */
    let { menuType } = this.props;
    return (
      <div className="header">
        <Row className="header-top">
          {menuType ? (
            <Col span="6" className="logo">
              <img src="/assets/logo-ant.svg" alt="" />
              <span>IMooc 通用管理系统</span>
            </Col>
          ) : (
            ''
          )}
          <Col span={menuType ? '18' : '24'}>
            <span>欢迎，{this.state.userName}</span>
            <a href="/">退出</a>
          </Col>
        </Row>
        {/* 用Common组件传过来的属性menuType进行判断 */}
        {menuType ? (
          ''
        ) : (
          <Row className="breadcrumb">
            <Col span="4" className="breadcrumb-title">
              {this.props.mianbaoxie}
            </Col>
            <Col span="20" className="weather">
              <span className="date">{this.state.sysTime}</span>
              <span className="weather-img">
                <img src={this.state.dayPictureUrl} alt="" />
              </span>
              <span className="weather-detail">
                {this.state.weather}
                {this.state.error}
              </span>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    mianbaoxie: state.get('mianbaoxie'),
  };
};
export default connect(mapStateToProps)(Header);
