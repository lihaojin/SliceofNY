import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import MyMenu from '../../chef/container/myMenu'; 

export default class ManagerContainer extends Component
{

	render()
	{
		return(
			<div>
				<Tabs>
					<Tab label="Menu Serving">
						<MyMenu type="Manager"/>
					</Tab>
					<Tab label="Customers">
					</Tab>

				</Tabs>
			</div>

			)
	}
}