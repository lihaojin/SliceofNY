import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import ComplaintCard from '../component/complaintCard';
import {getMyInfo} from '../Util/managerDBUtil';


export default class Complaints extends Component
{
	constructor(props)
	{
		super(props)
		this.state = {
			complaints:[],
			redirect:false
		}
	}

	componentDidMount(){

		if(localStorage.getItem('token')==null)
		{	
			this.setState({redirect:true});
			alert("You are not logged in!");
		}
		else
		{
			getMyInfo().then(result=>
			{
				let complaint = []

				for(let i = 0; i< result.data.customer_complaints.length; ++i)
					complaint.push(result.data.customer_complaints[i])

				this.setState({"complaints":complaint});
			})
			.catch(err=>{
				alert("getting complaints Error: ",err);
			});
		}
		 
	}
 
	render()
	{

		const complaints = this.state.complaints.map((complaint)=>

			<div key={complaint.toString()}>
			<br></br>
			<ComplaintCard title={complaint.complaint}  id={complaint.id}
			 />
			<br></br>
			</div>
			)

		return(
			<div>
			{complaints}
			<br/>
			</div>

			)

	}
}