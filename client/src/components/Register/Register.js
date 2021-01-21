import React, { Component } from "react";
import { withFirebase } from "../../firebase/index";
import { withRouter } from 'react-router-dom';
import history from "../History";
import { db } from "../../firebase";
import '../styles/register.css';

//DON'T DELETE - code has been replaced with withFirebase below
// const SignUpPage = () => {
// 	return(
// 		<div> 
// 			<FirebaseContext.Consumer>
// 				{ firebase => <Register firebase={firebase}/> } 
// 			</FirebaseContext.Consumer> 
// 		</div>
// 	) 
// } 

//firebase above refers to a new instance of the class defined in the context provider, similar to const firebase = new Firebase()
//and this instance has access to all the methods defined in the Firebase class in firebase.js file
//it is used as a prop her to access the class methods


const SignUpPage = () => (
	<div>
		<Register />
	</div>
)


const initialState = {
			name:'',
			email: '',
			password: '',
			company:'',
			error: null
		}

class RegisterFormBase extends Component {

	constructor() {
		super()
		this.state = { ...initialState }
	}

	onNameChange = e => {
		this.setState({
			name: e.target.value
		})
	}

	onEmailChange = e => {
		this.setState({
			email: e.target.value
		})
	}

	onPasswordChange = e => {
		this.setState({
			password: e.target.value
		})
	}

	onCompanyChange = e => {
		this.setState({
			company: e.target.value
		})
	}

	submitRegister = () => {
		const { name, email, password, company } = this.state
		let companyName = company.replace(/\s+/g, "__").toLowerCase() //replace all spaces with underscore
		let adminRef = db.collection('admins');
		let companyRef = db.collection('companies');
		const { firebase } = this.props
		this.listener = firebase.doCreateUserWithEmailAndPassword(email, password)
				.then(async authUser => {
					//add the user to the admins collections in firestore
					let newUserId = authUser.user.uid
					adminRef.add({
						name:name,
						company:companyName,
						email:email,
						adminId: newUserId
					})
					.catch(err => {
						console.log('Something went wrong with added user to firestore: ', err);
					})
					//add the company to the company list and get the doc id
					try {
						let newCompany = await companyRef.add({ name:companyName })
						let newCompanyId = newCompany.id

						//add to the users collection
						companyRef.doc(newCompanyId).collection('users').add({ name:name, role:'Owner', email:email, loggedin:"", status:"", activeAgent:"" })

						//go to the admin route 
						history.push("/admin")
					} catch (err) {
						console.log('Something went wrong with added company to firestore: ', err);
					}
					this.setState({ ...initialState })
				})
				.catch(error => {
					this.setState({ error })
				})
	}

	//to prevent memory leaks
	componentWillUnmount() {
		this.setState = (state, cb) => {
			return;
		}
	}

	render() {
		const { name, email, password, company, error } = this.state
		const isInvalid = name === "" || email === "" || password === "" || company === ""
		return ( 
			<div className="register__container">  
				<p id="brand__name">Sauceflow</p>
				<div className="register__body">
					<div className="form__heading">
						<p>Register</p>
					</div>
						<div className="form__container">
								<div className="name__container">
									<label className="field__label" htmlFor="owner__name">Name</label>
									<div className="company__container__input">
										<input onChange={this.onNameChange} value={name} type="text" name="name" className="name" placeholder="e.g. Eve Adams" required/>
									</div>
								</div>
								<div className="company__container">
									<label className="field__label" htmlFor="company__name">Company Name</label>
									<div className="company__container__input">
										<input onChange={this.onCompanyChange} value={company} type="text" name="company" className="company" required/>
									</div>
								</div>
								<div className="email__container">
									<label className="field__label" htmlFor="owner__email">Email</label>
									<div className="email__container__input">
										<input onChange={this.onEmailChange} value={email} type="text" name="email" className="email" required/>
									</div>
								</div>
								<div className="password__container">
									<label className="field__label" htmlFor="owner__password">Password</label>
									<div className="password__container__input">
										<input onChange={this.onPasswordChange} value={password} type="password" name="password" className="password" required/>
									</div>
								</div>
								<div className="submit__container">
									{ error && <p className="signup__error">{ error.message }</p> }
									<button disabled={isInvalid} onClick={this.submitRegister} type="submit" className="button">Sign Up</button>
								</div>
						</div>
				</div>
			</div>
		)
	}
}

const Register = withRouter(withFirebase(RegisterFormBase))

export default SignUpPage;

export { Register };