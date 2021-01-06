import React, { Component } from 'react'
import { connect } from 'react-redux'

import Modal from '../elements/modal'
import Power from './Power'

import ReactTooltip from "react-tooltip"

import allPowers from '../../../json/powers/powers.json'



class PowersModal extends Component {
  state = {
    level: 0
  }

  componentDidUpdate() {
    ReactTooltip.rebuild()
  }

  renderCategories = () => {
    var { powerType } = this.props.utils
    var powers = allPowers[powerType]
    /* Powers are passed to it by the appropriate section */
    return powers.map((category, i) => {
      var renderedPowers = this.renderPowers(category.powers)
      // If the power was filtered out, renderPowers() will return undefined
      var countRenderedPowers = renderedPowers.filter(p => p).length
      // if all powers have been learned - don't display the empty category
      if (!countRenderedPowers) return

      return (
        <div key={i}>
          <div className="category-title">{category.title}</div>
          <div className="powers">
            {renderedPowers}
          </div>
          <hr />
        </div>
      )
    })
  }

  renderPowers = (powers) => {
    return powers.map((power, i) => {
      if (this.filterPowers(power)) return
      return (
        <Power power={power} key={i} adding />
      )
    })
  }

  filterPowers = (power) => {
    
    // Always show custom powers regardless of filtering
    if (power.category === "Custom") return false

    // Filter out the power if it's level doesn't match.
    var doFilterByLevel = ["spells", "skills", "items"].includes(power.powerType)
    // When level equals zero I'm telling it to show all the powers
    if (doFilterByLevel && power.level !== this.state.level && this.state.level !== 0) return true

    /* Hide already learned abilities/spells (but not items, they can have duplicates) */
    var doHideAlreadyLearned = ["traits", "talents", "spells", "skills"].includes(power.powerType)
    var { powerType } = this.props.utils
    var sheet = this.props.sheets[0]
    var learnedPowers = sheet[powerType]
    var alreadyLearned = learnedPowers.find(p => p.title == power.title)
    if (doHideAlreadyLearned && alreadyLearned) return true

    return false
  }


  renderLevelSelector = () => {
    var levelsList = ["Any", "Nifty", "Cool", "Epic", "Supreme"]
    var levels = levelsList.map((level, i) => (
      <div className="item btn" key={i} onClick={() => this.setState({ level:i })}>
        {level}
      </div>
    ))
    return (
      <div className="dropdown rarity-filter">
        <div className="menu-handle btn">
          Level: {levelsList[this.state.level]}
        </div>
        <div className="menu left">
          {levels}
        </div>
      </div>
    )
  }

  render() {
    var { powerType } = this.props.utils
    if (!powerType) return null
    var showLevelFilter = ["spells", "skills", "items"].includes(powerType)

    var titles = {
      traits: "Trait",
      talents: "Talent",
      skills: "Skill",
      spells: "Spell",
      items: "Item"
    }

    return (
      <Modal name="powers" className="powers-modal wide">
        <div className="title"> Add {titles[powerType]} </div>
          {/* 
            {showLevelFilter && this.renderLevelSelector()}
            
         */}
        <div className="clearfix" />
        <hr />
        {this.renderCategories()}
      </Modal>
    )
  }
}

export default connect(({ sheets, utils }) => ({ sheets, utils }), {})(PowersModal)



