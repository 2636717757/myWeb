import React, { Component } from "react";
import { Card, Form, Select, Button, Table, Modal, message } from "antd";
import "./../../mock/city_list";
import "./../../mock/city_open";
import axios from "axios";
import Loading from "./../loading/loading";
export default class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: false,
      isShowOpenCity: false
    };
  }
  componentDidMount() {
    /*  axios.get("/open_city").then(res => {
      console.log(res);
    }); */
    this.request();
  }
  request = () => {
    this.setState({
      loading: true
    });
    axios.get("city_list.php").then(res => {
      this.setState({
        list: res.data.result.item_list,
        loading: false
      });
    });
  };
  /* 点击开通城市时调用的函数 */
  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    });
  };
  /* 开通城市点击确定时调用的函数 */
  handleSubmit = () => {
    // console.log(this.refs.form.refs.form.getFieldValue());
    axios.get("city_open.php").then(res => {
      console.log(res);
      this.setState({
        isShowOpenCity: false
      });
      message.success("开通成功");
    });
  };
  render() {
    /* 表头 */
    const columns = [
      {
        title: "城市ID",
        dataIndex: "id"
      },
      {
        title: "城市名称",
        dataIndex: "name"
      },
      {
        title: "用车模式",
        dataIndex: "mode",
        render(mode) {
          return mode === 1 ? "停车点" : "禁停区";
        }
      },
      {
        title: "营运模式",
        dataIndex: "op_mode",
        render(op_mode) {
          return op_mode === 1 ? "加盟" : "自营";
        }
      },
      {
        title: "授权加盟商",
        dataIndex: "franchisee_name"
      },
      {
        title: "城市管理员",
        dataIndex: "city_admins",
        /* 把返给他的数据进行处理 */
        /* 如果这里不进行处理会报错 */
        render(arr) {
          return arr
            .map((value, index) => {
              /* 把user_id弄了出去 */
              return value.user_name;
            })
            .join(",");
        }
      },
      {
        title: "城市开通时间",
        dataIndex: "open_time"
      },
      {
        title: "操作时间",
        dataIndex: "update_time",
        render() {
          /* 可用utils里自己封装的时间 */
          return new Date().getTime();
        }
      },
      {
        title: "操作人",
        dataIndex: "sys_user_name"
      }
    ];
    /* 表体 */
    let dataSource = this.state.list.map((item, index) => {
      item.key = index;
      return item;
    });

    return (
      <div>
        {this.state.loading ? <Loading /> : ""}
        <Card>
          <FilterForm />
        </Card>
        <Card>
          <Button
            type="primary"
            onClick={() => {
              this.handleOpenCity();
            }}
          >
            开通城市
          </Button>
        </Card>
        <Card>
          {/* {<div>} */}
          <Table bordered columns={columns} dataSource={dataSource} />
          {/* </div> */}
        </Card>
        <Modal
          title="开通城市"
          visible={this.state.isShowOpenCity}
          /* 点击取消，或失去焦点，或点击差 的回调*/
          onCancel={() => {
            this.setState({
              isShowOpenCity: false
            });
          }}
          /* 点击确定的回调 */
          onOk={() => {
            this.handleSubmit();
          }}
        >
          <OpenCityForm ref="form" />
        </Modal>
      </div>
    );
  }
}

/* 这个页面的表单 */
class FilterForm extends Component {
  handleClick = () => {
    console.log(this.refs.form);
  };
  render() {
    return (
      /* layout="inline" :内联表单 */
      <Form layout="inline" name="form" ref="form">
        <Form.Item name="city_id" label="城市">
          <Select placeholder="全部" style={{ width: "120px" }}>
            <Select.Option value="">全部</Select.Option>
            <Select.Option value="bj">北京</Select.Option>
            <Select.Option value="hz">杭州</Select.Option>
            <Select.Option value="sh">上海</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="mode" label="用车模式">
          <Select placeholder="全部" style={{ width: "140px" }}>
            <Select.Option value="">全部</Select.Option>
            <Select.Option value="1">指定停车点模式</Select.Option>
            <Select.Option value="2">禁停区模式</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="营运模式">
          <Select name="op_mode" placeholder="全部" style={{ width: "120px" }}>
            <Select.Option value="">全部</Select.Option>
            <Select.Option value="1">自营</Select.Option>
            <Select.Option value="2">加盟</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="auth_status" label="加盟商授权状态">
          <Select placeholder="全部" style={{ width: "120px" }}>
            <Select.Option value="">全部</Select.Option>
            <Select.Option value="1">已授权</Select.Option>
            <Select.Option value="2">未授权</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            style={{ margin: "0px 20px" }}
            htmlType="submit"
            onClick={() => {
              this.handleClick();
            }}
          >
            查询
          </Button>
          <Button>重置</Button>
        </Form.Item>
      </Form>
    );
  }
}
/* Modal里面的表单 */
class OpenCityForm extends Component {
  handleClick = () => {
    console.log(this.refs.form);
  };

  render() {
    const formItemLayout = {
      /* 定义lable所占的宽度 */
      lablecol: {
        span: 5
      },
      /* 定义表单所占的宽度 */
      wrapperCol: {
        span: 10
      }
    };
    return (
      <Form
        /* 水平方向的，一行一行的 */
        layout="horizontal"
        ref="form"
        name="form"
      >
        <Form.Item label="选择城市" name="city_id" {...formItemLayout}>
          <Select style={{ width: "100px" }}>
            <Select.Option value="">全部</Select.Option>
            <Select.Option value="1">北京市</Select.Option>
            <Select.Option value="2">天津市</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="营运模式" name="op_mode" {...formItemLayout}>
          <Select /* style={{ width: "300px" }} */>
            <Select.Option value="1">自营</Select.Option>
            <Select.Option value="2">加盟</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="用车模式" name="use_mode" {...formItemLayout}>
          <Select /* style={{ width: "300px" }} */>
            <Select.Option value="1">指定停车点</Select.Option>
            <Select.Option value="2">禁停区</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    );
  }
}
