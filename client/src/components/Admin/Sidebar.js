import React from "react";
import "./styles/sidebar.css";

const Sidebar = ({ sidebarOpen, closeSideBar }) => {
	return(
		<div id="sidebar" className={sidebarOpen ? "sidebar_responsive" : ""}>
			<div className="sidebar__title">
				<div className="sidebar__img">
					<img src=""/>
					<h1>Company Name</h1>
				</div>
				<i className="fa fa-times" id="sidebarIcon" onClick={closeSideBar}></i>
			</div>
			<div className="sidebar__menu">
				<div className="sidebar__link active_menu_link">
					<i className="fa fa-home"></i>
					<a href="#">Dashboard</a>
				</div>
				{
					//<h2>MNG</h2>
				}
				<div className="sidebar__link">
					<i className="fa fa-comments"></i>
					<a href="#">Chats</a>
				</div>
				<div className="sidebar__link">
					<i className="fa fa-users"></i>
					<a href="#">Agents</a>
				</div>
				<div className="sidebar__link">
					<i className="fa fa-line-chart"></i>
					<a href="#">Reports</a>
				</div>
				<div className="sidebar__link">
					<i className="fa fa-credit-card"></i>
					<a href="#">Subscription</a>
				</div>
				{
					// <div className="sidebar__link">
					// 				<i className="fa fa-handshake-o"></i>
					// 				<a href="#">Contracts</a>
					// 			</div>
							}
				{
					// <h2>LEAVE</h2>
					// 			<div className="sidebar__link">
					// 				<i className="fa fa-question"></i>
					// 				<a href="#">Requests</a>
					// 			</div>
					// 			<div className="sidebar__link">
					// 				<i className="fa fa-sign-out"></i>
					// 				<a href="#">Leave Policy</a>
					// 			</div>
					// 			<div className="sidebar__link">
					// 				<i className="fa fa-calendar-check-o"></i>
					// 				<a href="#">Special Days</a>
					// 			</div>
					// 			<div className="sidebar__link">
					// 				<i className="fa fa-files-o"></i>
					// 				<a href="#">Apply for leave</a>
					// 			</div>
					// 			<h2>PAYROLL</h2>
					// 			<div className="sidebar__link">
					// 				<i className="fa fa-money"></i>
					// 				<a href="#">Payroll</a>
					// 			</div>
					// 			<div className="sidebar__link">
					// 				<i className="fa fa-briefcase"></i>
					// 				<a href="#">Paygrade</a>
					// 			</div>
							}
				<div className="sidebar__logout">
					<i className="fa fa-power-off"></i>
					<a href="#">Log out</a>
				</div>
			</div>
		</div>
	)
}

export default Sidebar;