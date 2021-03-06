import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
          <Route path="/login" exact component={Login} />
          <Route
            path="/admin"
            /* 定义子路由要用render */ render={() => {
              return (
                <Admin>
                  <Switch>
                    <Route path="/admin/home" component={Home} />
                    <Route path="/admin/ui/buttons" component={Buttons} />
                    <Route path="/admin/ui/modals" component={Modals} />
                    <Route path="/admin/ui/loadings" component={Loadings} />
                    <Route path="/admin/ui/notification" component={Notification} />
                    <Route path="/admin/ui/messages" component={Messages} />
                    <Route path="/admin/ui/tabs" component={Tabs} />
                    <Route path="/admin/ui/gallery" component={Gallery} />
                    <Route path="/admin/ui/carousel" component={Carousel} />
                    <Route path="/admin/form/login" component={FormLogin} />
                    <Route path="/admin/form/reg" component={FormReaister} />
                    <Route path="/admin/table/basic" component={BasicTable} />
                    <Route path="/admin/table/high" component={HighTable} />
                    <Route path="/admin/city" component={City} />
                    <Route path="/admin/order" component={Order} />
                    <Route path="/admin/user" component={User} />
                    <Route path="/admin/bikeMap" component={BikeMap} />
                    <Route path="/admin/charts/bar" component={Bar} />
                    <Route path="/admin/charts/pie" component={Pie} />
                    <Route path="/admin/charts/line" component={Line} />
                    <Route path="/admin/rich" component={Rich} />
                    <Route path="/admin/permission" component={Permission} />

                    <Route component={NoMatch} />
                  </Switch>
                </Admin>
              );
            }}
          />
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
        </App>
      </BrowserRouter>
    );
  }
}
