import React, { Component } from "react";
import { Table } from "antd";
export default class Etable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      selectItem: [],
      selectItemID: []
    };
  }
  onRowClick = (record, index) => {
    let rowSelection = this.props.rowSelection;
    if (rowSelection === "checkbox") {
      let { selectedRowKeys, selectItem, selectItemID } = this.state;
      let i = selectItemID.indexOf(record.id);

      if (i === -1) {
        selectedRowKeys.push(index);
        selectItem.push(record);
        selectItemID.push(record.id);
      } else {
        selectedRowKeys.splice(i, 1);
        selectItem.splice(i, 1);
        selectItemID.splice(i, 1);
      }
      // console.log(selectedRowKeys);

      this.setState({
        selectedRowKeys,
        selectItem,
        selectItemID
      });
      this.props.getSelectItem(this.state.selectItem);
    } else {
      this.setState({
        selectedRowKeys: [index],
        selectItem: record
      });
      // console.log(record);
      this.props.getSelectItem(record);
    }
  };

  tableInit = () => {
    let row_selection = this.props.rowSelection;
    // const rowSelection = {
    //   /* 定义为单选 */
    //   type: "",
    //   /* 根据选中行的键值来选中行：参数是该行的键值 */
    //   selectedRowKeys: this.state.selectedRowKeys
    // };

    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, record) => {
        console.log("selectedRowKeys changed: ", selectedRowKeys);
        console.log(record);
        this.setState({ selectedRowKeys });
      }
    };
    if (!row_selection) {
      row_selection = false;
    } else if (row_selection === "checkbox") {
      rowSelection.type = "checkbox";
    } else if (row_selection === "radio") {
      rowSelection.type = "radio";
    }
    return (
      <Table
        bordered
        {...this.props}
        rowSelection={row_selection ? rowSelection : null}
        onRow={
          row_selection
            ? (record, index) => {
                return {
                  // 点击行
                  onClick: () => {
                    this.onRowClick(record, index);
                  }
                };
              }
            : null
        }
      ></Table>
    );
  };
  render() {
    return <div>{this.tableInit()}</div>;
  }
}
