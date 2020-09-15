import React, { Component } from 'react'
import { connect } from 'react-redux'


import Power from './Power'

/* Actions */
import { toggleModal } from '../../actions/utils'

class Section extends Component {
  renderPowers = () => {
    var { powers } = this.props
    if (powers.length == 0) return
    return powers.map((power, i) => <Power power={power} key={i} onSheet />)
  }

  render() {
    var { title, singular, section, powers, wide, children } = this.props

    return (
      <div className="section">
        <div className="section-title">{title}</div>
        <div className={`cards ${wide && "grid"}`}>{this.renderPowers()}</div>

        {children}

        
      </div>
    )
  }
}

export default connect(({ sheets }) => ({ sheets }), { toggleModal })(Section)
