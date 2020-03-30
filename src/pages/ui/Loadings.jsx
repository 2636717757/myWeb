import React, { Component } from "react";
import "./ui.less";
import { Card, Spin, Alert } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
export default class Loadings extends Component {
  render() {
    const icon = <LoadingOutlined style={{ fontSize: "30px" }} />;
    return (
      <div>
        <Card title="Spin用法" className="card">
          <Spin size="small" />
          <Spin size="default" />
          <Spin size="large" />
          <Spin indicator={icon} />
        </Card>
        <Card title="内容遮罩" className="card">
          <Alert
            message="React"
            description="欢迎来到React高级实战课程"
            type="info"
          />

          <Spin>
            <Alert
              message="React"
              description="欢迎来到React高级实战课程"
              type="warning"
            />
          </Spin>
          <Spin tip="加载中...">
            <Alert
              message="React"
              description="欢迎来到React高级实战课程"
              type="warning"
            />
          </Spin>
          <Spin indicator={icon}>
            <Alert
              message="React"
              description="欢迎来到React高级实战课程"
              type="warning"
            />
          </Spin>
        </Card>
      </div>
    );
  }
}
