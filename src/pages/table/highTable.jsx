import React, { Component } from "react";
import { Card, Table } from "antd";
export default class HighTable extends Component {
  render() {
    const columns = [
      {
        title: "Full Name",
        width: 100,
        dataIndex: "name",
        key: "name",
        fixed: "left"
      },
      {
        title: "Age",
        width: 100,
        dataIndex: "age",
        key: "age",
        fixed: "left"
      },
      {
        title: "Column 1",
        dataIndex: "address",
        key: "1",
        /* 定义这个表头的宽度 */
        width: 150
      },
      {
        title: "Column 2",
        dataIndex: "address",
        key: "2",
        width: 150
      },
      {
        title: "Column 3",
        dataIndex: "address",
        key: "3",
        width: 150
      },
      {
        title: "Column 4",
        dataIndex: "address",
        key: "4",
        width: 150
      },
      {
        title: "Column 5",
        dataIndex: "address",
        key: "5",
        width: 150
      },
      {
        title: "Column 6",
        dataIndex: "address",
        key: "6",

        width: 150
      },
      {
        title: "Column 7",
        dataIndex: "address",
        key: "7",
        width: 150
      },
      { title: "Column 8", dataIndex: "address", key: "8" },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 100,
        render: () => <a href="/">action</a>
      }
    ];

    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`
      });
    }
    return (
      <div>
        <Card title="固定表头和列">
          <Table
            columns={columns}
            dataSource={data}
            /* x:定义表格的总长
               y:定义表格的总宽
            来实现固定
            */
            scroll={{ x: 1500, y: 300 }}
          />
        </Card>
      </div>
    );
  }
}
