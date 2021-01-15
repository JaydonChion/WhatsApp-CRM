import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import "./styles/modal.css";

class AddAgentModal extends Component {

	render() {
		const nodeRef = React.createRef(null)
		return(
			<CSSTransition
				in={this.props.show}
				unmountOnExit
				timeout={{ enter:0, exit:300 }}
				nodeRef={nodeRef}
			>
				<div ref={nodeRef} onClick={this.props.closeModal} className={`agent__modal__container ${this.props.show ? "show": ""}`}>
					<div onClick={e => e.stopPropagation()} className="aa_modal__content">
						<div className="aa_modal__header">
							<h4 className="aa_modal__title">Invite Agents</h4>
						</div>
						<div className="aa_modal__body">
							<label className="aa__agent__email" htmlFor="aa__agent__email">Email</label>
							<div className="aa__email__container">
								<input type="email" name="new_agent__email" className="new_agent__email" required/>
							</div>					
						</div>
						<div className="aa__modal__footer add__agent">
							<button  onClick={this.props.closeModal}>Cancel</button>
							<button>Invite</button>
						</div>
					</div>
				</div>
			</CSSTransition>
		)
	}
}

export default AddAgentModal;