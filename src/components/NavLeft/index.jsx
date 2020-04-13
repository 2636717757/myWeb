import React, { Component } from 'react';
import MenuConfig from './../../config/menuConfig';
import Logo from './../../assets/logo-ant.svg';
import './index.less';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { change_mianbaoxie } from './../../redux/actions';

const { SubMenu } = Menu;

class NavLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuTreeNode: [],
    };
  }
  componentDidMount() {
    let menuTreeNode = this.renderMenu(MenuConfig);
    this.setState({
      menuTreeNode,
    });
  }
  handleClick = item => {
    // console.log('item哈哈哈哈哈', item.item.props.children.props.children);
    this.props.change_mianbaoxie(item.item.props.children.props.children);
  };
  renderMenu = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu key={item.key} title={item.title}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key} onClick={this.handleClick}>
          <Link to={item.key}>{item.title}</Link>
        </Menu.Item>
      );
    });
  };
  render() {
    let { menuTreeNode } = this.state;
    return (
      <div className="nav-left">
        <div className="logo">
          <img src={Logo} alt="" />
          <h1>Imooc MS</h1>
        </div>
        <Menu theme="dark">{menuTreeNode}</Menu>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop,
  };
};
export default connect(mapStateToProps, { change_mianbaoxie })(NavLeft);
