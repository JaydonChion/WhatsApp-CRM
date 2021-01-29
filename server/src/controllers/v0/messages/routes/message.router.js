"use strict";
const express = require("express");
const ngrok = require('ngrok');
const axios = require('axios');
const router = express.Router(); 
const { db, serverTimestamp } = require("../../../../config/config");

const INSTANCE_URL = 'https://api.maytapi.com/api';
const token = process.env.MAYTAPI_TOKEN;
const productId = process.env.MAYTAPI_PRODUCT_ID


const setupNetwork = async () => {
	let publicUrl = await ngrok.connect(4000)
	let webhookUrl = `${publicUrl}/api/v0/message/webhook`
	let url = `${INSTANCE_URL}/${productId}/setWebhook`
	axios.post(url, { webhook: webhookUrl }, {
		headers: {
			'Content-Type': 'application/json',
			'x-maytapi-key': token
		}
	})
	.then(res => console.log(res.data))
	.catch(err => console.log('an error occurred when setting up webhook endpoint >>', err))
}

const addPhoneNumber = number => {
	let url = `${INSTANCE_URL}/${productId}/addPhone`
	axios.post(url, { "number": number }, {
		headers: {
			'Content-Type': 'application/json',
			'x-maytapi-key': token
		}
	})
	.then(res => console.log(res.data))
	.catch(err => console.log('an error occurred when setting adding a new phone >>', err))
}
 
//NEW
router.get('/', (req, res) => {
	res.status(200).send('new csteam get route home')
})

router.post('/sendMessage', async (req, res) => {
	console.log(req.body);
})

router.post('/webhook', async (req, res) => {
	res.sendStatus(200)
	if (req.body.type === 'ack') {//message status
		console.log(req.body.data[0].ackType)
	} else {
		let { message, user, receiver } = req.body;
		let { type, text, fromMe } = message;
		if (fromMe) {
			return;
		} else {
			let { phone } = user; 
			let data = {
				message: text,
				name: Number(phone),
				timestamp: serverTimestamp
			}

			try {
				//get the company associated with this number
				let companySnapshot = await db.collection('companies').where('number', '==', Number(receiver)).get()
				let companyId;
				if (!companySnapshot.empty) {
					companySnapshot.forEach(doc => {
						companyId = doc.id
					})
				}
				if (companyId) {
					let allAgents = db.collection('companies').doc(companyId).collection('users');
					//get only currently online agents
					let activeAgents = [] //a list of agent ids - online agents at the time this message was received
					let onlineAgents = await allAgents.where('loggedin', '==', 'Yes').get()
					if (!onlineAgents.empty) {
						onlineAgents.forEach(doc => {
							activeAgents.push(doc.id)
						})
					} else {
						console.log('All agents are offline, please leave a message and we\'ll get to you ASAP')
					}

					//check for current responders
					let respondSnapshot = await db.collection('companies').doc(companyId).collection('response').get();
					if (respondSnapshot.empty) { //send to all active agents
						for (let agent of activeAgents) {
							let clientList = await allAgents.doc(agent).collection('customers').where('name', '==', Number(phone)).get();
							if (clientList.empty) {//new customer to be added
								let newCustomer = await allAgents.doc(agent).collection('customers').add({name: Number(phone)})
								//send the customer's message to the agent by adding to firestore db
								let newCustomerMsg = allAgents.doc(agent).collection('customers').doc(newCustomer.id).collection('messages').add(data) 
							} else {//existing customer
								for (let doc of clientList.docs) {//get the id of the customer
									let oldCustomerMsg = allAgents.doc(agent).collection('customers').doc(doc.id).collection('messages').add(data)
								}
							}
						}
					} else {
						let responderList = respondSnapshot.docs.map(doc => {
							return doc.data()
						}).filter(obj => obj.customer === Number(phone))
						if (responderList.length === 0) {//this is the first time this customer is sending a message and none of the current responders has responded to them before..send to all agents
							for (let agent of activeAgents) {
								let clientList = await allAgents.doc(agent).collection('customers').where('name', '==', Number(phone)).get();
								if (clientList.empty) {//new customer to be added
									let newCustomer = await allAgents.doc(agent).collection('customers').add({name: Number(phone)})
									//send the customer's message to the agent by adding to firestore db
									let newCustomerMsg = allAgents.doc(agent).collection('customers').doc(newCustomer.id).collection('messages').add(data) 
								} else {//existing customer
									for (let doc of clientList.docs) {//get the id of the customer
										let oldCustomerMsg = allAgents.doc(agent).collection('customers').doc(doc.id).collection('messages').add(data)
									}
								}
							}
						} else {//this agent was the one that responded to the customer the first time
							let respondingAgentId = responderList[0].agentid
							let customerResponded = responderList[0].customerid
							//message the agent alone
							allAgents.doc(respondingAgentId).collection('customers').doc(customerResponded).collection('messages').add(data)
						}
					}
				}
			} catch(err) {
				console.log('error occurred in the firebase server calls', err)
			}
		}
	} 
})

exports.MessageRouter = router;  
exports.setupNetwork = setupNetwork;
exports.addPhoneNumber = addPhoneNumber;


