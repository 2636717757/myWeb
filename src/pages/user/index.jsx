import React, { Component } from "react";
import { Card, Button } from "antd";
import ETable from "./../../components/ETable/index";
import BaseForm from "./../../components/BaseForm/index";
import "./../../mock/user/user_list";
import axios from "axios";
export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: []
    };
  }
  getSelectItem = () => {};
  formList = [
    {
      type: "INPUT",
      label: "用户名",
      field: "user_name",
      placeholder: "请输入用户名",
      width: 100
    },
    {
      type: "INPUT",
      label: "手机号",
      field: "user_mobile",
      placeholder: "请输入手机号",
      width: 100
    },
    {
      type: "DATEPICKER",
      label: "请选择入职日期",
      field: "user_data",
      placeholder: "请选择日期"
    }
  ];
  componentDidMount() {
    this.request();
  }
  handleFilter = () => {
    this.request();
  };
  request = () => {
    axios.get("user_list.php").then(res => {
      this.setState({
        dataSource: res.data.result.list
      });
    });
  };

  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "id"
      },
      {
        title: "用户名",
        dataIndex: "username"
      },
      {
        title: "性别",
        dataIndex: "sex",
        render(sex) {
          return sex === 1 ? "女" : "男";
        }
      },
      {
        title: "状态",
        dataIndex: "state",
        render(state) {
          return {
            1: "走路中",
            2: "吃饭中",
            3: "打游戏",
            4: "滑板鞋",
            5: "发呆中"
          }[state];
        }
      },
      {
        title: "爱好",
        dataIndex: "interest",
        render(interest) {
          return {
            1: "打篮球",
            2: "踢足球",
            3: "滑板鞋",
            4: "打游戏",
            5: "溜溜球",
            6: "飞天",
            7: "学习",
            8: "乒乓球"
          }[interest];
        }
      },
      {
        title: "生日",
        dataIndex: "birthday"
      },
      {
        title: "联系地址",
        dataIndex: "address"
      },
      {
        title: "早起时间",
        dataIndex: "time"
      }
    ];
    let dataSource = this.state.dataSource;
    dataSource = dataSource.map((item, index) => {
      item.key = index;
      return item;
    });
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} handleFilter={this.handleFilter} />
        </Card>
        <Card>
          <ETable
            columns={columns}
            dataSource={dataSource}
            rowSelection="checkbox"
            getSelectItem={this.getSelectItem}
          />
        </Card>
      </div>
    );
  }
}
