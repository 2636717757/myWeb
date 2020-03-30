import React, { Component } from "react";
import { Row, Col } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavLeft from "./components/NavLeft";
import "./style/common.less";

export default class Admin extends Component {
  render() {
    return (
      <Row className="container">
        <Col span={4}>
          <NavLeft />
        </Col>
        <Col span={20} className="main">
          <Header />
          <Row className="content">
            <Col span={24}>
              {
                /* 加载这个组件的所有子路由 */
                this.props.children
              }
            </Col>
          </Row>
          <Footer />
        </Col>
      </Row>
    );
  }
}
