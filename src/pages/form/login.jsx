import React, { Component } from "react";
import { Card, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
export default class FormLogin extends Component {
  render() {
    return (
      <div>
        <Card title="登录行内表单" style={{ marginBottom: "20px" }}>
          <Form layout="inline">
            <Form.Item>
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item>
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary">登录</Button>
            </Form.Item>
          </Form>
        </Card>
        <Card title="登录水平表单">
          <Form style={{ width: "300px" }} initialValues={{ remember: true }}>
            <Form.Item
              name="userName"
              validateTrigger="onChange"
              rules={[
                { required: true, message: "用户名不能为空" },
                { min: 5, message: "长度不能小于5" },
                { max: 10, message: "长度不能大于10" }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              validateTrigger="onChange"
              rules={[
                { required: true, message: "密码不能为空" },
                { min: 5, message: "长度不能小于5" },
                { max: 10, message: "长度不能大于10" }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox /* defaultChecked={true} */>
                记住密码
                <a href="/" style={{ float: "right", marginLeft: "150px" }}>
                  忘记密码
                </a>
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <div></div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
