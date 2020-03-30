import React, { Component } from "react";
import {
  Form,
  Select,
  Button,
  Card,
  Table,
  DatePicker,
  Modal,
  message
} from "antd";
import "./../../mock/order_list";
import axios from "axios";
import "./../../mock/order_edike_info";
import "./../../mock/finish_order";
import BaseForm from "./../../components/BaseForm/index";
import ETable from "./../../components/ETable/index";

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item_list: [],
      /* 结束订单Madal显示的绑定 */
      orderConfirmVisible: false,
      /* 点击结束订单回来的数据 */
      orderInfo: {},
      // selectedRowKeys: undefined,
      /* 定义表格点击哪一行，对应的数据 */
      selectItem: []
    };
  }
  getSelectItem = selectItem => {
    this.setState({
      selectItem
    });
  };
  /* 给全局表单传递的数据来生成表单 */
  formList = [
    {
      type: "SELECT",
      label: "城市",
      field: "city",
      placeholder: "全部",
      initialValue: "1",
      width: 100,
      list: [
        { id: "0", name: "全部" },
        { id: "1", name: "北京" },
        { id: "2", name: "天津" },
        { id: "3", name: "上海" }
      ]
    },
    {
      type: "时间查询"
    },
    {
      type: "SELECT",
      label: "订单状态",
      field: "order_status",
      placeholder: "全部",
      initialValue: "1",
      width: 140,
      list: [
        { id: "0", name: "全部" },
        { id: "1", name: "进行中" },
        { id: "2", name: "进行中(临时锁车)" },
        { id: "3", name: "结束行程" }
      ]
    }
  ];
  handleFilter = param => {
    /* BaseForm传过来的数据 */
    console.log(param);
    this.param = param;

    this.request();
  };
  componentDidMount() {
    this.request();
  }
  /* 接收数据 */
  request = () => {
    /* 可以在这里获取BaseForm传过来的param然后在地址那里传递给后端 */
    axios.get("order_list.php").then(res => {
      //   console.log("order_list", res.data.result.item_list);
      this.setState({
        item_list: res.data.result.item_list
      });
    });
  };
  /* 点击结束订单的回调 */
  handleConfirm = () => {
    if (!this.state.selectItem.id) {
      /* 如果没有选择订单，给的警告 */
      Modal.info({
        title: "信息",
        content: "请选择一条订单进行结束"
      });
      return;
    }
    axios.get("order_edike_info.php").then(res => {
      // console.log(res.data.result);
      this.setState({
        orderInfo: res.data.result,
        orderConfirmVisible: true
      });
    });
  };
  /* 点击结束订单的ok的回调 */
  handleFinishOrder = () => {
    /* 请求一个数据让订单结束，删除订单 */
    axios.get("finish_order.php").then(res => {
      // console.log(res.data.result);
      message.success(res.data.result);
      this.setState({
        orderConfirmVisible: false
      });
      this.request();
    });
  };
  /* 点击表格每行的回调函数 */
  // onRowClick = (record, index) => {
  //   // console.log(record);
  //   console.log(index);
  //   this.setState({
  //     selectedRowKeys: [index],
  //     selectItem: record
  //   });
  // };
  /* 点击订单详情的回调 */
  openOrderDetail = () => {
    if (!this.state.selectItem.id) {
      /* 如果没有选择订单，给的警告 */
      Modal.info({
        title: "信息",
        content: "请选择一条订单进行查询"
      });
      return;
    }
    window.open(`/common/order/detail/${this.state.selectItem.id}`, "_blank");
  };
  render() {
    /* 表头 */
    const columns = [
      {
        title: "订单编号",
        dataIndex: "order_sn"
      },
      {
        title: "车辆编号",
        dataIndex: "bike_sn"
      },
      {
        title: "用户名",
        dataIndex: "user_name"
      },
      {
        title: "手机号",
        dataIndex: "mobile"
      },
      {
        title: "里程",
        dataIndex: "distance",
        /* 返回值进行处理 */
        render: distance => {
          return distance / 1000 + "Km";
        }
      },
      {
        title: "行驶时长",
        dataIndex: "total_time"
      },
      {
        title: "状态",
        dataIndex: "status"
      },
      {
        title: "开始时间",
        dataIndex: "start_time"
      },
      {
        title: "结束时间",
        dataIndex: "end_time"
      },
      {
        title: "订单金额",
        dataIndex: "total_fee"
      },
      {
        title: "实付金额",
        dataIndex: "user_pay"
      }
    ];
    /* 表体 */
    let dataSource = this.state.item_list.map((item, index) => {
      item.key = index;
      return item;
    });
    /* rowSelect */
    // const rowSelection = {
    //   /* 定义为单选 */
    //   type: "radio",
    //   /* 根据选中行的键值来选中行：参数是该行的键值 */
    //   selectedRowKeys: this.state.selectedRowKeys
    // };
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} handleFilter={this.handleFilter} />
        </Card>
        <Card>
          <Button
            type="primary"
            style={{ marginRight: "20px" }}
            onClick={() => {
              this.openOrderDetail();
            }}
          >
            订单详情
          </Button>
          <Button
            type="primary"
            onClick={() => {
              this.handleConfirm();
            }}
          >
            结束订单
          </Button>
        </Card>
        <Card>
          <ETable
            columns={columns}
            dataSource={dataSource}
            rowSelection="checkbox"
            getSelectItem={this.getSelectItem}
          />
          {/* <Table
            columns={columns}
            dataSource={dataSource}
            // 定义为可选择
            rowSelection={rowSelection}
            // 设置行属性
            // record：每行上的所有数据，也就是每行上的dataSource
            // index：每行上的索引，从0开始
            onRow={(record, index) => {
              return {
                // 点击行
                onClick: () => {
                  this.onRowClick(record, index);
                }
              };
            }}
          ></Table> */}
        </Card>
        <Modal
          title="结束订单"
          visible={this.state.orderConfirmVisible}
          onCancel={() => {
            this.setState({
              orderConfirmVisible: false
            });
          }}
          onOk={() => {
            this.handleFinishOrder();
          }}
        >
          <Form>
            <Form.Item label="车辆编号">
              {this.state.orderInfo.bike_sn}
            </Form.Item>
            <Form.Item label="剩余电量">
              {this.state.orderInfo.battery + "%"}
            </Form.Item>
            <Form.Item label="行程开始时间">
              {this.state.orderInfo.start_time}
            </Form.Item>
            <Form.Item label="当前位置">
              {this.state.orderInfo.location}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

