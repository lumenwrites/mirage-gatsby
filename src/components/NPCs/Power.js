import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { updateNpc } from "../../actions/npcsActions"

class Power extends Component {
	addPower = () => {
		var { npc, updateNpc, power } = this.props
		var randomId = Math.random().toString(36).substring(7)
		power.id = randomId
		updateNpc({ ...npc, powers: [...npc.powers, power] })
	}

	deletePower = () => {
		var { npc, updateNpc, power } = this.props
		var updatedPowers = npc.powers.filter(p => p.id !== power.id)
		updateNpc({ ...npc, powers: updatedPowers })
	}

	render() {
		const { power, adding } = this.props
		var levelsList = ["Any", "Nifty", "Cool", "Epic", "Supreme"]
		var displayFooter = false // power.level || power.vt
		return (
			<div className={`card ${adding ? "adding" : ""} ${displayFooter ? "" : "no-footer"}`}
				onClick={() => adding ? this.addPower() : null} >
				<div className="card-header">
					{!adding && (
						<div className="delete-btn" onClick={this.deletePower}>
							<FontAwesomeIcon icon={["fas", "trash-alt"]} />
						</div>
					)}
					<span className="card-title">{power.title}</span>
				</div>
				<hr />
				<div className="description">{power.description}</div>
				{displayFooter &&
					<div className="card-footer">
						{power.vt && (
							<div className="level"
								data-tip="Energy Cost">
								<FontAwesomeIcon icon={["fab", "react"]} />
								{power.vt}
							</div>)}
						{power.level && (
							<div className="level requirements"
								data-tip={`Power Level`}>
								<FontAwesomeIcon icon={["fas", "chart-line"]} />
								{levelsList[power.level]}
							</div>
						)}
						<div className="clearfix" />
					</div>}
			</div>
		)
	}
}

export default connect(({ }) => ({}), { updateNpc })(Power)
