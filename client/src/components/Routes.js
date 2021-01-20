import React from 'react';
// import { Router, Switch, Route, Redirect } from "react-router-dom";
import { Router, Switch, Route } from "react-router-dom";
import history from "./History";

import HomePage from "./HomePage/HomePage";
import SignUpPage from "./Register/Register";
import Admin from "./Admin/Admin"; 
import Login from "./Login";
import User from "./User"; 
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
	return(
		<Router history={history}>
			<Switch>
				{
					//<Route exact path="/" render={() => (<Redirect to={{ pathname: '/login' }}/>)}/>
			}
				<Route exact path="/" component={HomePage}/>
				<Route path="/admin" component={Admin}/>
				<Route path="/login" component={Login}/>
				<Route path="/register" component={SignUpPage}/>
				<ProtectedRoute path="/customers" component={User}/>
			</Switch>
		</Router>  
	)  
}































//old cose for passing username props - import Component if needed 
// class Routes extends Component {

// 	constructor() {
// 		super()
// 		this.state = {
// 			agentUsername:""
// 		}
// 	}

// 	getAgentUsername = data => {
// 		this.setState({
// 			agentUsername: data
// 		})
// 	}

// 	render() {
// 		const { agentUsername } = this.state
// 		return(
// 			<Router history={history}>
// 				<Switch>
// 					<Route 
// 						path="/login" 
// 						render={() => <Login agentLoginUsername={this.getAgentUsername}/>}
// 					/>
// 					<Route 
// 						path="/user" 
// 						render={() => <User agentUsername={agentUsername}/>}
// 					/>
// 				</Switch>
// 			</Router>
// 		)
// 	}
// }


export default Routes;