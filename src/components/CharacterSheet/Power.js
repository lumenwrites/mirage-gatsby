import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TextareaAutosize from 'react-textarea-autosize'

import { updateSheet } from '../../actions/sheetActions'

class Power extends Component {
	state = { editing: false }

	addPower = () => {
		var { sheets, updateSheet, power, sample } = this.props
		if (sample) return // example power for the rules page
		var { powerType } = power
		var updatedSheet = { ...sheets[0] }
		// Used to update/delete the power, even if it's title changes
		power.id = Math.random().toString(36).substring(7)

		// Put spells into updatedSheet.spells, skills into updatedSheet.skills, etc.
		updatedSheet[powerType] = [...updatedSheet[powerType], { ...power }]

		// Subtract the power from current XP
		//if (power.xp) { updatedSheet.experience -= power.xp }
		updateSheet(updatedSheet)
	}

	updatePower = () => {
		var { sheets, updateSheet, power } = this.props
		var updatedSheet = { ...sheets[0] }
		var { powerType } = power
		// Update the power with values from the inputs
		var updatedPower = {
			...power,
			title: this.titleInput.value,
			description: this.descriptionInput.value
		}
		// Find the power by id and replace it with updated one 
		updatedSheet[powerType] = updatedSheet[powerType].map(p => p.id === power.id ? updatedPower : p)
		updateSheet(updatedSheet)
		this.setState({ editing: false })
	}

	deletePower = () => {
		var { sheets, updateSheet, power } = this.props
		var updatedSheet = { ...sheets[0] }
		var { powerType } = power
		updatedSheet[powerType] = updatedSheet[powerType].filter(p => p.id !== power.id)
		updateSheet(updatedSheet)
	}

	renderEditIcons = () => {
		const { adding, sample } = this.props
		if (adding || sample) return // no edit icons when I'm adding powers from PowersModal
		return (
			<div className="edit-icons">
				<FontAwesomeIcon icon={["fas", "trash-alt"]} onClick={this.deletePower} />
				{/*  Switch to edit mode or commit edits */}
				{this.state.editing ?
					<FontAwesomeIcon icon={["fas", "check-circle"]} onClick={this.updatePower} />
					:
					<FontAwesomeIcon icon={["fas", "edit"]} onClick={() => this.setState({ editing: true })} />}
			</div>
		)
	}

	render() {
		const { power, adding, sample } = this.props
		var hasFooterContent = power.level || power.vt
		var displayFooter = ["talents", "spells", "skills", "items"].includes(power.powerType) && hasFooterContent
		var levelsList = ["Any", "Nifty", "Cool", "Epic", "Supreme"]
		return (
			<div className={`card ${adding ? "adding" : ""} ${displayFooter ? "" : "no-footer"}`}
				onClick={() => adding ? this.addPower() : null} >
				<div className="card-header">
					{/* Edit Icons */}
					{this.renderEditIcons()}

					{/*  Title */}
					{this.state.editing ?
						<input ref={ref => this.titleInput = ref} defaultValue={power.title} />
						:
						<span className="card-title">{power.title}</span>
					}
				</div>
				<hr />
				{/* Description */}
				{this.state.editing ? (
					<TextareaAutosize
						className="textarea-description"
						placeholder={"Description"}
						ref={ref => this.descriptionInput = ref}
						defaultValue={power.description} />
				) : (
						<div className="description">
							{power.description}
						</div>
					)}

				{(displayFooter) &&
					<div className="card-footer">
						{/* Show VT cost */}
						{power.vt && (
							<div className="level" data-tip={`Costs ${power.vt} <br/> Vitality Tokens <br/> to use.`}>
								<FontAwesomeIcon icon={["fab", "react"]} />
								{power.vt}
							</div>)}

						{/* Power level. */}
						{power.level && (
							<div className="level requirements"
								data-tip={`Power Level`}>
								<FontAwesomeIcon icon={["fas", "chart-line"]} />
								{levelsList[power.level]}
							</div>
						)}
						<div className="clearfix" />
					</div>
				}
			</div>
		)
	}
}

export default connect(({ sheets }) => ({ sheets }), { updateSheet })(Power)
