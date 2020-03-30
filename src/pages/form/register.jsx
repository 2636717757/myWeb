import React, { Component } from "react";
import "./less/form.less";
import {
  Card,
  Form,
  Button,
  Input,
  Checkbox,
  Radio,
  Select,
  Switch,
  DatePicker,
  TimePicker,
  Upload,
  InputNumber
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
export default class FormRegister extends Component {
  /* face */
  state = {
    /* 是否显示loading */
    loading: false,
    /* 显示的内容(icon) */
    imageUrl: ""
  };
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  /* 控制文件的格式 */
  /* beforeUpload(file) {} */

  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };
  /* face */
  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    const { imageUrl } = this.state;
    /* 所有框 */
    const formItemLayout = {
      /* label占比例 */
      labelCol: {
        //xs	<576px
        xs: 24,
        //sm	≥576px
        sm: 4
      },
      /* 文本框占比例 */
      wrapperCol: {
        xs: 24,
        /* 
        sm:{
            span:12
        }
        的省略
        */
        sm: 12
      }
    };
    /* 所有框 */
    /* 最下面的复选框 */
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          /* 偏移 */
          offset: 4
        }
      }
    };
    /* 最下面的复选框 */
    return (
      <div>
        <Card title="注册表单">
          {/* 各种name属性的初始值 */}
          <Form
            /*  form={getFieldsValue => {
              console.log(getFieldsValue);
            }} */
            initialValues={
              ({ age: 18 },
              { state: "hz" },
              { like: ["5", "6", "7"] },
              { isMarried: true },
              { birthday: moment("2000-01-01") })
            }
          >
            <Form.Item
              {...formItemLayout}
              label="用户名"
              /* initialValues={{ remember: true }} */
              name="userName"
              validateTrigger="onChange"
              rules={[
                { required: true, message: "用户名不能为空" },
                { min: 5, message: "长度不能小于5" },
                { max: 10, message: "长度不能大于10" }
              ]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="密码"
              name="pwd"
              validateTrigger="onChange"
              rules={[
                { required: true, message: "密码不能为空" },
                { min: 5, message: "长度不能小于5" },
                { max: 10, message: "长度不能大于10" }
              ]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>

            <Form.Item name="sex" label="性别" {...formItemLayout}>
              <Radio.Group>
                <Radio value="0">男</Radio>
                <Radio value="1">女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="age" label="年龄" {...formItemLayout}>
              <InputNumber />
            </Form.Item>
            <Form.Item name="state" label="当前状态" {...formItemLayout}>
              <Select>
                <Select.Option value="bj">北京</Select.Option>
                <Select.Option value="hz">杭州</Select.Option>
                <Select.Option value="sh">上海</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="like" label="爱好" {...formItemLayout}>
              <Select mode="multiple">
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
                <Select.Option value="6">6</Select.Option>
                <Select.Option value="7">7</Select.Option>
                <Select.Option value="8">8</Select.Option>
                <Select.Option value="9">9</Select.Option>
              </Select>
            </Form.Item>
            {/* 默认选中的两个条件：
            1：Form.Item元素的属性valuePropName="checked"
            2：定义初始值为true(在Form元素上用name定义)
            */}
            <Form.Item
              name="isMarried"
              valuePropName="checked"
              label="是否已婚"
              {...formItemLayout}
            >
              <Switch />
            </Form.Item>
            <Form.Item name="birthday" label="生日" {...formItemLayout}>
              <DatePicker placeholder="请选择日期" />
            </Form.Item>
            <Form.Item name="address" label="联系地址" {...formItemLayout}>
              <Input.TextArea
                placeholder="写你的地址"
                autoSize={{
                  /* 最小行 */
                  /* 高几行 */
                  minRows: 1,
                  /* 最大行 */
                  /* 宽几行 */
                  maxRows: 6
                }}
              />
            </Form.Item>
            <Form.Item name="time" label="早起时间" {...formItemLayout}>
              <TimePicker />
            </Form.Item>
            <Form.Item
              name="face"
              label="头像"
              {...formItemLayout}
              valuePropName="fileList"
            >
              <Upload
                //  上传后的回调
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
            <Form.Item
              name="remember"
              {...offsetLayout}
              /* 没有下面的就给警告 */
              valuePropName="checked"
            >
              <Checkbox>
                我已经阅读过<a href="/">协议</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...offsetLayout}>
              <Button type="primary">注册</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
