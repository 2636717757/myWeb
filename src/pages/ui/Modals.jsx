import React, { Component } from "react";
import "./ui.less";
import { Card, Button, Modal } from "antd";
export default class Modals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal1: false,
      showModal2: false,
      showModal3: false,
      showModal4: false
    };
  }
  handleOpen = type => {
    this.setState({
      [type]: true
    });
  };
  handleConfirm = type => {
    Modal[type]({
      title: "确定？",
      content: "你确定会学React了么？",
      onOk() {
        console.log("ok");
      },
      onCancel() {
        console.log("cancel");
      }
    });
  };
  render() {
    return (
      <div className="modals">
        <Card title="基础模态框" className="card">
          <Button
            type="primary"
            onClick={() => {
              this.handleOpen("showModal1");
            }}
          >
            Open
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.handleOpen("showModal2");
            }}
          >
            自定义页脚
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.handleOpen("showModal3");
            }}
          >
            顶部20px弹窗
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.handleOpen("showModal4");
            }}
          >
            水平垂直居中
          </Button>
        </Card>
        <Card title="信息框" className="card">
          <Button
            type="primary"
            onClick={() => {
              this.handleConfirm("confirm");
            }}
          >
            Confirm
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.handleConfirm("info");
            }}
          >
            Info
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.handleConfirm("success");
            }}
          >
            Success
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.handleConfirm("warning");
            }}
          >
            Warning
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.handleConfirm("error");
            }}
          >
            error
          </Button>
        </Card>
        <Modal
          title="React"
          visible={this.state.showModal1}
          onCancel={() => {
            this.setState({
              showModal1: false
            });
          }}
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
        <Modal
          title="React"
          visible={this.state.showModal2}
          okText="好的"
          onCancel={() => {
            this.setState({
              showModal2: false
            });
          }}
          cancelText="算了"
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
        <Modal
          title="React"
          style={{ top: "20px" }}
          visible={this.state.showModal3}
          onCancel={() => {
            this.setState({
              showModal3: false
            });
          }}
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
        <Modal
          title="React"
          wrapClassName="vertical-center-modal"
          visible={this.state.showModal4}
          onCancel={() => {
            this.setState({
              showModal4: false
            });
          }}
        >
          <p>欢迎学习慕课新推出的React高级课程</p>
        </Modal>
      </div>
    );
  }
}
