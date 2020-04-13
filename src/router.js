import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import Admin from './Admin';
import Login from './pages/login/index';
import Home from './pages/home/index';
import Buttons from './pages/ui/Buttons';
import Modals from './pages/ui/Modals';
import Loadings from './pages/ui/Loadings';
import Notification from './pages/ui/Notification';
import Messages from './pages/ui/Messages';
import Tabs from './pages/ui/Tabs';
import NoMatch from './pages/noMatch/index';
import Gallery from './pages/ui/Gallery';
import Carousel from './pages/ui/Carousel';
import FormLogin from './pages/form/login';
import FormReaister from './pages/form/register';
import BasicTable from './pages/table/basicTable';
import HighTable from './pages/table/highTable';
import City from './pages/city/index';
import Order from './pages/order/index';
import User from './pages/user/index';
import OrderDetail from './pages/order/detail';
import Common from './common';
import BikeMap from './pages/map/bikeMap';
import Bar from './pages/echarts/bar/index';
import Pie from './pages/echarts/pie/index';
import Line from './pages/echarts/line/index';
import Rich from './pages/rich/index';
import Permission from './pages/permission/index';

export default class IRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <App>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route
              path="/common"
              render={() => {
                return (
                  <Common>
                    <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                  </Common>
                );
              }}
            />
            <Route
              path="/"
              /* 定义子路由要用render */ render={() => {
                return (
                  <Admin>
                    <Switch>
                      <Route path="/home" component={Home} />
                      <Route path="/ui/buttons" component={Buttons} />
                      <Route path="/ui/modals" component={Modals} />
                      <Route path="/ui/loadings" component={Loadings} />
                      <Route path="/ui/notification" component={Notification} />
                      <Route path="/ui/messages" component={Messages} />
                      <Route path="/ui/tabs" component={Tabs} />
                      <Route path="/ui/gallery" component={Gallery} />
                      <Route path="/ui/carousel" component={Carousel} />
                      <Route path="/form/login" component={FormLogin} />
                      <Route path="/form/reg" component={FormReaister} />
                      <Route path="/table/basic" component={BasicTable} />
                      <Route path="/table/high" component={HighTable} />
                      <Route path="/city" component={City} />
                      <Route path="/order" component={Order} />
                      <Route path="/user" component={User} />
                      <Route path="/bikeMap" component={BikeMap} />
                      <Route path="/charts/bar" component={Bar} />
                      <Route path="/charts/pie" component={Pie} />
                      <Route path="/charts/line" component={Line} />
                      <Route path="/rich" component={Rich} />
                      <Route path="/permission" component={Permission} />
                      <Redirect to="/home" />

                      <Route component={NoMatch} />
                    </Switch>
                  </Admin>
                );
              }}
            />
          </Switch>
        </App>
      </BrowserRouter>
    );
  }
}
