import React, { Component } from "react";
import { Card, Button, Radio } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  LeftOutlined,
  RightOutlined
} from "@ant-design/icons";
import "./ui.less";
export default class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      size: "default"
    };
  }
  render() {
    return (
      <div className="buttons">
        <Card title="基础按钮" className="card">
          <Button type="primary">Imooc</Button>
          <Button>Imooc</Button>
          <Button type="dashed">Imooc</Button>
          <Button type="danger">Imooc</Button>
          <Button disabled>Imooc</Button>
        </Card>
        <Card title="图形按钮" className="card">
          <Button icon={<PlusOutlined />}>创建</Button>
          <Button icon={<EditOutlined />}>编辑</Button>
          <Button icon={<DeleteOutlined />}>删除</Button>
          <Button shape="circle" icon={<SearchOutlined />}></Button>
          <Button type="primary" icon={<SearchOutlined />}>
            搜索
          </Button>
          <Button type="primary" icon={<DownloadOutlined />}>
            下载
          </Button>
        </Card>
        <Card className="card">
          <Button type="primary" loading={this.state.loading}>
            确定
          </Button>
          <Button
            type="primary"
            shape="circle"
            loading={this.state.loading}
          ></Button>
          <Button
            onClick={() => {
              this.setState({
                loading: true
              });
            }}
          >
            点击加载
          </Button>
          <Button shape="circle" loading={this.state.loading}></Button>
          <Button
            type="primary"
            onClick={() => {
              this.setState({
                loading: false
              });
            }}
          >
            关闭
          </Button>
        </Card>
        <Card title="按钮组" className="card">
          {/* 定义一组按钮 */}
          <Button.Group>
            <Button
              type="primary"
              style={{ marginRight: "0px" }}
              icon={<LeftOutlined />}
            >
              返回
            </Button>
            <Button
              style={{}}
              type="primary"
              icon={
                <RightOutlined style={{ float: "right", lineHeight: "22px" }} />
              }
            >
              前进
            </Button>
          </Button.Group>
        </Card>
        <Card title="按钮尺寸" className="card">
          <Radio.Group
            onChange={e => {
              this.setState({
                size: e.target.value
              });
            }}
          >
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </Radio.Group>
          <Button type="primary" size={this.state.size}>
            Imooc
          </Button>
          <Button size={this.state.size}>Imooc</Button>
          <Button type="dashed" size={this.state.size}>
            Imooc
          </Button>
          <Button type="danger" size={this.state.size}>
            Imooc
          </Button>
        </Card>
      </div>
    );
  }
}
