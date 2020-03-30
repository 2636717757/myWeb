import React, { Component } from "react";
import { Card, message, Tabs } from "antd";
import {
  SmileOutlined,
  TransactionOutlined,
  AliwangwangOutlined
} from "@ant-design/icons";
const { TabPane } = Tabs;

export default class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panes: [],
      activeKey: 0
    };
  }
  componentDidMount() {
    this.newTabIndex = 0;
    const panes = [
      { title: "Tab 1", content: "Content of Tab 1", key: "1" },
      { title: "Tab 2", content: "Content of Tab 2", key: "2" },
      {
        title: "Tab 3",
        content: "Content of Tab 3",
        key: "3",
        closable: false
      }
    ];
    this.setState({
      activeKey: panes[0].key,
      panes
    });
  }
  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };
  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({
      title: "New Tab",
      content: "Content of new Tab",
      key: activeKey
    });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };
  callback = key => {
    message.info("你选择了页签=" + key);
  };
  render() {
    return (
      <div>
        <Card title="Tab页签" className="card">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Tab 1" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Tab 2" key="2" disabled>
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图的页签" className="card">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane
              tab={
                <span>
                  <SmileOutlined />
                  Tab 1
                </span>
              }
              key="1"
            >
              Content of Tab Pane 1
            </TabPane>
            <TabPane
              tab={
                <span>
                  <TransactionOutlined />
                  Tab 2
                </span>
              }
              key="2"
            >
              Content of Tab Pane 2
            </TabPane>
            <TabPane
              tab={
                <span>
                  <AliwangwangOutlined />
                  Tab 3
                </span>
              }
              key="3"
            >
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图的页签" className="card">
          <Tabs
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit}
          >
            {this.state.panes.map(pane => (
              <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                {pane.content}
              </TabPane>
            ))}
          </Tabs>
        </Card>
      </div>
    );
  }
}
