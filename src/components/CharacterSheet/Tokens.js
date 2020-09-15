import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { updateSheet } from '../../actions/sheetActions'

class Tokens extends Component {
  increment = (value, key) => {
    var sheet = this.props.sheets[0]
    var updatedSheet = { ...sheet }
    if (updatedSheet.vitality >= 12) return
    updatedSheet.vitality += 1
    this.props.updateSheet(updatedSheet)
  }
  decrement = (value, key) => {
    var sheet = this.props.sheets[0]
    var updatedSheet = { ...sheet }
    if (updatedSheet.vitality < 1) return
    updatedSheet.vitality -= 1
    this.props.updateSheet(updatedSheet)
  }
  renderTokens = () => {
    var currentVitality = this.props.sheets[0].vitality
    var tokens = []
    for (var i = 0; i < 12; i++) {
      tokens.push(<div className={`token ${i < currentVitality ? "active" : ""}`} key={i} />)
    }
    return tokens
  }
  render() {
    return (
      <div className="tokens">
        <FontAwesomeIcon className="left" icon={["fas", "minus-circle"]} onClick={this.decrement}/>
        {this.renderTokens()}
        <FontAwesomeIcon className="left" icon={["fas", "plus-circle"]} onClick={this.increment}/>
        <div className="clearfix" />
      </div>
    )
  }
}

export default connect(({ sheets }) => ({ sheets }), { updateSheet })(Tokens)
