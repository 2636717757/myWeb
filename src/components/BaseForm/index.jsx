import React, { Component } from "react";
import { Form, Input, Select, Button, Checkbox, Radio, DatePicker } from "antd";
export default class FilterForm extends Component {
  /* 点击查询调用 */
  handleFilterSubmit = () => {
    // console.log(this.refs.form.getFieldValue());
    this.props.handleFilter(this.refs.form.getFieldValue());
  };
  /* 点击重置的回调 */
  reset = () => {};
  /* 回去Form.Item信息 */
  initFormList = () => {
    const formList = this.props.formList;
    const formItemList = [];
    if (formList && formList.length > 0) {
      formList.forEach((item, index) => {
        let label = item.label;
        let field = item.field;
        let initialValue = item.initialValue || "";
        let placeholder = item.placeholder;
        let width = item.width;
        let list = item.list;
        if (item.type === "时间查询") {
          const begin_time = (
            <Form.Item name="begin-time" label="订单时间" key="0">
              <DatePicker
                /* 是否显示 */
                showTime={true}
                placeholder={placeholder}
                /* 时间格式 */
                format="YYYY-MM-DD HH:mm:ss"
              />
            </Form.Item>
          );
          formItemList.push(begin_time);
          const end_time = (
            <Form.Item
              name="end_time"
              label="~"
              /* 去除冒号 */
              colon={false}
              key="1"
            >
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
          );
          formItemList.push(end_time);
        } else if (item.type === "INPUT") {
          const INPUT = (
            <Form.Item name={field} label={label} key={field}>
              <Input type="text" placeholder={placeholder} />
            </Form.Item>
          );
          formItemList.push(INPUT);
        } else if (item.type === "SELECT") {
          const SELECT = (
            <Form.Item name={field} label={label} key={field}>
              <Select
                name=""
                placeholder={placeholder}
                style={{ width: width }}
              >
                {list.map((item, index) => {
                  return (
                    <Select.Option value={item.id} key={item.id}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          );
          formItemList.push(SELECT);
        } else if (item.type === "CHECKBOX") {
          const CHECKBOX = (
            <Form.Item
              name={field}
              label={label}
              key={field}
              valuePropName="checked"
            >
              <Checkbox></Checkbox>
            </Form.Item>
          );
          formItemList.push(CHECKBOX);
        } else if (item.type === "DATEPICKER") {
          const DATEPICKER = (
            <Form.Item name={field} label={label} key="0">
              <DatePicker
                /* 是否显示 */

                showTime={true}
                placeholder={placeholder}
                /* 时间格式 */
                format="YYYY-MM-DD HH:mm:ss"
              />
            </Form.Item>
          );
          formItemList.push(DATEPICKER);
        } else if (item.type === "城市") {
          const city = (
            <Form.Item name="city" label="城市" key="2">
              <Select
                name=""
                placeholder={placeholder}
                style={{ width: width }}
              >
                {list.map((item, index) => {
                  return (
                    <Select.Option value={item.id} key={item.id}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          );
          formItemList.push(city);
        }
      });
    }
    return formItemList;
  };
  render() {
    return (
      <Form ref="form" layout="inline" name="form">
        {this.initFormList()}
        <Button
          type="primary"
          style={{ margin: "0px 20px" }}
          htmlType="submit"
          onClick={() => {
            this.handleFilterSubmit();
          }}
        >
          查询
        </Button>
        <Button
          onClick={() => {
            this.reset();
          }}
        >
          重置
        </Button>
      </Form>
    );
  }
}
