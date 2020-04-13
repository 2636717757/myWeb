import React, { Component } from 'react';
import { Card, Button, Modal } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
export default class Rich extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: '',
      showRichText: false,
      contentState: '',
    };
  }
  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
  };
  handleClearContent = () => {
    this.setState({
      editorState: '',
    });
  };
  onContentStateChange = contentState => {
    this.setState({
      contentState,
    });
  };
  handleGetText = () => {
    this.setState({
      showRichText: true,
    });
  };
  render() {
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.handleClearContent} style={{ marginRight: '10px' }}>
            清空内容
          </Button>
          <Button type="primary" onClick={this.handleGetText}>
            获取HTML文本
          </Button>
        </Card>
        <Card title="富文本编辑器">
          <Editor
            editorState={this.state.editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
            onContentStateChange={this.onContentStateChange}
          />
        </Card>
        <Modal
          title="展示富文本"
          visible={this.state.showRichText}
          onCancel={() => {
            this.setState({
              showRichText: false,
            });
          }}
          footer={null}
        >
          {draftToHtml(this.state.contentState)}
        </Modal>
      </div>
    );
  }
}
