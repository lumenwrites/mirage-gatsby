import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const TemplateRedirect = () => {
  if (typeof window !== "undefined") {
    window.location.replace("https://discord.gg/zt4N23d")
  }

  return (
    <Layout>
      <article>
        <p>Come play Mirage with us!</p>
	      <a href="https://discord.gg/zt4N23d">Join our Discord Community</a>
	</article>
    </Layout>
  )
}

export default TemplateRedirect
