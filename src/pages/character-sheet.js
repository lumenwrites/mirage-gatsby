import React, { Component } from "react"
import { connect } from "react-redux"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ReactTooltip from "react-tooltip"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Subnav from "../components/CharacterSheet/Subnav"
import Image from "../components/CharacterSheet/Image"
import Stats from "../components/CharacterSheet/Stats"
import Tokens from "../components/CharacterSheet/Tokens"
import Section from "../components/CharacterSheet/Section"
import Description from "../components/CharacterSheet/Description"
import PowersModal from '../components/CharacterSheet/PowersModal'

/* Actions */
import { updateSheet, loadSheets } from "../actions/sheetActions"
import { togglePowersModal } from '../actions/utils'

class Sheet extends Component {
  componentDidMount() {
    var sheets = localStorage.getItem("sheets")
    if (sheets && sheets.length) {
      this.props.loadSheets(JSON.parse(sheets))
    }
  }

  componentDidUpdate() {
    ReactTooltip.rebuild()
  }

  render() {
    var { sheets, updateSheet } = this.props
    var sheet = sheets[0]
    const isSSR = typeof window === "undefined"
    if (!isSSR) { document.title = sheet.name + " | Character Sheet" }
    var subnav = <Subnav />
    return (
      <Layout subnav={subnav}>
        <article className="character-sheet" id="character-sheet">
          <input
            type="text"
            className="character-name"
            placeholder="Character's Name"
            value={sheet.name}
            onChange={e => updateSheet({ ...sheet, name: e.target.value })}
          />
          <div className="clearfix" />
          <Image />
          <Tokens />

          <div className="col-1">
            <Section title="Traits" powers={sheet.traits}>
              <div className={`card append`} onClick={() => { this.props.togglePowersModal("traits") }}>
                Add Trait
                <FontAwesomeIcon icon={["fas", "plus-circle"]} />
              </div>
            </Section>
          </div>
          <div className="col-2">
            <Section title="Talents" powers={sheet.talents}>
              <div className={`card append`} onClick={() => { this.props.togglePowersModal("talents") }}>
                Add Talent
                <FontAwesomeIcon icon={["fas", "plus-circle"]} />
              </div>
            </Section>
          </div>
          <div className="clearfix" />


          {/* <Section title="Traits" wide powers={sheet.traits}>
            <div className={`card append`} onClick={() => { this.props.togglePowersModal("traits") }}>
              Add Trait
                <FontAwesomeIcon icon={["fas", "plus-circle"]} />
            </div>
          </Section>
          <Section title="Talents" wide powers={sheet.talents}>
            <div className={`card append`} onClick={() => { this.props.togglePowersModal("talents") }}>
              Add Talent
                <FontAwesomeIcon icon={["fas", "plus-circle"]} />
            </div>
          </Section> */}

          <Section title="Abilities" wide powers={sheet.skills.concat(sheet.spells)}>
            <div className="append-buttons">
              <div className={`card append`} onClick={() => { this.props.togglePowersModal("skills") }}>
                Add Skill
                <FontAwesomeIcon icon={["fas", "plus-circle"]} />
              </div>
              <div className={`card append`} onClick={() => { this.props.togglePowersModal("spells") }}>
                Add Spell
                <FontAwesomeIcon icon={["fas", "plus-circle"]} />
              </div>
            </div>
          </Section>


          <Section title="Inventory" wide powers={sheet.items}>
            <div className={`card append`} onClick={() => { this.props.togglePowersModal("items") }}>
              Add Item
              <FontAwesomeIcon icon={["fas", "plus-circle"]} />
            </div>
          </Section>

          {/* <Section title="Inventory" singular="Item" powers={equipment} wide section="equipment" /> */}


          <div className="character-description">
            <Description />
          </div>
          <div className="clearfix" />
        </article>
        <PowersModal />
        <SEO title={"Character Sheet"} description={"Character Sheet App"} />
      </Layout>
    )
  }
}

export default connect(({ sheets }) => ({ sheets }), {
  updateSheet,
  loadSheets,
  togglePowersModal
})(Sheet)
