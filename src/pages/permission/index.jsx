import React, { Component } from 'react';
import { Card, Button, Modal, Form, Select, Input, message, Tree, Transfer } from 'antd';
import ETable from './../../components/ETable/index';
import axios from 'axios';
import './../../mock/permission/lole_list';
import './../../mock/permission/user_list';
import Utils from './../../utils/utils';
import treeData from './../../config/treeData';
export default class Permission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      selectItem: [],
      isVisible: false,
      /* 设置权限的Modal */
      isPermVisible: false,
      /* 设置权限的角色信息 */
      detailInfo: [],
      menuInfo: [],
      /* 用户授权的Modal */
      isUserVisible: false,
      mokeData: [],
      targetKeys: [],
    };
  }
  componentDidMount() {
    this.request();
  }
  /* 请求表格数据 */
  request = () => {
    axios.get('lole_list.php').then(res => {
      this.setState({
        list: res.data.result.item_list,
      });
    });
  };
  getSelectItem = selectItem => {
    this.setState({
      selectItem,
    });
  };
  /* 创建角色的ok */
  handleSubmit = () => {
    this.setState({
      isVisible: false,
    });
    message.success('创建成功');
    this.refs.role_form.refs.form.resetFields();
    this.request();
  };
  /* 点击设置权限 */
  handlePermission = () => {
    let item = this.state.selectItem;
    if (!item) {
      Modal.info({
        title: '请选择一个角色',
      });
      return;
    }
    this.setState({
      isPermVisible: true,
      detailInfo: item,
      menuInfo: item.menus,
    });
  };
  /* 设置权限的ok */
  handlePermEditSubmit = () => {
    //请求接口，传递Modal中表单里的值和那个树形结构的值
    /* 
    data = 表单对象返回的值组成的对象
    //添加一个id属性，让后台进行判断
    data.role_id = this.state.selectedItem.id;
    //给树形结构的值也添加上
    data.menus = this.state.menuInfo;
    //然后请求接口的时候放上去
    */
  };
  /* 点击用户授权 */
  handleUserAuth = () => {
    let item = this.state.selectItem;
    if (!item) {
      Modal.info({
        title: '请选择一个角色',
      });
      return;
    }
    this.setState({
      isUserVisible: true,
      detailInfo: item,
    });
    this.getRoleUserList();
  };
  /* 点击用户授权后的请求数据 */
  getRoleUserList = id => {
    axios.get('permission_user_list.php').then(res => {
      this.getAuthUserList(res.data.result);
    });
  };
  /* 筛选目标用户 */
  getAuthUserList = dataSource => {
    const mokeData = [];
    const targetKeys = [];
    if (dataSource && dataSource.length > 0) {
      for (let i = 0; i < dataSource.length; i++) {
        const data = {
          key: dataSource[i].user_id,
          title: dataSource[i].user_name,
          status: dataSource[i].status,
        };
        if (data.status === 1) {
          targetKeys.push(data.key);
        }
        mokeData.push(data);
      }
      this.setState({
        mokeData,
        targetKeys,
      });
    }
  };
  /* 用户授权的ok */
  handleUserSubmit = () => {
    let data = {};
    data.user_ids = this.state.targetKeys;
    data.role_id = this.selectItem.id;
    /* 之后传给后台 */
  };
  render() {
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'id',
      },
      {
        title: '角色名称',
        dataIndex: 'role_name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: authorize_time => {
          return Utils.formateDate(authorize_time);
        },
      },
      {
        title: '使用状态',
        dataIndex: 'status',
        render: status => {
          return status === 1 ? '启用' : '停用';
        },
      },
      {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render: authorize_time => {
          return Utils.formateDate(authorize_time);
        },
      },
      {
        title: '授权人',
        dataIndex: 'authorize_user_name',
      },
    ];
    const dataSource = this.state.list.map((item, index) => {
      item.key = index;
      return item;
    });
    return (
      <div>
        <Card>
          <Button
            type="primary"
            style={{ marginRight: '20px' }}
            onClick={() => {
              this.setState({
                isVisible: true,
              });
            }}
          >
            创建角色
          </Button>
          <Button type="primary" style={{ marginRight: '20px' }} onClick={this.handlePermission}>
            设置权限
          </Button>
          <Button type="primary" onClick={this.handleUserAuth}>
            用户授权
          </Button>
        </Card>
        <div className="content-wrap">
          <ETable
            columns={columns}
            dataSource={dataSource}
            rowSelection="radio"
            getSelectItem={this.getSelectItem}
          />
        </div>
        <Modal
          visible={this.state.isVisible}
          onOk={() => {
            this.handleSubmit();
          }}
          onCancel={() => {
            /* 重置表单 */
            this.refs.role_form.refs.form.resetFields();
            this.setState({
              isVisible: false,
            });
          }}
        >
          <RoleForm ref="role_form" selectItem={this.state.selectItem} />
        </Modal>
        <Modal
          title="设置权限"
          visible={this.state.isPermVisible}
          width={600}
          onOk={() => {
            this.handlePermEditSubmit();
          }}
          onCancel={() => {
            /* 重置表单 */
            /*  this.refs.role_form.refs.form.resetFields(); */
            this.setState({
              isPermVisible: false,
            });
          }}
        >
          <PermEditForm
            detailInfo={this.state.detailInfo}
            pathMenuInfo={checkddKes => {
              this.setState({
                menuInfo: checkddKes,
              });
            }}
            menuInfo={this.state.menuInfo}
          />
        </Modal>
        <Modal
          title="用户授权"
          visible={this.state.isUserVisible}
          width={800}
          onOk={() => {
            this.handleUserSubmit();
          }}
          onCancel={() => {
            /* 重置表单 */
            /*  this.refs.role_form.refs.form.resetFields(); */
            this.setState({
              isUserVisible: false,
            });
          }}
        >
          <RoleAuthForm
            detailInfo={this.state.detailInfo}
            targetKeys={this.state.targetKeys}
            mokeData={this.state.mokeData}
            patchUserInfo={targetKeys => {
              this.setState({
                targetKeys,
              });
            }}
          />
        </Modal>
      </div>
    );
  }
}
class RoleForm extends Component {
  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    };

    return (
      <Form ref="form" layout="horizontal">
        <Form.Item name="role_name" label="用户名" {...formItemLayout}>
          <Input type="text" placeholder="请输入角色名称" />
        </Form.Item>

        <Form.Item name="state" label="状态" {...formItemLayout}>
          <Select>
            <Select.Option vlaue={1} key="0">
              开启
            </Select.Option>
            <Select.Option vlaue={2} key="1">
              关闭
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    );
  }
}
class PermEditForm extends Component {
  onCheck = checkddKes => {
    // console.log(checkddKes);
    /* 调用父组件方法 */
    this.props.pathMenuInfo(checkddKes);
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    };
    let { detailInfo, menuInfo } = this.props;
    // console.log(menuInfo);
    // alert(detailInfo.role_name);

