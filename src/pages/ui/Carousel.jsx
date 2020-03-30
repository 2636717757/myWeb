import React, { Component } from "react";
import { Card, Carousel } from "antd";
import "./ui.less";
export default class Carousels extends Component {
  render() {
    return (
      <div>
        <Card className="card" title="焦点轮播图">
          <Carousel autoplay>
            <div>
              <h3>tom</h3>
            </div>
            <div>
              <h3>jarry</h3>
            </div>
            <div>
              <h3>susan</h3>
            </div>
          </Carousel>
        </Card>
        <Card title="焦点轮播图" className="card">
          <Carousel autoplay>
            <div>
              <img src="/carousel-img/carousel-1.jpg" alt="" />
            </div>
            <div>
              <img src="/carousel-img/carousel-2.jpg" alt="" />
            </div>
            <div>
              <img src="/carousel-img/carousel-3.jpg" alt="" />
            </div>
          </Carousel>
        </Card>
      </div>
    );
  }
}
