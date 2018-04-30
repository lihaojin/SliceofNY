import React from 'react'
import Homepage from '../HomePage/Homepage'
import Login from '../Login';
import Registration from '../Registration';
import {Router, Route,Switch} from 'react-router-dom';
import History from '../Utils/History';
import Manager from '../manager/container/mainManagerContainer';
import Delivery from '../Users/Delivery/Delivery';
import Chef from '../chef/container/chefContainer'
import MapPage from '../MapComponents/CustomerMap/MapPage';
import StorePage from '../Stores/StorePage';


const RoutePaths= () => (
  <Router history = {History}>

  <Switch>
  <Route path = '/Homepage' component = {Homepage}/>
  <Route path = '/Login' component = {Login}/>
  <Route path = '/Registration' component = {Registration}/>
  <Route path = '/Manager' component = {Manager}/>
  <Route path = '/Delivery' component = {Delivery}/>
  <Route path = '/Chef' component = {Chef}/>
  <Route path = '/MapPage' component = {MapPage}/>
  <Route path = '/:name/StorePage' component ={StorePage}/>
  </Switch>
  </Router>
)
export default RoutePaths;
