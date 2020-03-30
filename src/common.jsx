import React, { Component } from "react";
import { Row, Col } from "antd";
import Header from "./components/Header/index";
import "./style/common.less";
export default class Common extends Component {
  render() {
    return (
      <div>
        {/* 这个simple-page样式是Header组件的less文件中的样式 */}
        <Row className="simple-page">
          <Col span="24">
            {/* 给Header传递menuType这个属性，然后在Header组件中进行判断 */}
            <Header menuType="second" />
          </Col>
        </Row>
        {/* 这个content样式是和Admin里的content一样的 */}
        <Row className="content">
          <Col span="24">{this.props.children}</Col>
        </Row>
      </div>
    );
  }
}
