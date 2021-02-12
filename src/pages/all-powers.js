import React, { Component } from 'react'
import { connect } from 'react-redux'

import Layout from '../components/layout'
import SEO from "../components/seo"
import Power from '../components/NPCs/Power'

import allPowers from '../../json/powers/powers.json'

const tabs = ["Talents", "Skills", "Spells", "Items"]

class Powers extends Component {
  state = { activeTab: "Spells" }

  renderTabs = () => {
    return tabs.map((t, i) => {
      return (
        <div className={"tab " + (t === this.state.activeTab ? "active" : "")}
          key={i}
          onClick={() => this.setState({ activeTab: t })}>
          {t}
        </div>
      )
    })
  }

  renderCategories = () => {
    let powers
    switch (this.state.activeTab) {
      case 'Talents': powers = allPowers.talents; break;
      case 'Skills': powers = allPowers.skills; break;
      case 'Spells': powers = allPowers.spells; break;
      case 'Items': powers = allPowers.items; break;
    }

    /* Powers are passed to it by the appropriate section */
    return powers.map((category, i) => {
      return (
        <div key={i}>
          <div className="category-title">{category.title}</div>
          <div className="columns">
            {this.renderPowers(category.powers)}
          </div>
          <hr />
        </div>
      )
    })
  }


  renderPowers = (powers) => {
    /* console.log(powers) */
    return powers.map((power, i) => {
      return (
        <Power power={power} key={i} npc={this.props.npc} adding />
      )
    })
  }

  render() {
    var { npc } = this.props
    return (
      <Layout>
        <div className="all-powers-app">
          <div className="tabs">
            {this.renderTabs()}
            <div className="clearfix" />
          </div>
          {this.renderCategories()}
        </div>
        <SEO title={"All Powers"} description={"Full list of powers."} />
      </Layout>
    )
  }
}

export default connect(({ utils }) => ({ utils }), {})(Powers)
