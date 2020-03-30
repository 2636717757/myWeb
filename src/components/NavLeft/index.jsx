import React, { Component } from "react";
import MenuConfig from "./../../config/menuConfig";
import Logo from "./../../assets/logo-ant.svg";
import "./index.less";
import { Menu } from "antd";
import { Link } from "react-router-dom";
const { SubMenu } = Menu;

export default class NavLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuTreeNode: []
    };
  }
  componentDidMount() {
    let menuTreeNode = this.renderMenu(MenuConfig);
    this.setState({
      menuTreeNode
    });
  }
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
        <Menu.Item key={item.key}>
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
