import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MyMenu from '../../chef/container/myMenu'; 
import Customers from './customer';
import Delivery from './delivery';
import Orders from './orders';
import Complaints from './complaint';
export default class ManagerContainer extends Component
{

	render()
	{
		return(
			<div>
				<Tabs>
					<Tab label="Current Orders">
					<Orders/>
					</Tab>
					<Tab label="Pick Delivery">
						<Delivery/>
					</Tab>
					<Tab label="Menu Serving">
						<MyMenu type="Manager"/>
					</Tab>
					<Tab label="Customers">
						<Customers />
					</Tab>
					<Tab label="Complaints/Comments">
						<Complaints/>
					</Tab>
					<Tab label="Pay Chef/Delivery">

					</Tab>

				</Tabs>
			</div>

			)
	}
}
