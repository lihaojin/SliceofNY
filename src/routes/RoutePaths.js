import React from 'react'
import Login from '../Login';
import Registration from '../Registration';
import {Router, Route,Switch} from 'react-router-dom';
import History from '../Utils/History';
import Manager from '../Managerpage';
import Delivery from '../Delivery';

const RoutePaths= () => (
  <Router history = {History}>

  <Switch>
  <Route path = '/Login' component = {Login}/>
  <Route path = '/Registration' component = {Registration}/>
  <Route path = '/Manager' component = {Manager}/>
  <Route path = '/Delivery' component = {Delivery}/>
  </Switch>
  </Router>
)
export default RoutePaths;
