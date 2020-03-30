import React, { Component } from "react";
import { Card, Table, Modal } from "antd";
import axios from "axios";
import Loading from "./../loading/loading";
import "./less/table.less";
export default class BasicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      /* 定义请求过来的数据 */
      dataSource2: [],
      loading: false,
      selectedRowKeys: [],
      /* 定义表格每一行数据的初始值，可根据其中的数据进行更新，删除等操作
      ，，，如果是多选，那么是多条以选中的数据
      */
      selectItem: [],
      /* 多选的数据 */
      selectedRows: null
    };
  }
  componentDidMount() {
    /* 一般是请求过来的数据 */
    let data = [];
    for (let i = 0; i <= 30; i++) {
      data.push({
        key: i,
        name: "胡彦斌",
        age: i + 5,
        sex: "男",
        address: "西湖区湖底公园1号"
      });
    }
    const dataSource = data;
    this.setState({
      dataSource
    });
    /* 异步请求 */
    /* 如果删除表格数据那么重新调用一下(让页面重新刷新，好看) */
    /* 删除需要删除后台数据 */
    this.request();
  }
  request = () => {
    this.setState({
      loading: true
    });
    let baseUrl = "https://easy-mock.com/mock/5e708896d5385d6ebfa18d2e/mockapi";
    axios
      .get(baseUrl + "/table/list")
      .then(res => {
        this.setState({
          dataSource2: res.data.result,
          loading: false,
          /* 给他俩初始值，让选中消失 */
          selectedRowKeys: [],
          selectedRows: null
        });
      })
      .catch(e => {
        Modal.error({
          content: "链接超时！"
        });
        this.setState({
          loading: false
        });
        console.log("那个easy-mock网炸了", e);
      });
  };
  /* 点击行 */
  /* recod:当前一行的数据;
    index:点击那一行的索引
*/
  onRowChick = (record, index) => {
    /* 动态获取传过来的key值 */

    let selectKey = [index];
    // console.log(record);
    this.setState({
      /* 点击哪行让框选中 */
      selectedRowKeys: selectKey,
      selectItem: record
    });
  };
  render() {
    // console.log(this.state.dataSource2);
    const columns = [
      /* 表头 */
      {
        title: "姓名",
        dataIndex: "name",

        key: "name"
      },
      {
        title: "年龄",
        dataIndex: "age",
        /*  */
        render(age) {
          return age > 25 ? "年龄大与25" : age;
        },
        key: "age"
      },
      {
        title: "性别",
        dataIndex: "sex"
      },
      {
        title: "住址",
        dataIndex: "address",
        key: "address"
      }
    ];

    const showLoading = () => {
      if (this.state.loading) {
        return <Loading />;
      }
    };
    /*  */
    let selectedRowKeys = this.state.selectedRowKeys;
    /* 单选 */
    const rowSelection = {
      type: "radio",
      selectedRowKeys,
      onChange: selectedRowKeys => {
        this.setState({
          selectedRowKeys
        });
      }
    };
    /* 多选 */
    const rowCheckSelection = {
      type: "check",
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          /*  */
          selectedRows
        });
        /* 可获得 selectedRows中的key或者id值进行更新删除*/
        console.log(selectedRows);
      }
    };
    return (
      <div>
        {showLoading()}
        <Card title="基础表格+分页" className="card">
          <Table
            bordered
            columns={columns}
            rowSelection={rowSelection}
            dataSource={this.state.dataSource}
            /* 是否分页 */
            pagination={true}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowChick(record, index);
                } // 点击行
              };
            }}
          />
        </Card>

        <Card title="动态数据渲染表格" className="card">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            /* 是否分页 */
            pagination={false}
          />
        </Card>
        <Card title="Mock-单选" className="card">
          <Table
            bordered
            /* 是否可选，定义是单选还是多选，和其他 */
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.state.dataSource2}
            /* 是否分页 */
            pagination={false}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowChick(record, index);
                } // 点击行
              };
            }}
          />
        </Card>
        <Card title="Mock-多选" className="card">
          <Table
            bordered
            /* 是否可选，定义是单选还是多选，和其他 */
            rowSelection={rowCheckSelection}
            columns={columns}
            dataSource={this.state.dataSource2}
            /* 是否分页 */
            pagination={false}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowChick(record, index);
                } // 点击行
              };
            }}
          />
        </Card>
      </div>
    );
  }
}
