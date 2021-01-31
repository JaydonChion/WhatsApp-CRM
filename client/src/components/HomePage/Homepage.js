import React from "react";
import HomeAnimation from "./HomeAnimation";
import history from "../History";
import "./homepage.css"; 
 
const HomePage = () => {
	
	const getSigninPage = () => {
		history.push('/login') 
	}

	const getRegisterPage = () => {
		history.push('/register')  
	}
 
	return( 
		<div className="homepage__container">
			<div className="home__container">
				<div className="home__leftarea">
					<div className="home__leftarea__top">
						<h1>Sauceflow</h1>
						<button onClick={getSigninPage}>Sign In</button>	
					</div>
					<div className="home__leftarea__bottom">
						<div className="hero__text">
							<h5>One Business | Multiple Agents </h5>
							<h5>One WhatsApp Number</h5>
						</div>
						<div className="middle__hero__text">
							<p>
								Sauceflow allows all your customer support staff connect
								with your customers without restriction to one phone or
								one WhatsApp web session. 
							</p>
						</div>
						<div className="hero__button">
							<button onClick={getRegisterPage}>Sign Up</button>
						</div>
					</div>
					<div className="home__leftarea__footer">
						<a href="mailto:sauce@sauceflow.com">Contact us</a>
					</div>
				</div>
				<div className="home__rightarea">
					<HomeAnimation />
				</div>
			</div>
		</div>
	)
}

export default HomePage;