/* 封装之后废弃 */

// class FilterForm extends Component {
//   handleClick = () => {
//     console.log(this.refs.form);
//   };
//   render() {
//     return (
//       /* layout="inline" :内联表单 */
//       <Form layout="inline" name="form" ref="form">
//         <Form.Item name="" label="城市">
//           <Select placeholder="全部" style={{ width: "120px" }}>
//             <Select.Option value="">全部</Select.Option>
//             <Select.Option value="bj">北京</Select.Option>
//             <Select.Option value="hz">杭州</Select.Option>
//             <Select.Option value="sh">上海</Select.Option>
//           </Select>
//         </Form.Item>
//         {/*如果Form.Item定义了 name那么必须有值，没有报错 */}
//         <Form.Item name="start_time" label="订单时间">
//           {/* format：设置时间格式 */}
//           <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
//         </Form.Item>

//         <Form.Item name="end_time">
//           <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
//         </Form.Item>
//         <Form.Item name="order_status" label="订单状态">
//           <Select name="" placeholder="全部" style={{ width: "140px" }}>
//             <Select.Option value="">全部</Select.Option>
//             <Select.Option value="1">进行中</Select.Option>
//             <Select.Option value="2">进行中(临时锁车)</Select.Option>
//             <Select.Option value="3">结束行程</Select.Option>
//           </Select>
//         </Form.Item>
//         <Form.Item>
//           <Button
//             type="primary"
//             style={{ margin: "0px 20px" }}
//             htmlType="submit"
//             onClick={() => {
//               this.handleClick();
//             }}
//           >
//             查询
//           </Button>
//           <Button>重置</Button>
//         </Form.Item>
//       </Form>
//     );
//   }
// }