    return (
      <Form layout="horizontal" initialValues={{ status: '1' }}>
        <Form.Item label="角色名称" {...formItemLayout}>
          <Input disabled placeholder={detailInfo.role_name} />
        </Form.Item>
        <Form.Item name="status" label="状态" {...formItemLayout}>
          <Select>
            <Select.Option value="1">启用</Select.Option>
            <Select.Option value="0">停用</Select.Option>
          </Select>
        </Form.Item>
        <Tree
          checkable
          defaultExpandAll
          treeData={treeData}
          onCheck={checkddKes => {
            console.log('调用了');
            this.onCheck(checkddKes);
          }}
          //默认选中
          checkedKeys={menuInfo}
        ></Tree>
      </Form>
    );
  }
}
class RoleAuthForm extends Component {
  filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;
  handleChange = targetKeys => {
    this.props.patchUserInfo(targetKeys);
  };
  handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    };
    let { detailInfo, targetKeys, mokeData } = this.props;
    // console.log(menuInfo);
    // alert(detailInfo.role_name);

    return (
      <Form layout="horizontal">
        <Form.Item label="角色名称" {...formItemLayout}>
          <Input disabled placeholder={detailInfo.role_name} />
        </Form.Item>

        <Form.Item label="选择用户" {...formItemLayout}>
          <Transfer
            dataSource={mokeData}
            titles={['待选用户', '已选用户']}
            showSearch
            filterOption={this.filterOption}
            targetKeys={targetKeys}
            render={item => item.title}
            locale={{ searchPlaceholder: '输入用户名' }}
            listStyle={{ width: '200px', height: '400px' }}
            onChange={this.handleChange}
            onSearch={this.handleSearch}
          ></Transfer>
        </Form.Item>
      </Form>
    );
  }
}
