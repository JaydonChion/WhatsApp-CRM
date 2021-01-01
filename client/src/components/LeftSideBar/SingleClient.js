import React from 'react';
import { Avatar } from "@material-ui/core";
import "../styles/singleclient.css";

const SingleClient = ({ dbObj, id, sendCustomerId }) => {
	const { customerNum } = dbObj
	
	return(
		<div className="singleclient" onClick={() => sendCustomerId(id)}>
			<Avatar src=""/>
			<div className="singleclient__info">
			<h2>{ customerNum }</h2>
			<p>Last message...</p> 
			</div>
		</div> 
	)
}

export default SingleClient;