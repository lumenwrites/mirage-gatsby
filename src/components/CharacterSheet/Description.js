import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'

/* Actions */
import { updateSheet } from '../../actions/sheetActions'

var placeholder = `Appearance (Distinctive features, outfit, quirks, manner of speaking.) 
Personality (Values, Ideals, Flaws, Fears, weakness they need to overcome.)
Motivations (What do they want from life? What is their current goal?)
Backstory (Significant events that shaped them. Their deep dark secret.)`

class Description extends Component {
	update = (value, key) => {
		var sheet = this.props.sheets[0]
		this.props.updateSheet({...sheet, description: value})
	}

	render() {
		var sheet = this.props.sheets[0]
		return (
			<div className="section">
				<div className="section-title">
					Description
				</div>
				<TextareaAutosize
					placeholder={placeholder}
					value={sheet.description}
					onChange={(e) => this.update(e.target.value)} />
			</div>
		)
	}
}

export default connect(({ sheets }) => ({ sheets }), { updateSheet })(Description)
