import React from 'react'
import Homepage from '../Homepage'
import Login from '../Login';
import Registration from '../Registration';
import {Router, Route,Switch} from 'react-router-dom';
import History from '../Utils/History';
import Manager from '../Users/Managerpage';
import Delivery from '../Users/Delivery';
import Chef from '../Users/Chef'


const RoutePaths= () => (
  <Router history = {History}>

  <Switch>
  <Route path = '/Homepage' component = {Homepage}/>
  <Route path = '/Login' component = {Login}/>
  <Route path = '/Registration' component = {Registration}/>
  <Route path = '/Manager' component = {Manager}/>
  <Route path = '/Delivery' component = {Delivery}/>
  <Route path = '/Chef' component = {Chef}/>
  </Switch>
  </Router>
)
export default RoutePaths;
