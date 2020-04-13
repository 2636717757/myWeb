import React, { Component } from 'react';
import { Card, Button, Modal, Form, Input, Radio, DatePicker, Select, message } from 'antd';
import ETable from './../../components/ETable/index';
import BaseForm from './../../components/BaseForm/index';
import './../../mock/user/user_list';
import axios from 'axios';
import moment from 'moment';
export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      /* Modal弹窗的显示与隐藏 */
      isVisible: false,
      title: '',
      selectItem: [],
      dataSource: [],
    };
  }
  getSelectItem = selectItem => {
    this.setState({
      selectItem,
    });
  };
  formList = [
    {
      type: 'INPUT',
      label: '用户名',
      field: 'user_name',
      placeholder: '请输入用户名',
      width: 100,
    },
    {
      type: 'INPUT',
      label: '手机号',
      field: 'user_mobile',
      placeholder: '请输入手机号',
      width: 100,
    },
    {
      type: 'DATEPICKER',
      label: '请选择入职日期',
      field: 'user_data',
      placeholder: '请选择日期',
    },
  ];
  componentDidMount() {
    this.request();
  }
  handleFilter = () => {
    this.request();
  };
  request = () => {
    axios.get('user_list.php').then(res => {
      this.setState({
        dataSource: res.data.result.list,
      });
    });
  };
  /* 点击创建员工的回调 */
  handleOperate = type => {
    if (type === 'create') {
      this.setState({
        type,
        isVisible: true,
        title: '创建员工',
      });
    } else if (type === 'edit') {
      if (!this.state.selectItem.id) {
        Modal.info({
          title: '提示',
          content: '请选择一个一个用户',
        });
      } else {
        this.setState({
          type,
          isVisible: true,
          title: '编辑员工',
        });
      }
    } else if (type === 'detail') {
      if (!this.state.selectItem.id) {
        Modal.info({
          title: '提示',
          content: '请选择一个一个用户',
        });
      } else {
        this.setState({
          type,
          isVisible: true,
          title: '员工详情',
        });
      }
    } else {
      if (!this.state.selectItem.id) {
        Modal.info({
          title: '提示',
          content: '请选择一个一个用户',
        });
      } else {
        Modal.confirm({
          title: '确认删除',
          content: '是否删除',
          onOk: () => {
            /* axios请求删除成功的接口 */
            message.success('删除成功');
          },
        });
      }
    }
  };
  /* 点击Ok回调 */
  handleSubmit = () => {
    // 请求接口传递数据
    //和城市管理那个相同
  };
  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '女' : '男';
        },
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          return {
            1: '走路中',
            2: '吃饭中',
            3: '打游戏',
            4: '滑板鞋',
            5: '发呆中',
          }[state];
        },
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(interest) {
          return {
            1: '打篮球',
            2: '踢足球',
            3: '滑板鞋',
            4: '打游戏',
            5: '溜溜球',
            6: '飞天',
            7: '学习',
            8: '乒乓球',
          }[interest];
        },
      },
      {
        title: '生日',
        dataIndex: 'birthday',
      },
      {
        title: '联系地址',
        dataIndex: 'address',
      },
      {
        title: '早起时间',
        dataIndex: 'time',
      },
    ];

    let dataSource = this.state.dataSource;

    dataSource = dataSource.map((item, index) => {
      item.key = index;
      return item;
    });

    let footer = {};
    if (this.state.type === 'detail') {
      footer = {
        footer: null,
      };
    }
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} handleFilter={this.handleFilter} />
        </Card>
        <Card>
          <Button
            type="primary"
            style={{ marginRight: '10px' }}
            onClick={() => {
              this.handleOperate('create');
            }}
          >
            创建员工
          </Button>
          <Button
            type="primary"
            style={{ marginRight: '10px' }}
            onClick={() => {
              this.handleOperate('edit');
            }}
          >
            编辑员工
          </Button>
          <Button
            type="primary"
            style={{ marginRight: '10px' }}
            onClick={() => {
              this.handleOperate('detail');
            }}
          >
            员工详情
          </Button>
          <Button
            type="primary"
            style={{ marginRight: '10px' }}
            onClick={() => {
              this.handleOperate('delete');
            }}
          >
            删除员工
          </Button>
        </Card>
        <Modal
          title={this.state.title}
          visible={this.state.isVisible}
          /* 控制Ok消失 */
          {...footer}
          onOk={() => {
            this.handleSubmit();
          }}
          onCancel={() => {
            /* 重置表单 */
            this.refs.user_form.refs.form.resetFields();
            this.setState({
              isVisible: false,
            });
          }}
        >
          {this.state.isVisible ? (
            <UserForm ref="user_form" type={this.state.type} selectItem={this.state.selectItem} />
          ) : (
            ''
          )}
        </Modal>
        <Card>
          <ETable
            columns={columns}
            dataSource={dataSource}
            rowSelection="radio"
            getSelectItem={this.getSelectItem}
          />
        </Card>
      </div>
    );
  }
}
class UserForm extends Component {
  /* 判断state的值 */
  getState = state => {
    return {
      1: '走路中',
      2: '吃饭中',
      3: '打游戏',
      4: '滑板鞋',
      5: '发呆中',
    }[state];
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    };
    let initialValues = {};
    let { selectItem, type } = this.props;
    if (type === 'edit') {
      initialValues = {
        user_name: selectItem.username,
        sex: selectItem.sex,
        state: this.getState(selectItem.state),
        birthday: moment(selectItem.birthday),
        address: selectItem.address,
      };
    } else {
      initialValues = {};
    }
    return (
      <Form ref="form" layout="horizontal" initialValues={initialValues}>
        <Form.Item name="user_name" label="用户名" {...formItemLayout}>
          {type === 'detail' ? (
            selectItem.username
          ) : (
            <Input type="text" placeholder="请输入用户名" />
          )}
        </Form.Item>
        <Form.Item name="sex" label="性别" {...formItemLayout}>
          {type === 'detail' ? (
            selectItem.sex === 1 ? (
              '女'
            ) : (
              '男'
            )
          ) : (
            <Radio.Group>
              <Radio value={1}>女</Radio>
              <Radio value={2}>男</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item name="state" label="状态" {...formItemLayout}>
          {type === 'detail' ? (
            this.getState(selectItem.state)
          ) : (
            <Select>
              <Select.Option vlaue={1} key="0">
                咸鱼一条
              </Select.Option>
              <Select.Option vlaue={2} key="1">
                风华浪子
              </Select.Option>
              <Select.Option vlaue={3} key="2">
                北大才子一枚
              </Select.Option>
              <Select.Option vlaue={4} key="3">
                百度FE
              </Select.Option>
              <Select.Option vlaue={5} key="4">
                创业者
              </Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item name="birthday" label="生日" {...formItemLayout}>
          {type === 'detail' ? selectItem.birthday : <DatePicker />}
        </Form.Item>
        <Form.Item name="address" label="联系地址" {...formItemLayout}>
          {type === 'detail' ? (
            selectItem.address
          ) : (
            <Input.TextArea rows={3} placeholder="联系地址" />
          )}
        </Form.Item>
      </Form>
    );
  }
}
