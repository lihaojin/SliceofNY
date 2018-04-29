
import AddMenu from './addMenu';
import MyMenu from './myMenu';
import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

export default class ChefContainer extends Component
{

	render()
	{
		return(
			<div>
				<Tabs>
					<Tab label="My Menu">
						<MyMenu type="Chef"/>
					</Tab>
					<Tab label="Add Menu">
						<AddMenu />
					</Tab>

				</Tabs>
			</div>

			)
	}
}