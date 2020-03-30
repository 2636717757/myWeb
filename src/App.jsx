import React, { Component } from "react";

export default class App extends Component {
  render() {
    return (
      <div>
        {/* 直接渲染所有包裹的组件 */}
        {this.props.children}
      </div>
    );
  }
}
