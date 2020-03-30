import React, { Component } from "react";
import "./less/loading.less";
export default class Loading extends Component {
  render() {
    return (
      <div
        className="ajax-loading"
        id="ajaxLoading"
        style={{ displty: "none" }}
      >
        <div className="overlay"></div>
        <div className="loading">
          <img
            src="https://media.number-7.cn/ebike-h5/static/images/common/loading.gif"
            alt=""
          />
          <span>加载中，请稍后...</span>
        </div>
      </div>
    );
  }
}
