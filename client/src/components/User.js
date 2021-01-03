import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import LeftBar from "./LeftSideBar/LeftBar";
import ExpandedSingleChat from "./ExpandedSingleChat";
import './styles/user.css';

//import db from '../firebase'
import { db } from '../firebase'

class User extends Component {

	constructor() {
		super()
		this.state = {
			customerChatFromServer:"", 
			allChats:[],
			selectedCustomer:{} 
		}
	} 

	getMessages = () => {
		this.unsubscribe = db.collection('agent1').onSnapshot(snapshot => (
			this.setState({
				allChats: snapshot.docs.map(obj => {
					return {id:obj.id, data:obj.data()}
				})
			})
		))
	}

	componentDidMount() { 
		// get exisitng chats for this agent - replace agent1 with the logged in agent
		this.getMessages()
	}


	componentWillUnmount() {
		this.unsubscribe()
	}

	getCustomer = data => {
		this.setState({
			selectedCustomer: data
		})
	}
	
	render() {
		const { customerChatFromServer, allChats, selectedCustomer } = this.state
		return (
			<div className="app__body">
				<Switch>
					<Route path="/customers/all">
						<LeftBar getCustomerData={this.getCustomer} customerList={allChats}/>
					</Route>
					<Route path="/customers/:customerId">
						<LeftBar getCustomerData={this.getCustomer} customerList={allChats}/>
						<ExpandedSingleChat selectedCustomer={selectedCustomer} customerMessage={customerChatFromServer} agentMessageToServer={this.handleAgentMessage}/>
					</Route>
					<Redirect from="/customers" to="/customers/all" exact/>
				</Switch>
		   	</div>
		  ); 
	} 
}

export default User;
 